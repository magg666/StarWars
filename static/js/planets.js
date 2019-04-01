import {clearElement} from "./dom_handler.js";
import {removeCellsWithVoteButtons} from "./vote.js";
import {prepareResidentsButton} from "./residents.js";
import {controlVoteButtons} from "./vote.js";
import {formatPlanet} from "./data_formatter.js";
import {getData, sendDataToSessionStorage} from "./api_ajax.js";

export {displayPlanetPage}

const planetParameters = {
    nextButton: document.getElementById('next-button'),
    previousButton: document.getElementById('previous-button'),
    urlIndex: 7,
    spinner: document.querySelector('.planet-spinner')
};

function createPlanetTable(planetData) {
    clearElement('#table-body');
    removeCellsWithVoteButtons();
    const tableBody = document.querySelector('#table-body');
    let rows = planetData.length;

    for (let k = 0; k < rows; k++) {
        let onePlanet = planetData[k];
        let allCells = '';

        for (let j = 0; j < onePlanet.length - 1; j++) {
            let cell = `
            <td class="cell${j}">${onePlanet[j]}</td>`;
            allCells += cell
        }

        let row = `
        <tr class="row-class" id="row${k}" data-url="${onePlanet[planetParameters.urlIndex]}">${allCells}</tr>`;
        tableBody.insertAdjacentHTML("beforeend", row);
    }
}

function isEndOfPages(resultOfLinkToPage) {
    return resultOfLinkToPage === null;
}

function addFunctionalityToPaginationButton(button, link) {
    if (!isEndOfPages(link)) {
        button.disabled = false;
        button.addEventListener('click', changePage)
    }
    else {
        button.disabled = true
    }
}

function preparePaginationButtons(planetsData) {
    let nextPage = planetsData['next'];
    let previousPage = planetsData['previous'];
    addFunctionalityToPaginationButton(planetParameters.nextButton, nextPage);
    addFunctionalityToPaginationButton(planetParameters.previousButton, previousPage);
    planetParameters.nextButton.setAttribute('data-url', nextPage);
    planetParameters.previousButton.setAttribute('data-url', previousPage);
}

function changePage(event) {
    let link = event.target.getAttribute('data-url');
    getData(link, planetParameters.spinner, preparePlanetPage.bind(null, link))
}

function checkSessionStorageForPlanetData(link, data) {
    let formattedData = {};
    if(!sessionStorage.getItem(link)){
        formattedData = formatPlanet(data);
    }else{
        formattedData = data
    }return formattedData
}

function preparePlanetPage(link, data) {
    let formattedData = checkSessionStorageForPlanetData(link, data);
    sendDataToSessionStorage(link, formattedData);
    createPlanetTable(formattedData.planet);
    preparePaginationButtons(formattedData);
    prepareResidentsButton();
    controlVoteButtons();
}

function displayPlanetPage(link) {
    if (link === undefined) {
        link = 'https://swapi.co/api/planets/?page=1';
    }
    getData(link, planetParameters.spinner, preparePlanetPage.bind(null, link));
}

