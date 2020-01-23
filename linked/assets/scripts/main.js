let language, ru = {}, en = {};
const version = 2;
const cookieExpireDate = new Date(2118, 10, 15).toUTCString();

function getTranslating(box, lang) {
    $.getJSON(`assets/i18n/${lang}.json?v=` + version, function (obj) {
        for (let key in obj) {
            if (!obj.hasOwnProperty(key)) continue;
            box[key] = obj[key];
        }
    });
}

getTranslating(ru, 'ru');
getTranslating(en, 'en');

function updateText() {
    language = $('.language option:selected').val();
    if (language === 'ru') {
        for (let key in ru) {
            $(`[data-i18n= ${key} ]`).text(ru[key]);
        }
    } else {
        for (let key in en) {
            $(`[data-i18n= ${key} ]`).text(en[key]);
        }
    }
}

function getCookie(name) {
    let matches = document.cookie.match(new RegExp(
        "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
    ));
    return matches ? decodeURIComponent(matches[1]) : undefined;
}

function setCookie(value) {
    document.cookie = value;
}

function setUserCookie() {
//     let isUserLanguage = getCookie('Language');
//     if (isUserLanguage) {
//         document.getElementById(isUserLanguage).selected = true;
//     } else {
        let preferredLanguage = navigator.language.toLowerCase();
        if (~preferredLanguage.indexOf('ru') || ~preferredLanguage.indexOf('uk')) {
            document.getElementById('ru').selected = true;
        } else {
            document.getElementById('en').selected = true;
        }
//     }
}

function setLanguage(lang, select) {
    setCookie(`Language=${lang}; expires=${cookieExpireDate}`);
    select.value = lang;
}

function validateTranslations() {
    setTimeout(() => {
        if (!$('[data-i18n]')[0].text) {
            updateText();
        }
    }, 2000);
}

