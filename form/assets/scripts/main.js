$(document).ready(function ($) {
	$('.title').on('click', function(){
		$(this).next().slideToggle(500);
	});

	// $('.slider').slick({
	// 	dots: false,
	// 	infinite: true,
	// 	speed: 1000,
	// 	slidesToShow: 2,
	// 	centerMode: false,
	// 	variableWidth: true,
	// 	autoplay: true,
	// 	autoplaySpeed: 3000
	// });

	function showSlider() {
		$('.slider').slick({
			dots: false,
			infinite: true,
			speed: 1000,
			slidesToShow: 1,
			centerMode: false,
			variableWidth: true,
			autoplay: true,
			autoplaySpeed: 3000
		});

		console.log('showSlider done')
	}

	/* --- Upload img --- */

	function readURL(e) {
		$('.gallery__slide').remove();
		$( '.gallery__btn1' ).css( "display", "none");	
		$( '.gallery__btn2' ).css( "display", "none");
		$( '.gallery__buttons' ).removeClass( "gallery__buttons_mobile-one gallery__buttons_mobile");
		$( '.gallery__img' ).removeClass( "gallery__img_mobile");
		
		$(".gallery").hide();


		// console.log(this.files);

		let pictures = this.files;

		if (pictures) {
			for (let i = 0; i < pictures.length; i++) {
				let reader = new FileReader();
				$(reader).load(function(e) { 

					if (pictures.length == 1) {
						$('.slider').append(
							`<img src="${e.target.result}" alt="image${i + 1}" class="gallery__img gallery__slide gallery__img_mobile">`
						);
					} else {
						$('.slider').append(
							`<img src="${e.target.result}" alt="image${i + 1}" class="gallery__img gallery__slide">`
						);
					}

					
				});
				reader.readAsDataURL(pictures[i]);
			}	
		}

		$( '.gallery__btn1' ).css( "display", "block");

		if (pictures.length == 1) {
			$( '.gallery__buttons' ).addClass( "gallery__buttons_mobile-one");
		}

		

		if (pictures.length > 1) {
			$( '.gallery__btn2' ).css( "display", "block");
			// $( '.gallery__buttons' ).removeClass( "gallery__buttons_mobile-one");	
		}

		if (pictures.length > 2) {
			$( '.gallery' ).css( "width", "245");
			$( '.gallery__buttons' ).addClass( "gallery__buttons_mobile");
			setTimeout(showSlider, 2000);

			

		}

		setTimeout(function() {
			$(".gallery").show("slow");
		}, 2000);
		
	}

	$("#upload-picture").change(readURL);



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
