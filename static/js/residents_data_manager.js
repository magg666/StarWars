export {prepareResidentsButton}

import {createEmptyTable, clearElement} from "./dom_handler.js";

const planetRequest = new XMLHttpRequest();

// formatted data for residents
function formatResidentData(data) {
    return {
        name: data.name,
        height: (data.height >= 0) ? (data.height / 100).toFixed(2) + ' m' : 'unknown',
        mass: (data.mass >= 0) ? data.mass + ' kg' : 'unknown',
        hair_color: data.hair_color,
        skin_color: data.skin_color,
        eye_color: data.eye_color,
        birth_year: data.birth_year,
        gender: selectGender(data.gender),
    };
}

function selectGender(gender) {
    switch (gender) {
        case 'male':
            gender = '<i class=\"fas fa-mars\"></i>';
            break;
        case 'female':
            gender = '<i class="fas fa-venus"></i>';
            break;
        case 'n/a':
            gender = '<i class="fas fa-genderless"></i>';
            break;
        default:
            gender = 'unknown';

    }
    return gender
}

function listOfDataForResident(residentData) {
    return [residentData.name, residentData.height, residentData.mass, residentData.hair_color, residentData.skin_color, residentData.eye_color,
        residentData.birth_year, residentData.gender];
}

// create title for resident's modal
function createTitleOfResidentTable(data) {
    let title = document.querySelector('.res-title');
    title.textContent = `Residents of ${data}`;
}


// filling table for residents step by step (three functions below)
function fillAllResidentsTable(numberOfRows, linksToResidents, allCellsInOneRow) {
    for (let residentNumber = 0; residentNumber < numberOfRows; residentNumber++) {
            let residentRequest = new XMLHttpRequest();
            fillTableForSpecificResident(residentNumber, linksToResidents[residentNumber], residentRequest, allCellsInOneRow);
            residentRequest.send();
        }
}

function fillTableForSpecificResident(rowIdNumber, link, residentRequest, allCellsInOneRow) {
    residentRequest.open("GET", link);
    residentRequest.onload = function () {
        let residentData = JSON.parse(residentRequest.responseText);
        fillOneRowInResidentTable(rowIdNumber, residentData, allCellsInOneRow, residentRequest);

    };
}

function fillOneRowInResidentTable(rowIdNumber, residentData, allCellsInOneRow) {
    let rowId = 'res-row' + rowIdNumber;
    let row = document.getElementById(rowId);
    let cells = row.getElementsByTagName('td');
    let residentInfo = formatResidentData(residentData);
    for (let k = 0; k < allCellsInOneRow; k++) {
        cells[k].innerHTML = listOfDataForResident(residentInfo)[k];
    }
}

// send request to planet, retrieved links for residents, based on this links - create table
function getDataForResidentsOfPlanet(link){
    document.querySelector('#res-spinner').innerHTML = "<span>Loading...</span>";
    planetRequest.open('GET', link);
    planetRequest.onreadystatechange = function () {
        if(planetRequest.readyState === 4 && planetRequest.status === 200){
            document.querySelector('#res-spinner').innerHTML = "";
            let planetData = JSON.parse(planetRequest.responseText);
            let linksToResidents = planetData.residents;
            let numberOfRows = linksToResidents.length;
            let numberOfCellsInRow = 8;
            createFullResidentTable(planetData, numberOfRows, numberOfCellsInRow, linksToResidents)
        }
    };planetRequest.send();

}

function showResidentTableAfterPressingButton(residentButton) {
    let link = residentButton.dataset.planetUrl;
    getDataForResidentsOfPlanet(link)
}

// create full table for residents
function createFullResidentTable(planetData, numberOfRows, numberOfCellsInRow, linksToResidents) {
    let selector = '#residents-table-body';
    let rowIdIndicator = 'res-row';
    let rowClassIndicator = 'res-row-class';
    let cellClassIndicator = 'res-cell';

    createEmptyTable(selector,
        rowIdIndicator,
        rowClassIndicator,
        cellClassIndicator,
        numberOfRows,
        numberOfCellsInRow);

    createTitleOfResidentTable(planetData.name);

    fillAllResidentsTable(numberOfRows, linksToResidents, numberOfCellsInRow)

}

// show residents' table in modal and, when closing - clear it
function handleResidents(button) {
    showResidentTableAfterPressingButton(button);
    $('#residentsModal').on('hide.bs.modal', function () {
        clearElement('.res-title');
        clearElement('#residents-table-body');
    });
}

// prepare resident button in table (this will be exported to planet manager and added to planet table)
function prepareResidentsButton() {
    let residentsButton = document.querySelectorAll('.residents-button');
    for (let i = 0; i < residentsButton.length; i++) {

        let rowId = 'row' + i;
        let buttonId = 'rButton' + i;
        let linkToPlanet = document.getElementById(rowId).dataset.url;

        residentsButton[i].setAttribute('type', 'button');
        residentsButton[i].setAttribute('id', buttonId);
        residentsButton[i].setAttribute('data-planet-url', linkToPlanet);
        residentsButton[i].setAttribute('data-toggle', 'modal');
        residentsButton[i].setAttribute('data-target', '#residentsModal');

        residentsButton[i].onclick = function () {
            handleResidents(residentsButton[i]);
        };
    }
}



