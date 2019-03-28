export {prepareResidentsButton}
import {clearElement} from "./dom_handler.js";

const planetRequest = new XMLHttpRequest();

// prepare resident button in table (this will be exported to planet manager and added to planet table)
function prepareResidentsButton() {
    let residentsButton = document.querySelectorAll('.residents-button');
    for (let i = 0; i < residentsButton.length; i++) {
        residentsButton[i].addEventListener('click', function () {
            let rowId = 'row' + i;
            let buttonId = 'rButton' + i;
            let linkToPlanet = document.getElementById(rowId).dataset.url;

            residentsButton[i].setAttribute('type', 'button');
            residentsButton[i].setAttribute('id', buttonId);
            residentsButton[i].setAttribute('data-planet-url', linkToPlanet);
            residentsButton[i].setAttribute('data-toggle', 'modal');
            residentsButton[i].setAttribute('data-target', '#residentsModal');
            handleResidents(residentsButton[i])
        })
    }
}

function handleResidents(button) {
    let link = button.dataset.planetUrl;
    showResidentsOfPlanet(link);

    $('#residentsModal').on('hide.bs.modal', function () {
        clearElement('.res-title');
        clearElement('#residents-table-body');
    });
}

function showResidentsOfPlanet(link) {
    planetRequest.open('GET', link);
    planetRequest.onload = function () {
        let planetData = JSON.parse(planetRequest.responseText);
        let linksToResidents = planetData['residents'];

        createTitleOfResidentTable(planetData['name']);
        createResidentsTable(linksToResidents)
    };
    planetRequest.send();

}

// formatted data for residents
function formatResidents(resident) {
    let name = resident['name'],
        height = (resident['height'] >= 0) ? (resident['height'] / 100).toFixed(2) + ' m' : 'unknown',
        mass = (resident['mass'] >= 0) ? resident['mass'] + ' kg' : 'unknown',
        hair_color = resident['hair_color'],
        skin_color = resident['skin_color'],
        eye_color = resident['eye_color'],
        birth_year = resident['birth_year'],
        gender = selectGenderIcon(resident['gender']);
    return [name, height, mass, hair_color, skin_color, eye_color, birth_year, gender];
}

function selectGenderIcon(gender) {
    let genderIcon;
    switch (gender) {
        case 'male':
            genderIcon = '<i class=\"fas fa-mars\"></i>';
            break;
        case 'female':
            genderIcon = '<i class="fas fa-venus"></i>';
            break;
        case 'n/a':
            genderIcon = '<i class="fas fa-genderless"></i>';
            break;
        default:
            genderIcon = 'unknown';

    }
    return genderIcon
}

// create title for resident's modal
function createTitleOfResidentTable(data) {
    let title = document.querySelector('.res-title');
    title.textContent = `Residents of ${data}`;
}


function createResidentsTable(residentsLinks) {

    let table = document.getElementById('residents-table-body');

    let rows = residentsLinks.length;
    for (let i = 0; i < rows; i++) {
        let rowId = 'res-row' + i;
        let row = document.createElement('tr');
        row.setAttribute('id', rowId);
        row.classList.add('res-row-class');
        let oneResidentLink = residentsLinks[i];
        table.appendChild(row);

        if (sessionStorage.getItem(oneResidentLink) === null) {
            let residentRequest = new XMLHttpRequest();
            residentRequest.open('GET', oneResidentLink);
            document.querySelector('#res-spinner').innerHTML = "<span>Loading...</span>";
            residentRequest.onreadystatechange = function () {
                if (residentRequest.readyState === 4 && residentRequest.status === 200) {
                    document.querySelector('#res-spinner').innerHTML = "";
                    let residentData = formatResidents(JSON.parse(residentRequest.responseText));
                    sessionStorage.setItem(oneResidentLink, JSON.stringify(residentData));
                    for (let data of residentData) {
                        let cell = document.createElement('td');
                        cell.innerHTML = data;
                        row.appendChild(cell)
                    }
                }
            };
            residentRequest.send();
        } else {
            let residentData = JSON.parse(sessionStorage.getItem(oneResidentLink));
            for (let data of residentData) {
                let cell = document.createElement('td');
                cell.innerHTML = data;
                row.appendChild(cell)
            }

        }

    }
}


