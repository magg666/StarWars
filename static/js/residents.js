export {init}
import {createEmptyTable, clearElementBy} from "./create_table.js";

const planetRequest = new XMLHttpRequest();


function formatResidentData(data) {
    return {
        name: data.name,
        height: (data.height >= 0) ? (data.height/100).toFixed(2) + ' m' : 'unknown',
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

    }return gender
}


function dataFor(resident) {
    return [resident.name, resident.height, resident.mass, resident.hair_color, resident.skin_color, resident.eye_color,
        resident.birth_year, resident.gender];
}

function createTitleOfResidentTable(data) {
    let title = document.querySelector('.res-title');
    title.textContent = `Residents of ${data}`;
}


function fillOneRowInResidentTable(rowIdNumber, linkToResident) {
    let rowId = 'res-row' + rowIdNumber;
    let row = document.getElementById(rowId);
    let cells = row.getElementsByTagName('td');
    let residentInfo = formatResidentData(linkToResident);
    for (let k = 0; k < 8; k++) {
        cells[k].innerHTML = dataFor(residentInfo)[k];
    }
}


function fillTableForSpecificResident(rowIdNumber, link, residentRequest) {
    residentRequest.open("GET", link);
    residentRequest.onload = function () {
        let residentData = JSON.parse(residentRequest.responseText);
        fillOneRowInResidentTable(rowIdNumber, residentData);
    };
    residentRequest.send();
}


function showResidentTableAfterPressingButton(residentButton) {
    let link = residentButton.dataset.planetUrl;

    planetRequest.open('GET', link);
    planetRequest.onload = function () {
        let planetData = JSON.parse(planetRequest.responseText);
        let linksToResidents = planetData.residents;

        let numberOfRows = linksToResidents.length;
        let numberOfCellsInRow = 8;

        createEmptyTable(
            '#residents-table-body',
            'res-row',
            'res-row-class',
            'res-cell',
            numberOfRows,
            numberOfCellsInRow);

        createTitleOfResidentTable(planetData.name);


        for (let consecutiveResidentNumber = 0; consecutiveResidentNumber < numberOfRows; consecutiveResidentNumber++) {
            let residentRequest = new XMLHttpRequest();
            fillTableForSpecificResident(consecutiveResidentNumber, linksToResidents[consecutiveResidentNumber], residentRequest);
        }
    };
    planetRequest.send();
}


function init(button) {
    showResidentTableAfterPressingButton(button);
    $('#residentsModal').on('hide.bs.modal', function () {
        clearElementBy('.res-title');
        clearElementBy('#residents-table-body');
    });
}





