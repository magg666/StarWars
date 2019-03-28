import {logout, addLoginEventHandlerToForm} from "./login_handler.js";
import {handleLogin} from "./login_handler.js";
import {controlVoteButtons} from "./vote.js";


export {checkIfLoggedAndSetNavBarAccordingly}
export {clearElement}
export {displayErrorMessage, displaySuccessMessage}


// clear children of selected element
function clearElement(selector) {
    const element = document.querySelector(selector);

    while (element.firstChild) {
        element.removeChild(element.firstChild)
    }
}
// creates elements of navigation bar

function createLogoutNav() {
    let logoutNav = document.createElement('li');
    logoutNav.classList.add('nav-item', 'hvr-underline-from-center');
    logoutNav.setAttribute('id', 'logout-nav');

    let a = document.createElement('a');
    a.classList.add('nav-link');
    a.setAttribute('href', "/logout");
    a.textContent = 'Logout';
    logoutNav.appendChild(a);

    logoutNav.addEventListener('click', function (ev) {
        ev.preventDefault();
        logout()
    });

    return logoutNav

}

function createLoginNav() {
    let loginNav = document.createElement('li');
    loginNav.classList.add('nav-item', 'hvr-underline-from-center');
    loginNav.setAttribute('id', 'login-nav');

    let a = document.createElement('a');
    a.classList.add('nav-link');
    a.setAttribute('data-toggle', 'modal');
    a.setAttribute('data-target', '#loginModal');
    a.textContent = 'Login';

    loginNav.appendChild(a);

    return loginNav
}

function createRegistrationNav() {
    let registrationNav = document.createElement('li');
    registrationNav.classList.add('nav-item', 'hvr-underline-from-center');
    registrationNav.setAttribute('id', 'registration-nav');

    let a = document.createElement('a');
    a.classList.add('nav-link');
    a.setAttribute('data-toggle', 'modal');
    a.setAttribute('data-target', '#registerModal');
    a.textContent = 'Registration';

    registrationNav.appendChild(a);

    return registrationNav

}

function createLoginInfo(username) {
    let loginInfoNav = document.createElement('li');
    loginInfoNav.classList.add('nav-item');
    loginInfoNav.setAttribute('id', 'login-info-nav');

    let span = document.createElement('span');
    span.classList.add('navbar-text');
    span.textContent = 'Logged as ' + username;

    loginInfoNav.appendChild(span);

    return loginInfoNav
}

// when page loaded - check if user is logged(is there a cookie with his username) and show nav bar adequately
function checkIfLoggedAndSetNavBarAccordingly() {
    const navList = document.getElementById('nav-bar');
    let username = localStorage.getItem('username');


    if(username === null){
        let logoutNav = document.getElementById('logout-nav');
        let loginInfoNav = document.getElementById('login-info-nav');
        let loginNav = createLoginNav();
        let registrationNav = createRegistrationNav();

        if (navList.contains(logoutNav) && navList.contains(loginInfoNav)) {
            navList.replaceChild(loginNav, logoutNav);
            navList.replaceChild(registrationNav, loginInfoNav);

        } else {
            navList.appendChild(loginNav);
            navList.appendChild(registrationNav);

        }

    }else{
        let loginNav = document.getElementById('login-nav');
        let registrationNav = document.getElementById('registration-nav');
        let logoutNav = createLogoutNav();
        let loginInfoNav = createLoginInfo(username);

        if(navList.contains(loginNav) && navList.contains(registrationNav)){
            navList.replaceChild(logoutNav, loginNav);
            navList.replaceChild(loginInfoNav, registrationNav);

        }else{

            navList.appendChild(logoutNav);
            navList.appendChild(loginInfoNav);

        }
    }
}


// display messages about success/fail (login/registration)
function displayErrorMessage(signingParameters, message){

    signingParameters.fail.style.display = 'block';
    signingParameters.fail.textContent = message;

    signingParameters.success.style.display = 'none';

}

function displaySuccessMessage(signingParameters, message){

    signingParameters.success.style.display = 'block';
    signingParameters.success.textContent = message;

    signingParameters.fail.style.display = 'none';

}