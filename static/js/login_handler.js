import {checkIfLoggedAndSetNavBarAccordingly} from "./dom_handler.js";
import {clearElement} from "./dom_handler.js";
import {displaySuccessMessage, displayErrorMessage} from "./dom_handler.js";
import {controlVoteButtons} from "./vote.js";

export {handleLogin, logout, addLoginEventHandlerToForm}

let signingParameters = {
    fail: document.getElementById('errorAlert'),
    success: document.getElementById('successAlert'),
};

function logout() {
    let logoutRequest = new XMLHttpRequest();
    logoutRequest.open('POST', '/logout');
    logoutRequest.onload = function () {
        let logoutData = JSON.parse(logoutRequest.responseText);
        if (logoutData['state'] === 'success') {
            alert('Goodbye ' + localStorage.getItem('username'));
            localStorage.clear();
            checkIfLoggedAndSetNavBarAccordingly();
            controlVoteButtons()
        } else {
            alert('You did not logout ' + localStorage.getItem('username') + '. Try again')
        }
    };
    logoutRequest.send()
}


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
        } else {
            displayErrorMessage(signingParameters, "Fill out the empty fields")
        }
    })
}

function checkAndInformUser(loginData) {
    let loginRequest = new XMLHttpRequest();

    loginRequest.open('POST', '/login');
    loginRequest.setRequestHeader("Content-Type", "application/json");

    loginRequest.onload = function () {
        let serverRespond = JSON.parse(loginRequest.responseText);
        if (serverRespond['state'] === 'success') {
            displaySuccessMessage(signingParameters, 'Welcome ' + loginData.username);
            localStorage.setItem('username', loginData['username']);
            checkIfLoggedAndSetNavBarAccordingly();
            setTimeout(function () {
                $('#loginModal').modal('hide')
            }, 2000);
            controlVoteButtons()

        } else {
            displayErrorMessage(signingParameters, 'Wrong username or password!')
        }
    };
    loginRequest.send(JSON.stringify(loginData));
}

function handleLogin() {
    addLoginEventHandlerToForm();
    clearModal()
}


function clearModal() {
    $('#loginModal').on('hide.bs.modal', function () {
        clearElement('#errorAlert');
        clearElement('#successAlert');

        document.getElementById('username').value = '';
        document.getElementById('password').value = '';

        signingParameters.fail.style.display = 'none';
        signingParameters.success.style.display = 'none';
    });
}

