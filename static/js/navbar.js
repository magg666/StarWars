import {createLoginNav, createRegistrationNav, createLogoutNav, createLoginInfo} from "./dom_handler.js";


export {displayNavigationBar, setNavBarForLogged, setNavBarForNotLogged}



function setNavBarForNotLogged() {
    const menu = document.getElementById('nav-bar');
    let loginNav = createLoginNav();
    let registrationNav = createRegistrationNav();
    let logoutElement = document.getElementById('logout-nav');
    let infoElement = document.getElementById('login-info-nav');

    if (menu.contains(logoutElement) && menu.contains(infoElement)) {
        menu.replaceChild(loginNav, logoutElement);
        menu.replaceChild(registrationNav, infoElement);
    } else {
        menu.appendChild(loginNav);
        menu.appendChild(registrationNav);
    }
}

function setNavBarForLogged(username) {
    const menu = document.getElementById('nav-bar');
    let logoutNav = createLogoutNav();
    let loginInfoNav = createLoginInfo(username);
    let loginElement = document.getElementById('login-nav');
    let registerElement = document.getElementById('registration-nav');

    if (menu.contains(loginElement) && menu.contains(registerElement)) {
        menu.replaceChild(logoutNav, loginElement);
        menu.replaceChild(loginInfoNav, registerElement);
    } else {
        menu.appendChild(logoutNav);
        menu.appendChild(loginInfoNav);
    }
}

// when page loaded - check if user is logged(is there a cookie with his username) and show nav bar adequately
function displayNavigationBar() {
    let username = localStorage.getItem('username');
    if (username) {
        setNavBarForLogged(username)
    } else {
       setNavBarForNotLogged()
    }
}

