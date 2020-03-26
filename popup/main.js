const cookieExpireDate = new Date(2118, 10, 15).toUTCString();
let preferredLanguage;


document.addEventListener("DOMContentLoaded", setUserCookie);

function setUserCookie() {
    let ruButton = document.getElementById('ru');
    let uaButton = document.getElementById('ua');

    addClickEventToButton(ruButton, 'ru');
    addClickEventToButton(uaButton, 'ua');

    let modalLanguage = document.getElementById('modal-language');

    let isUserLanguage = getCookie('Language');

    console.log(isUserLanguage);

    if (isUserLanguage) {
        setLanguage(isUserLanguage, modalLanguage);
    } else {

        modalLanguage.style.display = 'block';

        if ( preferredLanguage === 'ru' ) {
            setLanguage('ru', modalLanguage);
        } else if ( preferredLanguage === 'ua' ) {
            setLanguage('ua', modalLanguage);
        }
    }
}

function addClickEventToButton(el, lang) {
    el.addEventListener('click', () => {
        console.log(`click ${lang}`);
        preferredLanguage = lang;
        setUserCookie();
    }); 
} 

function getCookie(name) {
    let matches = document.cookie.match(new RegExp(
        "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
    ));

    return matches ? decodeURIComponent(matches[1]) : undefined;
}

function setLanguage(lang, modal) {
    setCookie(`Lang=${lang}; expires=${cookieExpireDate}`);

    if (lang === 'ru') {
        document.location.href = 'https://sewingbox.com.ua/ru';
    } else if (lang === 'ua') {
        modal.style.display = 'none';
    }
}

function setCookie(value) {
    document.cookie = value;
}








