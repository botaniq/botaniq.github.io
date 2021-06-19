var canvas = document.getElementById("canvas"),
  ctx = canvas.getContext("2d"),
  colors = [];



var colourNames = {
	aliceblue: "F0F8FF",
	antiquewhite: "FAEBD7",
	aqua: "00FFFF",
	aquamarine: "7FFFD4",
	azure: "F0FFFF",
	beige: "F5F5DC",
	bisque: "FFE4C4",
	black: "000000",
	blanchedalmond: "FFEBCD",
	blue: "0000FF",
	blueviolet: "8A2BE2",
	brown: "A52A2A",
	burlywood: "DEB887",
	cadetblue: "5F9EA0",
	chartreuse: "7FFF00",
	chocolate: "D2691E",
	coral: "FF7F50",
	cornflowerblue: "6495ED",
	cornsilk: "FFF8DC",
	crimson: "DC143C",
	cyan: "00FFFF",
	darkblue: "00008B",
	darkcyan: "008B8B",
	darkgoldenrod: "B8860B",
	darkgray: "A9A9A9",
	darkgreen: "006400",
	darkgrey: "A9A9A9",
	darkkhaki: "BDB76B",
	darkmagenta: "8B008B",
	darkolivegreen: "556B2F",
	darkorange: "FF8C00",
	darkorchid: "9932CC",
	darkred: "8B0000",
	darksalmon: "E9967A",
	darkseagreen: "8FBC8F",
	darkslateblue: "483D8B",
	darkslategray: "2F4F4F",
	darkslategrey: "2F4F4F",
	darkturquoise: "00CED1",
	darkviolet: "9400D3",
	deeppink: "FF1493",
	deepskyblue: "00BFFF",
	dimgray: "696969",
	dimgrey: "696969",
	dodgerblue: "1E90FF",
	firebrick: "B22222",
	floralwhite: "FFFAF0",
	forestgreen: "228B22",
	fuchsia: "FF00FF",
	gainsboro: "DCDCDC",
	ghostwhite: "F8F8FF",
	gold: "FFD700",
	goldenrod: "DAA520",
	gray: "808080",
	green: "008000",
	greenyellow: "ADFF2F",
	grey: "808080",
	honeydew: "F0FFF0",
	hotpink: "FF69B4",
	indianred: "CD5C5C",
	indigo: "4B0082",
	ivory: "FFFFF0",
	khaki: "F0E68C",
	lavender: "E6E6FA",
	lavenderblush: "FFF0F5",
	lawngreen: "7CFC00",
	lemonchiffon: "FFFACD",
	lightblue: "ADD8E6",
	lightcoral: "F08080",
	lightcyan: "E0FFFF",
	lightgoldenrodyellow: "FAFAD2",
	lightgray: "D3D3D3",
	lightgreen: "90EE90",
	lightgrey: "D3D3D3",
	lightpink: "FFB6C1",
	lightsalmon: "FFA07A",
	lightseagreen: "20B2AA",
	lightskyblue: "87CEFA",
	lightslategray: "778899",
	lightslategrey: "778899",
	lightsteelblue: "B0C4DE",
	lightyellow: "FFFFE0",
	lime: "00FF00",
	limegreen: "32CD32",
	linen: "FAF0E6",
	magenta: "FF00FF",
	maroon: "800000",
	mediumaquamarine: "66CDAA",
	mediumblue: "0000CD",
	mediumorchid: "BA55D3",
	mediumpurple: "9370DB",
	mediumseagreen: "3CB371",
	mediumslateblue: "7B68EE",
	mediumspringgreen: "00FA9A",
	mediumturquoise: "48D1CC",
	mediumvioletred: "C71585",
	midnightblue: "191970",
	mintcream: "F5FFFA",
	mistyrose: "FFE4E1",
	moccasin: "FFE4B5",
	navajowhite: "FFDEAD",
	navy: "000080",
	oldlace: "FDF5E6",
	olive: "808000",
	olivedrab: "6B8E23",
	orange: "FFA500",
	orangered: "FF4500",
	orchid: "DA70D6",
	palegoldenrod: "EEE8AA",
	palegreen: "98FB98",
	paleturquoise: "AFEEEE",
	palevioletred: "DB7093",
	papayawhip: "FFEFD5",
	peachpuff: "FFDAB9",
	peru: "CD853F",
	pink: "FFC0CB",
	plum: "DDA0DD",
	powderblue: "B0E0E6",
	purple: "800080",
	red: "FF0000",
	rosybrown: "BC8F8F",
	royalblue: "4169E1",
	saddlebrown: "8B4513",
	salmon: "FA8072",
	sandybrown: "F4A460",
	seagreen: "2E8B57",
	seashell: "FFF5EE",
	sienna: "A0522D",
	silver: "C0C0C0",
	skyblue: "87CEEB",
	slateblue: "6A5ACD",
	slategray: "708090",
	slategrey: "708090",
	snow: "FFFAFA",
	springgreen: "00FF7F",
	steelblue: "4682B4",
	tan: "D2B48C",
	teal: "008080",
	thistle: "D8BFD8",
	tomato: "FF6347",
	turquoise: "40E0D0",
	violet: "EE82EE",
	wheat: "F5DEB3",
	white: "FFFFFF",
	whitesmoke: "F5F5F5",
	yellow: "FFFF00",
	yellowgreen: "9ACD32"
}

var set1 = [];

for(var key in colourNames) {
  set1.push(colourNames[key]);
}

set1 = set1.map( item => '#' + item );

var set2 = ["#6B5B95", "#88B04B", "#34568B", "#F7CAC9", "#F7CAC9", "#009B77", "#DD4124", "#EFC050", "#FFDAB9", "#E6E6FA", "#0000CD", "#B0C4DE", "#7FFFD4", "#7FFF00", "#FFD700", "#B22222"];

colors = set2;

function changeColor() {
	for (let i = set2.length - 1; i > 0; i--) {
		let j = Math.floor(Math.random() * (i + 1));
		[set2[i], set2[j]] = [set2[j], set2[i]];
	}

	colors = set2;
}



window.addEventListener('resize', resizeCanvas, false);

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
  drawStuff();
}

resizeCanvas();

function drawStuff() {
  var down = false;

  if ('ontouchstart' in window) {
    /* browser with Touch Events support */
    $("#canvas").click(function(event) {
      ctx.beginPath();

      var index = Math.floor(Math.random() * colors.length - 1);

      ctx.strokeStyle = colors[index];
      console.log(colors[index]);
      ctx.arc(event.pageX, event.pageY, 3, 0, Math.PI * 2, false);
      ctx.stroke();
    });
  }

  $(document).mousedown(function() {
    down = true;
  }).mouseup(function() {
    down = false;
  });

  $("#canvas").mousemove(function(event) {
    if(down) {
      ctx.beginPath();
      var index = Math.floor(Math.random() * colors.length - 1);
      ctx.strokeStyle = colors[index];
      ctx.arc(event.pageX, event.pageY, 3, 0, Math.PI * 2, false);
      ctx.stroke();
    }
  });
}

function getImage(canvas){
  var imageData = canvas.toDataURL();
  var image = new Image();
  image.src = imageData;

  return image;
}

function saveImage(image) {
  var link = document.createElement("a");

  link.setAttribute("href", image.src);
  link.setAttribute("download", "canvasImage");
  link.click();
}

function saveCanvasAsImageFile(){
  var image = getImage(document.getElementById("canvas"));
  saveImage(image);
}


$('#reset').on('click', function(){
  ctx.clearRect(0, 0, canvas.width, canvas.height);
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
