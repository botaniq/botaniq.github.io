$(document).ready(function ($) {
	$('.title').on('click', function(){
		$(this).next().slideToggle(500);
	});


	/*-------- media --------*/

	/* photo upload */

	let images = [];

	function addSlider() {
		$('.slider').slick({
			dots: false,
			infinite: false,
			speed: 1000,
			slidesToShow: 2,
			centerMode: false,
			variableWidth: true,
			autoplay: false,
			autoplaySpeed: 3000
		});
	}

	function readDataImg() {
		let files = [...this.files];

		// Images - PNG, JPG, JPEG. Max size - 10 mb
		let sortFiles = files.filter( item => {
			return item.size < 10000000 && (item.type.startsWith('image/jpeg') || item.type.startsWith('image/jpg') || item.type.startsWith('image/png'));	
		});

		if (sortFiles.length != files.length) {
			alert('Images - PNG, JPG, JPEG. Max size - 10 mb');
		}

		images = images.concat(sortFiles);

		// Images - max images count - 10.
		if (images.length > 10) {
			alert('Max images count - 10!');
			images.length = 10;
		}

		renderGallery();
		
		//To clear FileList (doesn't work on iPhone)

		// $('#upload-picture').attr('type', 'text');
		// $('#upload-picture').attr('type', 'file');

		// console.log('readDataImg :');
		// console.log(images);
	}

	function renderGallery() {
		// To clear styles of gallery
		$('.gallery').hide();
		$( '.gallery' ).css( "width", "auto");
		$('.slider').empty();
		$('.slider').removeClass( "slick-initialized slick-slider");
		$('.gallery__slide').remove();
		$('.gallery__img' ).removeClass( "gallery__img_mobile");
		$('.gallery__buttons').empty();
		$('.gallery__buttons').removeClass( "gallery__buttons_mobile-one gallery__buttons_mobile");

		// Add spinner
		$('.spinner' ).addClass( "spinner_active");

		
		// Render images
		if (images) {
			for (let i = 0; i < images.length; i++) {
				let reader = new FileReader();
				$(reader).load(function(e) { 

					// Add class to img for mobile
					if (images.length == 1) {
						$('.slider').append(
							`<img src="${e.target.result}" alt="image${i + 1}" data-key="${i}" class="gallery__img gallery__slide gallery__img_mobile">`
						);
					} else {
						$('.slider').append(
							`<img src="${e.target.result}" alt="image${i + 1}" data-key="${i}" class="gallery__img gallery__slide">`
						);
					}
				});
				reader.readAsDataURL(images[i]);
			}
		}

		// Render 'Delete' buttons
		if (images.length == 1) {
			// $( '.gallery__buttons' ).addClass( "gallery__buttons_mobile-one");
			$('.gallery__buttons').append(
				`<button type="button" class="btn btn-danger gallery__btn1">
					Delete
				</button>`
			);
		}

		if (images.length > 1) {
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

		// Add slider
		if (images.length > 2) {
			$( '.gallery' ).css( "width", "245");
			$( '.gallery__buttons' ).addClass( "gallery__buttons_mobile");

			setTimeout(addSlider, images.length * 1000);
		}

		// Show gallery
		setTimeout(function() {
			// Remove spinner
			$('.spinner' ).removeClass( "spinner_active");
			$(".gallery").show("slow");
		}, images.length * 1000);

		addHandlersToButtons();
	}


	function removeSlide(key, index) {
		$('.slider').slick('slickRemove', index);

		if (key) {
			images.splice(key, 1);
		}
	}

	function updateSlideIndex() {

		// Update index of data-attribute 
		let i = 0;
		$('.slick-slide').each(function(){
			$(this).attr("data-slick-index",i);
			i++;
		});

		i = 0;
		$('.slick-slide').each(function(){
			$(this).attr("data-key",i);
			i++;
		});
	}


	function addHandlersToButtons() {

		// Handler to 'Delete' button on the right
		$('.gallery__btn1').on('click', function(){

			// When 1 image
			if (images.length == 1) {
				$('.gallery__img').remove();
				$('.gallery__btn1').css( "display", "none");
				images.pop();
			}
			
			// When 2 images
			if (images.length == 2) {
				$('.gallery__img')[0].remove();
				$('.gallery__btn1').css( "display", "none");
				$('.gallery__btn2').css( "margin-left", "17px");
				images.shift();
			}
		
			// When slider
			if (images.length > 2) {
			
				let key = $('.slick-current').attr('data-key'),
					removeInex = $('.slick-current').attr('data-slick-index');
	
				removeSlide(key, removeInex);
				updateSlideIndex();

				// Move slider when second to last slide has deleted
				if ( ( +key + 1 ) == images.length) {
					$( ".slick-prev" ).trigger( "click" );
				}
			}
			
			// console.log('Click on btn - 1');
			// console.log(images);
		});
	
		// Handler to 'Delete' button on the left
		$('.gallery__btn2').on('click', function(){

			// When 1 image
			if (images.length == 1) {
				$('.gallery__img').remove();
				$('.gallery__btn2').css( "display", "none");
				images.pop();
			}
			
			// When 2 images
			if (images.length == 2) {
				$('.gallery__img')[1].remove();
				$('.gallery__btn2').css( "display", "none");
				// $('.gallery__btn2').css( "margin-left", "17px");
				images.pop();
			}

			// When slider
			if (images.length > 2) {
				let key = $('.slick-current').next().attr('data-key'),
					removeInex = $('.slick-current').next().attr('data-slick-index');
	
				removeSlide(key, removeInex);
				updateSlideIndex();

				// Move slider when second to last slide has deleted
				if ( +key == images.length) {
					$( ".slick-prev" ).trigger( "click" );
				}
			}
			
			// console.log('Click on btn - 2');	
			// console.log(images);
		});
	}

	$("#upload-picture").change(readDataImg);


	/* video upload */

	let video = [];

	function readDataVideo() {
		let files = [...this.files];

		// console.log(files);

		// Video - AVI, MP4, WMV, MOV, MKV, 3gp. Min size - 10mb, max size - 40 mb.
		let sortFiles = files.filter( item => {
			return (item.size > 10000000 && item.size < 40000000) && 
					item.type.startsWith('video/avi') || 
					item.type.startsWith('video/mp4') || 
					item.type.startsWith('video/wmv') ||
					item.type.startsWith('video/mov') || 
					item.type.startsWith('video/mkv') ||	
					item.type.startsWith('video/3gp');
		});

		// Min size - 10mb, max size - 40 mb.
		// let sortFiles = files.filter( item => {
		// 	return item.size > 10000000 && item.size < 40000000;	
		// });

		if (sortFiles.length != files.length) {
			alert('Video - AVI, MP4, WMV, MOV, MKV, 3gp. \n Min size - 10mb, max size - 40 mb.');
		}

		video = video.concat(sortFiles);

		// Max video count - 2.
		if (video.length > 2) {
			alert('Max video count - 2.');
			video.length = 2;
		}

		renderVideo();
		
		//To clear FileList (doesn't work on iPhone)
		// $('#upload-video').attr('type', 'text');
		// $('#upload-video').attr('type', 'file');
	
		console.log('Video array');
		console.log(video);
	}


	function renderVideo() {
		if (video.length == 1) {
			$('.video__img1').css( "display", "block");
			$( '.video__btn1' ).css( "display", "block");
		} else if (video.length == 2){
			$('.video__img1').css( "display", "block");
			$( '.video__btn1' ).css( "display", "block");
			$('.video__img2').css( "display", "block");
			$( '.video__btn2' ).css( "display", "block");
		}
	}
	
	$("#upload-video").change(readDataVideo);

	/* --- delete video --- */

	// Handler to 'Delete' button on the right
	$('.video__btn1').on('click', function(){

		// When 1 image
		if (video.length == 1) {
			$('.video__img1').css( "display", "none");
			$('.video__btn1').css( "display", "none");
			video.pop();
		}
		
		// When 2 images
		if (video.length == 2) {
			$('.video__img1').css( "display", "none");
			$('.video__btn1').css( "display", "none");
			$('.video__btn2').css( "margin-left", "17px");
			video.shift();
		}
	
		// console.log('Click on btn - 1');
		// console.log(video);
	});

	// Handler to 'Delete' button on the left
	$('.video__btn2').on('click', function(){

		// When 1 image
		if (video.length == 1) {
			$('.video__img2').css( "display", "none");
			$('.video__btn2').css( "display", "none");
			video.pop();
		}
		
		// When 2 images
		if (video.length == 2) {
			$('.video__img2').css( "display", "none");
			$('.video__btn2').css( "display", "none");
			video.pop();
		}

		// console.log('Click on btn - 2');	
		// console.log(video);
	});



	/*-------- Sending form data --------*/


	// во всех запросах
	// добавлять header
	// Token: xxxxxxxx

	// {
	// 	photos: ['adasd','dsds'],
	// 	videos: ['adas']
	//    }

	/* Information */
	
	$('.information').submit(function(e) {
		let $form = $(this),
			formDataObj = {};

		// Get form data and add it to object
		const formData = $form.serializeArray();
		formData.forEach(item => {
			formDataObj[item.name] = item.value;
		});

		console.log(formData);
		console.log(JSON.stringify(formDataObj));

		// Send form data
		$.ajax({
			method: 'POST',
			type: 'POST', // For jQuery < 1.9
			url: $form.attr('action'), // Add the correct url
			data: JSON.stringify(formDataObj),
			dataType: "json",

			// One of these header should work
			headers: { 'Token': 'xxxxxxxx' },
			beforeSend: function(xhr){xhr.setRequestHeader('Token', 'xxxxxxxx');},
		}).done(function() {
			console.log('success');
		}).fail(function() {
			console.log('fail');
		});

		// Cancel the default action for the submit button
		e.preventDefault(); 
	});
	
	/* Media */

	$('#media').submit(function(e) {
		let $form = $(this),
			formDataObj = {
				photos: images,
				videos: video
			};

		// console.log(formDataObj);
		// console.log(JSON.stringify(formDataObj));

		// Send form data
		$.ajax({
			method: 'POST',
			type: 'POST', // For jQuery < 1.9
			url: $form.attr('action'), // Add the correct url
			data: JSON.stringify(formDataObj),
			dataType: "json",

			// One of these header should work
			headers: { 'Token': 'xxxxxxxx' },
			beforeSend: function(xhr){xhr.setRequestHeader('Token', 'xxxxxxxx');},
		}).done(function() {
			console.log('success');
		}).fail(function() {
			console.log('fail');
		});

		// Cancel the default action for the submit button
		e.preventDefault(); 
	});

});
