import {logOut, logIn, registration} from "./user.js";

export {clearElement, removeHtmlString, showSpinner}
export {createLoginInfo, createLogoutNav, createRegistrationNav, createLoginNav}
export {displayErrorMessage, displaySuccessMessage}

export {openModal, clearModal, closeModal}


// clear functions
function clearElement(selector) {
    const element = document.querySelector(selector);

    while (element.firstChild) {
        element.removeChild(element.firstChild)
    }
}

function removeHtmlString(element) {
    if (element) {
        element.innerHTML = "";
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

    logoutNav.addEventListener('click', logOut);

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
    loginNav.addEventListener('click', logIn);

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

    registrationNav.addEventListener('click', registration);

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

function showSpinner(element) {
    const spinner = document.createRange().createContextualFragment`
    <div class="spinner-border text-primary" role="status">
        <span class="sr-only">Loading...</span>
    </div>`;
    if (element && element.firstChild === null) {
        element.appendChild(spinner)
    }
}


// display messages about success/loginFail (login/registration)
function displayErrorMessage(fail, success, message) {

    fail.style.display = 'block';
    fail.textContent = message;

    success.style.display = 'none';

}

function displaySuccessMessage(fail, success, message) {

    success.style.display = 'block';
    success.textContent = message;

    fail.style.display = 'none';

}

// --- small modal---

function createSmallModal(username, message) {
    let modalContainer = document.getElementById('small-modal');
    let modal = `
    <div class="info-modal-body">
        <div class="info-modal-title">
            <button class="info-modal-close" id="close-small-modal"><span>&times;</span></button>
            <span>Hello <strong>${username}</strong></span>
        </div>        
        <div class="info-modal-message">
            <span>${message}</span>
        </div>
    </div>
    `;
    modalContainer.insertAdjacentHTML("afterbegin", modal)
}

function openModal(username, message) {
    createSmallModal(username, message);
    let modal = document.getElementById('small-modal');
    modal.classList.replace('hidden', 'visible');
    addHidingModal();
}

function closeSmallModal() {
    let modal = document.getElementById('small-modal');
    modal.innerHTML = "";
    modal.classList.replace('visible', 'hidden');
    window.removeEventListener('click', closeSmallModal)
}

function addHidingModal() {
    let closeButton = document.getElementById('close-small-modal');
    closeButton.addEventListener('click', closeSmallModal);
    setTimeout(function () {
        window.addEventListener('click', closeSmallModal)
    }, 200)
}

// ---- other modals
function closeModal(modalId) {
    setTimeout(function () {
        $(`#${modalId}`).modal('hide')
    }, 2000);
}

function clearModal(modalId) {
    $(`#${modalId}`).on('hide.bs.modal', function () {
        let modal = document.getElementById(modalId);
        let alerts = modal.querySelectorAll('.alert');
        let inputs = modal.querySelectorAll('input');

        for(let alert of alerts){
            alert.style.display = 'none';
            alert.textContent = '';
        }
        for(let input of inputs){
            input.value = '';
        }
    });
}