$(document).ready(function ($) {
    setUserCookie();

    const select = $('#selectLanguage')[0];

    $('#english').click(function () {
        setLanguage('en', select);
    });

    $('#russian').click(function () {
        setLanguage('ru', select);
    });

    updateText();
    validateTranslations();
    $('.footer__language').on('click', updateText);

    /* ======== show features ======== */

    const featuresList = document.getElementsByClassName('features__list')[0];
    let featuresItem = document.getElementsByClassName('features__item'),
        featuresContent = document.getElementsByClassName('features__content');

    function removeFeaturesItemActive() {
        for (let i = 0; i < featuresItem.length; i++) {
            featuresItem[i].classList.remove('features__item_active');
        }
    }

    function removeFeaturesContentActive() {
        for (let i = 0; i < featuresContent.length; i++) {
            featuresContent[i].classList.remove('features__content_active');
        }
    }

    featuresList.addEventListener('click', (e) => {
        let target = e.target;

        while (target !== featuresList) {
            if (target.className === 'features__item') {
                for (let i = 0; i < featuresItem.length; i++) {
                    if (target === featuresItem[i]) {
                        removeFeaturesItemActive();
                        featuresItem[i].classList.add('features__item_active');
                        removeFeaturesContentActive();
                        featuresContent[i].classList.add('features__content_active');

                        // animate
                        $(featuresContent[i]).find('.features__description').css('opacity', '0').css('left', '-770px');
                        $(featuresContent[i]).find('.features__img').css('opacity', '0').css('right', '-350px');
                        $('.features__description').delay(200).animate({opacity:1, left:0},'slow');
                        $('.features__img').delay(500).animate({opacity:1, right:0},'slow');

                        return;
                    }
                }
                return;
            }
            target = target.parentNode;
        }
    });

    /* ======== show add ======== */

    const addSwitch = document.getElementsByClassName('add__switch')[0];
    let addCircle = document.getElementsByClassName('add__circle'),
        addBox = document.getElementsByClassName('add__box'),
        addNumber = 0;

    function removeAddCircleActive() {
        for (let i = 0; i < addCircle.length; i++) {
            addCircle[i].classList.remove('add__circle_active');
        }
    }

    function removeAddBoxActive() {
        for (let i = 0; i < addBox.length; i++) {
            addBox[i].classList.remove('add__box_active');
        }
    }

    function showAddBox(addNumber) {
        removeAddCircleActive();
        addCircle[addNumber].classList.add('add__circle_active');
        removeAddBoxActive();
        addBox[addNumber].classList.add('add__box_active');
    }

    let timerId = setTimeout(function showAddBlocks() {
        showAddBox(addNumber);
        addNumber++;
        if (addNumber > 2) addNumber = 0;
        timerId = setTimeout(showAddBlocks, 3000);
    }, 3000);

    addSwitch.addEventListener('click', (e) => {
        clearTimeout(timerId);
        let target = e.target;

        if (target.className === 'add__circle') {
            for (let i = 0; i < addCircle.length; i++) {
                if (target === addCircle[i]) {
                    showAddBox(i);
                    return;
                }
            }
        }
    });

    /* --- show add slider ----*/

    $(window).on('load resize', function () {
        if ($(window).width() < 976) {
            $('.add__boxes').slick({
                dots: true,
                infinite: true,
                speed: 1000,
                slidesToShow: 1,
                centerMode: true,
                variableWidth: true,
                arrows: false,
                autoplay: true,
                autoplaySpeed: 3000
            });
        } else {
            $(".add__boxes").slick("unslick");
        }
    });

    /* ======== slider  ======== */

    $(window).on('load resize', function () {
        if ($(window).width() < 976) {
            $('.testimonials__slider').slick({
                dots: true,
                infinite: true,
                speed: 1000,
                slidesToShow: 1,
                centerMode: true,
                variableWidth: true,
                arrows: false,
                autoplay: true,
                autoplaySpeed: 3000
            });
        } else {
            $(".testimonials__slider").slick("unslick");
        }
    });

    $('.testimonials__slider').on('setPosition', function () {
        $(this).find('.slick-slide').height('auto');
        let slickTrack = $(this).find('.slick-track');
        let slickTrackHeight = $(slickTrack).height();
        $(this).find('.slick-slide').css('height', slickTrackHeight + 'px');
    });

    /* ======== questions ======== */

    const questionButton = document.getElementsByClassName('questions__button')[0],
        str = 'mailto:admin@linkedator.com?Subject=Question%20from%20';

    questionButton.addEventListener('click', (e) => {
        let emailFromInput = document.getElementsByClassName('questions__input')[0].value;
        if (emailFromInput) {
            questionButton.href = str + emailFromInput;
        }
    });

    /* ======== menu ======== */

    $(window).scroll(function () {
        let the_top = $(document).scrollTop();
        if (the_top > 300) {
            $('.header').addClass('header_fixed');
            $('.offer__title').addClass('offer__title_indent');
        } else {
            $('.header').removeClass('header_fixed');
            $('.offer__title').removeClass('offer__title_indent');
        }
    });


    $("a[href^=\\#]").click(function (e) {
        e.preventDefault();
        $(document).off("scroll");

        let hash = $(this).attr("href");
        let target = $(hash);


        $("html, body").animate({
            scrollTop: target.offset().top
        }, 500, function () {
            window.location.hash = hash;
        });
    });


    const navMain = document.querySelector('.menu');
    const navToggle = document.querySelector('.menu__toggle');

    navMain.classList.remove('menu_nojs');

    navToggle.addEventListener('click', function () {
        if (navMain.classList.contains('menu_closed')) {
            navMain.classList.remove('menu_closed');
            navMain.classList.add('menu_opened');
        } else {
            navMain.classList.add('menu_closed');
            navMain.classList.remove('menu_opened');
        }
    });

    /* ======== main-block ======== */


    $(window).on('load resize', function () {
        if ($(window).width() < 976) {
            $('.main-block').css({height: window.innerHeight});
        } else {
            $('.main-block').css({height: 100 + 'vh'});
        }
    });

    /* ======== show page ======== */

    setTimeout(function () {
        document.getElementsByTagName("html")[0].style.visibility = "visible";
    }, 1000);

    /* ======== animations ======== */

    const contactIcons = $(".main-block__img-profile");

    for (let i = 1, time = 3000; i <= contactIcons.length; i++) {
        time += 250;
        setTimeout(function () {
            $("#profile-" + i).css("display", "block").addClass('animated zoomIn');
        }, time);
    }

    setTimeout(function () {
        $("#imgNetwork").fadeIn(3000);
        $("#imgNetworkFull").fadeIn(3000);
    }, 1000);

    setTimeout(function () {
        $("#MacBook").addClass('floating').css('display', 'block');
    }, 1300);

    setTimeout(function () {
        $("#offer").fadeIn(3000);
        $("#arrow").fadeIn(3000);
    }, 1500);

    $('.firstShowAnimation').addClass("hidden").viewportChecker({
        classToAdd: 'visible animated fadeInDown', // Class to add to the elements when they are visible
        offset: 100
    });

    $('.features').viewportChecker({
        callbackFunction: function(){
            $('.features__description').delay(200).animate({opacity:1, left:0},'slow');
            $('.features__img').delay(500).animate({opacity:1, right:0},'slow');
        }
    });

    $('.questions').viewportChecker({
        callbackFunction: function(){
            $('.questions__heading').delay(200).animate({opacity:1, left:0},'slow');
            $('.questions__field').delay(500).animate({opacity:1, right:0},'slow');
            $('.questions__button-block').delay(500).animate({opacity:1, right:0},'slow');
        }
    });


    /* ======== cookies ======== */

    const close = document.querySelector('.close'),
          cookiesBlock = document.querySelector('.cookies'),
          arrow = document.querySelector('.arrow');

    function hideCookiesBlock() {
        cookiesBlock.hidden = true;
        arrow.style.bottom = '20px';
    }

    function  checkPolicyAcceptedToCookie() {
        let isCookiePolicyAccepted = getCookie('cookiePolicyAccepted');

        if (isCookiePolicyAccepted) {
            hideCookiesBlock();
        } else {
            setCookie(`cookiePolicyAccepted=${true}; expires=${cookieExpireDate}`);
            hideCookiesBlock();
        }
    }

    function checkPolicyAcceptedToLocalStorage() {
        let isLocalStoragePolicyAccepted = localStorage.getItem('cookiePolicyAccepted');

        if (isLocalStoragePolicyAccepted) {
            hideCookiesBlock();
        } else {
            localStorage.setItem('cookiePolicyAccepted', 'true');
            hideCookiesBlock();
        }
    }

    function checkCookieAccepted() {
        checkPolicyAcceptedToCookie();
        checkPolicyAcceptedToLocalStorage();
    }

    if ( getCookie('cookiePolicyAccepted') || localStorage.getItem('cookiePolicyAccepted') ) {
        hideCookiesBlock();
    }

    close.addEventListener('click', function () {
        checkCookieAccepted();
    });
});

