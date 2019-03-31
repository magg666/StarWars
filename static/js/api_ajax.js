import {removeHtmlString, showSpinner} from "./dom_handler.js";

export {getDataApi, sendDataToSessionStorage, getData, getDataModern, postDataModern, sendErrorLogsToServer}

// odczytuje dane z session storage lub (w przypadku braku danych) wysyła zapytanie do zewnętrznego api
function getData(key, spinner, callback) {
    let data = sessionStorage.getItem(key);
    if (data) {
        callback(JSON.parse(data));
    } else {
        getDataApi(key, spinner, callback)
    }
}

// wysyła dane do Session storage(jeśli ich tam nie ma)
function sendDataToSessionStorage(key, data) {
    if(!sessionStorage.getItem(key)){
        sessionStorage.setItem(key, JSON.stringify(data))
    }
}

// klasyczne get ze spinnerem
function getDataApi(link, spinner=false, callback) {
    if (spinner) {
        showSpinner(spinner)
    }
    let getRequest = new XMLHttpRequest();
    getRequest.open('GET', link);
    getRequest.onreadystatechange = function () {
        if (getRequest.readyState === 4 && getRequest.status === 200) {
            removeHtmlString(spinner);
            let data = JSON.parse(getRequest.responseText);
            return callback(data)
        }
    };
    getRequest.send()
}

// funkcje do komunikowania się z api - nowy sposób zapisu(promises)

function getDataModern(sendingMethod, link, callback) {
    fetch(link, {
        method: sendingMethod
    })
        .then(response => response.json())
        .then(json_response => callback(json_response))
        .catch(error => sendErrorLogsToServer(error.message + error.stack))
        .catch(error => console.log(error))
}

function postDataModern(link, data, callback) {
    fetch(link, {
        method: 'POST',
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify(data)
    })
        .then(response => response.json())
        .then(json_response => callback(json_response))
        .catch(error => sendErrorLogsToServer(error.message + error.stack))
        .catch(error => console.log(error))
}

// proste wysyłanie daych na server - logi błędów
function sendErrorLogsToServer(error) {
    let errorRequest = new XMLHttpRequest();
    errorRequest.open("POST", "/error");
    errorRequest.setRequestHeader("Content-type", "application/json");
    errorRequest.send(JSON.stringify(error))
}







