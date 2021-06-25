
	// Get a regular interval for drawing to the screen
	window.requestAnimFrame = (function (callback) {
		return window.requestAnimationFrame ||
			window.webkitRequestAnimationFrame ||
			window.mozRequestAnimationFrame ||
			window.oRequestAnimationFrame ||
			window.msRequestAnimaitonFrame ||
			function (callback) {
				window.setTimeout(callback, 1000 / 60);
			};
	})();

	var canvas = document.getElementById("canvas");

	var ctx = canvas.getContext("2d");
	ctx.strokeStyle = "#e66465";
	ctx.lineWith = 5;


	let drawColor = "gold";
	let drawLineWidth = 8;

	var colorPicker = document.querySelector( '.js-color-picker');

	colorPicker.addEventListener( 'change', event => {
		ctx.strokeStyle = event.target.value;
		drawColor = event.target.value;
	} );

	const lineWidthRange = document.querySelector( '.js-line-range' );
	const lineWidthLabel = document.querySelector( '.js-range-value' );

	lineWidthRange.addEventListener( 'input', event => {
		const width = event.target.value;
		lineWidthLabel.innerHTML = width;
		ctx.lineWidth = width;
		drawLineWidth = width;
	} );

// Set up mouse events for drawing
	var drawing = false;
	var mousePos = { x:0, y:0 };
	var lastPos = mousePos;

	canvas.addEventListener("mousedown", function (e) {
		// e.preventDefault();

		drawing = true;
		lastPos = getMousePos(canvas, e);
	}, false);
	canvas.addEventListener("mouseup", function (e) {
		// e.preventDefault();

		drawing = false;
	}, false);
	canvas.addEventListener("mousemove", function (e) {
		// e.preventDefault();

		mousePos = getMousePos(canvas, e);
	}, false);

// Set up touch events for mobile, etc
	canvas.addEventListener("touchstart", function (e) {
		// e.preventDefault();

		mousePos = getTouchPos(canvas, e);
		var touch = e.touches[0];
		var mouseEvent = new MouseEvent("mousedown", {
			clientX: touch.clientX,
			clientY: touch.clientY
		});
		canvas.dispatchEvent(mouseEvent);
	}, false);
	canvas.addEventListener("touchend", function (e) {
		// e.preventDefault();

		var mouseEvent = new MouseEvent("mouseup", {});
		canvas.dispatchEvent(mouseEvent);
	}, false);
	canvas.addEventListener("touchmove", function (e) {
		e.preventDefault();

		var touch = e.touches[0];
		var mouseEvent = new MouseEvent("mousemove", {
			clientX: touch.clientX,
			clientY: touch.clientY
		});
		canvas.dispatchEvent(mouseEvent);
	}, false);

// Prevent scrolling when touching the canvas
	document.body.addEventListener("touchstart", function (e) {
		// e.preventDefault();

		if (e.target == canvas) {
			e.preventDefault();
		}
	}, false);
	document.body.addEventListener("touchend", function (e) {
		// e.preventDefault();

		if (e.target == canvas) {
			e.preventDefault();
		}
	}, false);
	document.body.addEventListener("touchmove", function (e) {
		e.preventDefault();

		if (e.target == canvas) {
			e.preventDefault();
		}
	}, false);

// Get the position of the mouse relative to the canvas
	function getMousePos(canvasDom, mouseEvent) {
		var rect = canvasDom.getBoundingClientRect();
		return {
			x: mouseEvent.clientX - rect.left,
			y: mouseEvent.clientY - rect.top
		};
	}

	// Get the position of a touch relative to the canvas
	function getTouchPos(canvasDom, touchEvent) {
		var rect = canvasDom.getBoundingClientRect();
		return {
			x: touchEvent.touches[0].clientX - rect.left,
			y: touchEvent.touches[0].clientY - rect.top
		};
	}

	// Draw to the canvas
	function renderCanvas() {
		if (drawing) {
			ctx.beginPath();
			ctx.lineWidth = drawLineWidth;
			ctx.strokeStyle = drawColor;
			ctx.moveTo(lastPos.x, lastPos.y);
			ctx.lineTo(mousePos.x, mousePos.y);
			ctx.stroke();
			lastPos = mousePos;
		}
	}

// Allow for animation
	(function drawLoop() {
		requestAnimFrame(drawLoop);
		renderCanvas();
	})();


	window.addEventListener('resize', resizeCanvas, false);

// drawStuff();
	resizeCanvas();

	function resizeCanvas() {
		if (window.innerWidth > 1130) {
			canvas.width = window.innerWidth * 0.8;
			canvas.height = window.innerHeight * 0.8;
		} else if (window.innerWidth < 576) {
			canvas.width = window.innerWidth * 0.89;
			canvas.height = window.innerHeight * 0.77;
		} else {
			canvas.width = window.innerWidth * 0.95;
			canvas.height = window.innerHeight * 0.77;
		}
		/**
		 * Your drawings need to be inside this function otherwise they will be reset when
		 * you resize the browser window and the canvas goes will be cleared.
		 */
		// drawStuff();
	}

	function getImage(canvas) {
		const imageData = canvas.toDataURL();
		const image = new Image();
		image.src = imageData;

		return image;
	}

	function saveImage(image) {
		const link = document.createElement("a");

		link.setAttribute("href", image.src);
		link.setAttribute("download", "canvasImage");
		link.click();
	}

	function saveCanvasAsImageFile() {
		const image = getImage(document.getElementById("canvas"));
		saveImage(image);
	}


	$('#reset').on('click', function () {
		canvas.width = canvas.width;
	});

	$('#save').on('click', function () {
		saveCanvasAsImageFile();
	});







//  function uploadEx() {
//     var canvas = document.getElementById("canvas");
//     var dataURL = canvas.toDataURL("image/png");
//     document.getElementById('hidden_data').value = dataURL;
//     var fd = new FormData(document.forms["form1"]);
//
//     var xhr = new XMLHttpRequest();
//     xhr.open('POST', 'upload_data.php', true);
//
//     xhr.upload.onprogress = function(e) {
//         if (e.lengthComputable) {
//             var percentComplete = (e.loaded / e.total) * 100;
//             console.log(percentComplete + '% uploaded');
//             alert('Картинка успішно завантажена =)');
//         }
//     };
//
//     xhr.onload = function() {
//
//     };
//     xhr.send(fd);
// };
