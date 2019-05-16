$(document).ready(function ($) {
	$('.title').on('click', function(){
		$(this).next().slideToggle(500);
	});

	function addSlider() {
		$('.slider').slick({
			dots: false,
			infinite: true,
			speed: 1000,
			slidesToShow: 2,
			centerMode: false,
			variableWidth: true,
			autoplay: false,
			autoplaySpeed: 3000
		});
	}


	let images = [];

	function readDataImg() {
		let files = [...this.files];

		$('#password').attr('type', 'text');

		files = files.filter( item => {
			return item.size < 10000000 && (item.type.startsWith('image/jpeg') || item.type.startsWith('image/jpg') || item.type.startsWith('image/png'));	
		});


		images = images.concat(files);

		if (images.length > 10) {
			images.length = 10;
		}

	

		// Images - PNG, JPG, JPEG. Max size - 10 mb, max images count - 10.


		


		renderImages();
		
		$('#upload-picture').attr('type', 'text');
		$('#upload-picture').attr('type', 'file');
		console.log(images);
		console.log(files);
	}




	function renderImages() {
		$('.slider').empty();
		$( '.gallery__buttons' ).empty();
		$( '.slider' ).removeClass( "slick-initialized slick-slider");

		$('.gallery__slide').remove();
		// $( '.gallery__btn1' ).css( "display", "none");	
		// $( '.gallery__btn2' ).css( "display", "none");
		$( '.gallery__buttons' ).removeClass( "gallery__buttons_mobile-one gallery__buttons_mobile");
		$( '.gallery__img' ).removeClass( "gallery__img_mobile");
		
		$(".gallery").hide();


		// console.log(this.files);

		// let archive = [...this.files];

		// console.log(archive);

		

		let pictures = images;

		if (pictures) {


			


			for (let i = 0; i < pictures.length; i++) {


				if (!pictures[i].type.startsWith('image/')) {
					continue;
				}

				let reader = new FileReader();
				$(reader).load(function(e) { 

					if (pictures.length == 1) {
						$('.slider').append(
							`<img src="${e.target.result}" alt="image${i + 1}" data-key="${i}" class="gallery__img gallery__slide gallery__img_mobile">`
						);
					} else {
						$('.slider').append(
							`<img src="${e.target.result}" alt="image${i + 1}" data-key="${i}" class="gallery__img gallery__slide">`
						);
					}

					
				});
				reader.readAsDataURL(pictures[i]);
			}	
		}

		$( '.gallery__btn1' ).css( "display", "block");

		if (pictures.length == 1) {
			// $( '.gallery__buttons' ).addClass( "gallery__buttons_mobile-one");
			$('.gallery__buttons').append(
				`<button type="button" class="btn btn-danger gallery__btn1">
					Delete
				</button>`
			);
		}

		

		if (pictures.length > 1) {
			
			// $( '.gallery__buttons' ).removeClass( "gallery__buttons_mobile-one");
			$('.gallery__buttons').append(
				`<button type="button" class="btn btn-danger gallery__btn1">
					Delete
				</button>
				<button type="button" class="btn btn-danger gallery__btn2">
					Delete
				</button>`
			);
			


		}

		if (pictures.length > 2) {
			$( '.gallery' ).css( "width", "245");
			$( '.gallery__buttons' ).addClass( "gallery__buttons_mobile");
			setTimeout(addSlider, pictures.length * 1000);

			

		}

		setTimeout(function() {
			$(".gallery").show("slow");
		}, pictures.length * 1000);



		/* --- delete image --- */

	$('.gallery__btn1').on('click', function(){
		console.log('i am work')
		if (images.length == 1) {
			$('.gallery__img').remove();
			$('.gallery__btn1').css( "display", "none");
			images.pop();
		}

		if (images.length == 2) {
			$('.gallery__img')[0].remove();
			$('.gallery__btn1').css( "display", "none");
			$('.gallery__btn2').css( "margin-left", "17px");
			images.shift();
		}


		if (images.length > 2) {
			let key = $('.slick-current').attr('data-key');
			$(`[data-key = ${key}]`).remove();
			// console.log( $(`[data-key = ${key}]`));
			// console.log(key);

			images.splice(key, 1);
			// renderImages();
		}
		

		// if (images.length == 2) {

		// }


		console.log('Click on btn1');

		console.log(images);
		
		
	});


	$('.gallery__btn2').on('click', function(){

		if (images.length == 1) {
			$('.gallery__img').remove();
			$('.gallery__btn2').css( "display", "none");
			images.pop();
		}

		if (images.length == 2) {
			$('.gallery__img')[1].remove();
			$('.gallery__btn2').css( "display", "none");
			// $('.gallery__btn2').css( "margin-left", "17px");
			images.pop();
		}
		


		console.log(images);

		
		
	});

		
	}


	$("#upload-picture").change(readDataImg);




	









	/* --- upload video --- */

	$("#upload-video").change(function(){
		console.log(this.files);

		$( '.video__img' ).css( "display", "block");	
		$( '.video__btn' ).css( "display", "block");
	});


	/* --- delete video --- */

	$('.video__btn').on('click', function(){
		let video = $("#upload-video")[0];

		console.log(video.files);

		delete video.files[0];

		console.log(video.files);
		
	});



	




});
