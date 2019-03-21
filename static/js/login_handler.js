import {checkIfLoggedAndSetNavBarAccordingly} from "./dom_handler.js";
import {clearElement} from "./dom_handler.js";
import {displaySuccessMessage, displayErrorMessage} from "./dom_handler.js";
import {setCookie} from "./cookies_handler.js";

export {handleLogin}

// jeśli chcę wykorzystać ten sam modal do logowania i rejestracji;
// to:
// 1. po wciśnięciu login/registration dodają się/ odejmują fragmenty modalu (tytuł, drugie hasło i napis na guziku) -
// te funkcje lądują w dom_handler

// 2. wszystkie funkcje, id, klasy itp. login nazywają się login/register (sign in or up)
// 3. czy server będzie wiedział czy login czy register dzięki ajaxsowi (dane formularza idą najpierw do js - ona przekazuje do servera)?

let signingParameters = {
    fail: document.getElementById('errorAlert'),
    success: document.getElementById('successAlert'),
};


function addLoginEventHandlerToForm() {
    let form = document.getElementById('login-form');

    form.addEventListener('submit', function (ev) {
        ev.preventDefault();
        let dataLogin = {
            username: document.getElementById('username').value,
            password: document.getElementById('password').value,
        };
        if (dataLogin.username && dataLogin.password) {
            checkAndInformUser(dataLogin);
        }
        else{
            displayErrorMessage(signingParameters,"Fill out the empty fields")
        }
    })
}

function checkAndInformUser(loginData) {
    let loginRequest = new XMLHttpRequest();

    loginRequest.open('POST', '/login');
    loginRequest.setRequestHeader("Content-Type", "application/json");

    loginRequest.onload = function () {
        let serverRespond = JSON.parse(loginRequest.responseText);
        if(serverRespond['success']){
            displaySuccessMessage(signingParameters, serverRespond['success']);
            setCookie(loginData.username);
            checkIfLoggedAndSetNavBarAccordingly();
            setTimeout(function () {
                $('#loginModal').modal('hide')
            }, 2000)

        }else{
            displayErrorMessage(signingParameters, serverRespond['error'])
        }
    };

    loginRequest.send(JSON.stringify(loginData));
}

function handleLogin() {
    addLoginEventHandlerToForm();
    $('#loginModal').on('hide.bs.modal', function () {
        clearElement('#errorAlert');
        clearElement('#successAlert');

        document.getElementById('username').value = '';
        document.getElementById('password').value = '';

        signingParameters.fail.style.display = 'none';
        signingParameters.success.style.display = 'none';

    });
}
