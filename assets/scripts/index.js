import 'babel-polyfill';
import 'jquery';
import en from '../translations/en.json';
import ru from '../translations/ru.json';
import ua from '../translations/ua.json';
import 'bootstrap/dist/css/bootstrap.min.css';
import './../styles/main.scss';
import './../styles/media.scss';
// import '../images/winter.jpg';

const cookieExpireDate = new Date(2118, 10, 15).toUTCString();

const icon = document.getElementsByClassName('language__icon')[0],
      languageList = document.getElementsByClassName('language__list')[0];

const enLang = document.getElementById('en'),
      ruLang = document.getElementById('ru'),
      uaLang = document.getElementById('ua');

function updateText(language) {
    switch (language) {
        case 'en':
            for (let value in en) {
                $(`[data-text= ${value} ]`).text(en[value]);
            }
            break;
        case 'ru':
            for (let value in ru) {
                $(`[data-text= ${value} ]`).text(ru[value]);
            }
            break;
        case 'ua':
            for (let value in ua) {
                $(`[data-text= ${value} ]`).text(ua[value]);
            }
            break;
        default: 
            for (let value in en) {
                $(`[data-text= ${value} ]`).text(en[value]);
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
    let isUserLanguage = getCookie('Language');

    if (isUserLanguage) {
        setLanguage(isUserLanguage);
    } else {
        let preferredLanguage = navigator.language.toLowerCase();

        if ( ~preferredLanguage.indexOf('ru') ) {
            setLanguage('ru');
        } else if ( ~preferredLanguage.indexOf('uk') ) {
            setLanguage('ua');
        } else {
            setLanguage('en');
        }
    }
}

function setLanguage(lang) {
    setCookie(`Language=${lang}; expires=${cookieExpireDate}`);
    updateText(lang);
}

languageList.hidden = true;

icon.addEventListener('click', function(){
    languageList.hidden =  !languageList.hidden;
});


languageList.addEventListener('click', function(event) {
    let userClick = event.target;

    switch (userClick) {
        case enLang:
            setLanguage('en');
            break;
        case ruLang:
            setLanguage('ru');
            break;
        case uaLang:
            setLanguage('ua');
            break;
        default:
            setLanguage('en');
    }
})

document.addEventListener('click', function(e) {
    let userClick = e.target;
    
    // while (!userClick.classList.contains('language')) {
    //     if (userClick === body) {
    //         languageList.hidden = true;
    //         return;
    //     }
    //     console.log(userClick);
    //     userClick = userClick.parentNode;
    // }

    if ( 
        !(userClick.classList.contains('language__list') || userClick.classList.contains('language__item')
        || userClick.classList.contains('language')|| userClick.classList.contains('language__icon')) 
    ) {
        languageList.hidden =  true;
    }
});


$(document).ready(function ($) {
    setUserCookie();
});