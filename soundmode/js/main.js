var navMain = document.querySelector('.menu');
var navToggle = document.querySelector('.menu__toggle');

navMain.classList.remove('menu_nojs');

navToggle.addEventListener('click', function() {
    if (navMain.classList.contains('menu_closed')) {
        navMain.classList.remove('menu_closed');
        navMain.classList.add('menu_opened');
    } else {
        navMain.classList.add('menu_closed');
        navMain.classList.remove('menu_opened');
    }
});

$(window).scroll(function() { 
    var the_top = $(document).scrollTop();
    if (the_top > 100) {
        $('.fix-menu').addClass('fix-menu_fixed');
        $('.chief').addClass('chief_indent');
        $('#first').removeClass('active-link_home');

    }
    else {
        $('.fix-menu').removeClass('fix-menu_fixed');
        $('.chief').removeClass('chief_indent');
        $('#first').removeClass('active-link');
        $('#first').addClass('active-link_home');
    }
});

var menu_selector = ".menu"; // Переменная должна содержать название класса или идентификатора, обертки нашего меню. 
function onScroll(){
    var scroll_top = $(document).scrollTop();
    // console.log(scroll_top);
    $(menu_selector + " a").each(function(){
        var hash = $(this).attr("href");
        // console.log('hash' + hash);
        var target = $(hash);
        // console.log('target' + target)
        if (target.position().top <= scroll_top && target.position().top + target.outerHeight() > scroll_top) {

            // console.log('target.position().top = ' + target.position().top);
            // console.log('target.outerHeight() = ' + target.outerHeight());
            // console.log('scroll_top = ' + scroll_top);
            $(menu_selector + " a.active-link").removeClass("active-link");
            $(this).addClass("active-link");

        } else {
            $(this).removeClass("active-link");
        }
    });
}
$(document).ready(function () {
    // $(document).on("scroll", onScroll);
    $("a[href^=\\#]").click(function(e){
        e.preventDefault();
        $(document).off("scroll");
        $(menu_selector + " a.active-link").removeClass("active-link");
        
        $(this).addClass("active-link");
        

        var hash = $(this).attr("href");
        var target = $(hash);


        $("html, body").animate({
            scrollTop: target.offset().top
        }, 500, function(){
            console.log( window.location.hash);
            window.location.hash = hash;
            console.log( window.location.hash);
            $(document).on("scroll", onScroll);
        });
    });
});

var userFeed = new Instafeed({
    get: 'user',
    userId: '4783074835',
    clientId: 'd493154c90de4ab6b0710cb5ff8d16bd',
    accessToken: '4783074835.d493154.5114ca90ba6a415aa6da9d44954fbc5e',
    resolution: 'standard_resolution',
    template: '<a href="{{link}}" target="_blank" id="{{id}}"><img src="{{image}}" /></a>',
    sortBy: 'most-recent',
    limit: 9,
    links: false
  });
  userFeed.run();



$(document).ready(function () { 
    $('[data-submit]').on('click', function(e){
        e.preventDefault();
        $(this).parent('form').submit();
    })
    $.validator.addMethod(
        "regex",
        function(value, element, regexp) {
            var re = new RegExp(regexp);
            return this.optional(element) || re.test(value);
        },
        "Пожалуйста, проверьте свои данные"
    );
    function valEl(el){

        el.validate({
            rules:{
                Телефон:{
                    required:true,
                    regex: '^([\+]+)*[0-9\x20\x28\x29\-]{5,20}$'
                },
                Имя:{
                    required:true
                },
                Сообщение:{
                    required:true
                }
            },
            messages:{
                Телефон:{
                    required:'Поле обязательно для заполнения',
                    regex:'Телефон может содержать символы + - ()'
                },
                Имя:{
                    required:'Поле обязательно для заполнения'
                },
                Сообщение:{
                    required:'Поле обязательно для заполнения'
                }
            },
            submitHandler: function (form) {
                var $form = $(form);
                var $formId = $(form).attr('id');
                switch($formId){
                    case'goToNewPage':
                        $.ajax({
                            type: 'POST',
                            url: $form.attr('action'),
                            data: $form.serialize(),
                        })
                            .always(function (response) {
                                //ссылка на страницу "спасибо" - редирект
                                // location.href='';
                                //отправка целей в Я.Метрику и Google Analytics
                                ga('send', 'event', 'masterklass7', 'register');
                                yaCounter27714603.reachGoal('lm17lead');
                            });
                        break;
                    case'popupResult':
                        $.ajax({
                            type: 'POST',
                            url: $form.attr('action'),
                            data: $form.serialize(),
                        })
                            .always(function (response) {
                                setTimeout(function (){
                                    $('#overlay').fadeIn();
                                    $('#popup').fadeIn();
                                    $form.trigger('reset'); //очистка данных формы
                                },1100);
                                $('#overlay, #close').on('click', function(e) {
                                    $('#overlay').fadeOut();
                                    $('#popup').fadeOut();
                                });
                            });
                        break;
                }
                return false;
            }
        })
    };

    $('.invite').each(function() {
        valEl($(this));
    });
    $('[data-scroll]').on('click', function(){
        $('html, body').animate({
            scrollTop: $( $.attr(this, 'data-scroll') ).offset().top
        }, 2000);
        event.preventDefault();
    });
}); 

$(document).ready(function(){
    $(document).click( function(event){
        setTimeout(function (){
            $("label").fadeOut();
            event.stopPropagation();
        },4100);
    });
});

$(function(){
    $("#tel").mask("+38(099)-999-99-99");
});