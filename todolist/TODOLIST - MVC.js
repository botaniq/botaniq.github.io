// TO DO LIST

// FORM
// [Task Title] [Add]

// LIST
// [√] 1. Task 1 <X>
// [ ] 2. Another task <X>
// [√] 3. One more task <X>
// [√] 4. Task 4 <X>


// {
//     title: 'Task 1',
//     isDone: true,
//     id: 1234354546
// }

class ToDoList {

    constructor(tasks) {
        this.tasks = tasks;
    }

    addTask(task) {
        this.tasks.push(task);
        this.updateTaskInLocalStorage();
    }



    removeTask(taskId) {
        this.tasks = this.tasks.filter(task => task.id !== taskId);
        this.updateTaskInLocalStorage();
    }

    clearTasks() {
        this.tasks = [];
        this.updateTaskInLocalStorage();
    }

    toggleState(taskId) {
        let currentTask = this.tasks.find(task =>  task.id === taskId);
        currentTask.done = !currentTask.done;

        this.updateTaskInLocalStorage();
    }

    getInitialTask() {
        return {
            title: '',
            done: false,
            id: Date.now()
        }
    }

    updateTaskInLocalStorage() {
        localStorage.removeItem('tasks');
        localStorage.setItem('tasks', JSON.stringify(this.tasks) );
    }

}


class View {

    constructor(element) {
        this.root = element;
    }

    clear() {
        this.root.innerHTML = '';
    }

    renderForm(initialData) {
        let form = document.createElement('form'),
            titleInput = document.createElement('input'),
            submitBtn = document.createElement('button'),
            clearBtn = document.createElement('button');
        
        titleInput.value = initialData.title;
        titleInput.setAttribute('data-id', initialData.id);
        titleInput.setAttribute('class', 'form-control');
        submitBtn.innerHTML = 'ADD';
        clearBtn.innerHTML = 'CLEAR';
        submitBtn.setAttribute('class', 'btn btn-success');
        clearBtn.setAttribute('class', 'btn btn-danger');

        form.appendChild(titleInput);
        form.appendChild(submitBtn);
        form.append(clearBtn);

        this.form = form;
        this.formInput = titleInput;
        this.clearBtn = clearBtn;

        this.root.appendChild(form);
    }

    renderList(data) {
        this.listHTML = document.createElement('ul');

        data.map(this.renderItem).forEach( li => {
            this.listHTML.appendChild(li);
        }, this);

        this.root.appendChild(this.listHTML);
    }

    renderItem(task) {
        let li = document.createElement('li'),
            checkbox = document.createElement('input'),
            label = document.createElement('label'),
            removeBtn = document.createElement('button');

        checkbox.type = 'checkbox';
        checkbox.setAttribute('class', 'custom-control-input');
        checkbox.setAttribute('id', task.id);
        label.innerText = task.title;
        label.setAttribute('class', 'custom-control-label');
        label.setAttribute('id', task.id);
        removeBtn.innerText = 'REMOVE';
        removeBtn.setAttribute('class', 'btn btn-primary');

        if (task.done) {
            checkbox.setAttribute('checked', true);
            label.style.textDecoration = 'line-through';
            label.style.opacity = '0.5';
        }

        li.setAttribute('data-id', task.id);
        li.setAttribute('class', 'custom-control custom-checkbox')
        li.appendChild(checkbox);
        li.appendChild(label);
        li.appendChild(removeBtn);

        return li;
    }
}

class Controller {
    
    constructor(model, view) {
        this.model = model;
        this.view = view;
    }

    createForm() {
        this.view.renderForm( this.model.getInitialTask() );
    }

    renderToDoList() {
        this.view.renderList(this.model.tasks);
    }

    addListeners() {
        this.view.listHTML.addEventListener('click', event => {
            let target = event.target;
            
            if (target.nodeName === 'BUTTON' || target.nodeName === 'INPUT' || target.nodeName === 'LABEL') {
                let id = +target.parentNode.getAttribute('data-id');

                target.type === 'checkbox' || target.nodeName === 'LABEL'
                    ? this.model.toggleState(id)
                    : this.model.removeTask(id);
                
                this.view.clear();
                this.init();
            }    
        })

        this.view.form.addEventListener('submit', e => {
            e.preventDefault();

            // console.dir(this.view.clearBtn);


            let value = this.view.formInput.value,
                id = this.view.formInput.getAttribute('data-id');

            if (value === '') {
                return;
            }

            this.model.addTask({
                title: value,
                id: +id,
                done: false
            });

            this.view.clear();
            this.init();
        })

        this.view.clearBtn.addEventListener('click', e => {
            this.model.clearTasks();
            this.view.clear();
            this.init();
        })
    }


    init() {
        this.createForm();
        this.renderToDoList();
        this.addListeners();
    }

}

// let tasks = [
//     {
//         title: 'Task 1',
//         done: true,
//         id: 5524324324
//     },
//     {
//         title: 'One more task',
//         done: false,
//         id: 5524355555
//     },
//     {
//         title: 'Other task',
//         done: true,
//         id: 5524355551
//     },
//     {
//         title: 'Other task123',
//         done: true,
//         id: 55243555512
//     },
//     {
//         title: 'Other 222 task123',
//         done: false,
//         id: 55243
//     }
// ];


let data = JSON.parse( localStorage.getItem('tasks') ),
    tasks = Array.isArray(data) ? data : [];

let toDoList = new Controller(
    new ToDoList(tasks),
    new View(document.getElementById('root'))
);

toDoList.init();



