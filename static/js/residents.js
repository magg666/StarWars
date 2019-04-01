import {clearElement} from "./dom_handler.js";
import {formatPlanetDataForResidents, formatResidentData} from "./data_formatter.js";
import {getData, sendDataToSessionStorage} from "./api_ajax.js";

export {prepareResidentsButton}

let residentsParameters = {
    spinner: document.querySelector('.resident-spinner')
};

function checkSessionStorageForResidents(link, data) {
    let formattedData = [];
    if (!sessionStorage.getItem(link)) {
        formattedData = formatResidentData(data);
        sendDataToSessionStorage(link, formattedData)
    } else {
        formattedData = data
    }
    return formattedData
}

function setAttributesToResidentButtons(buttons, numberOfButton) {
    let rowId = 'row' + numberOfButton;
    let linkToPlanet = document.getElementById(rowId).dataset.url;

    buttons[numberOfButton].setAttribute('data-planet-url', linkToPlanet);
    buttons[numberOfButton].setAttribute('data-toggle', 'modal');
    buttons[numberOfButton].setAttribute('data-target', '#residentsModal');
}

function createTitleOfResidentTable(data) {
    let title = document.querySelector('.res-title');
    title.textContent = `Residents of ${data}`;
}

function showResidentsOfPlanet(button) {
    let planetLink = button.dataset.planetUrl;
    getData(planetLink, false, prepareResidentsModal)
}

function prepareResidentsModal(data) {
    let formattedPlanetData = formatPlanetDataForResidents(data);

    createTitleOfResidentTable(formattedPlanetData.name);
    for (let link of formattedPlanetData.residents) {
        getData(link, residentsParameters.spinner, createResidentsTable.bind(null, link))
    }
}

function createResidentsTable(link, data) {
    let formattedData = checkSessionStorageForResidents(link, data);
    let table = document.getElementById('residents-table-body');
    let allCells = '';

    for (let i = 0; i < formattedData.length; i++) {
        let cell = `<td>${formattedData[i]}</td>`;
        allCells += cell
    }
    let row = `<tr>${allCells}</tr>`;
    table.insertAdjacentHTML('beforeend', row);
    $('#residentsModal').on('hide.bs.modal', function () {
        clearElement('.res-title');
        clearElement('#residents-table-body');
    })

}


// prepare resident button in table (this will be exported to planet manager and added to planet table)
function prepareResidentsButton() {
    let residentsButton = document.querySelectorAll('.residents-button');
    for (let i = 0; i < residentsButton.length; i++) {
        residentsButton[i].addEventListener('click', function () {
            setAttributesToResidentButtons(residentsButton, i);
            showResidentsOfPlanet(residentsButton[i])
        })
    }
}
