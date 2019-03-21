export {startDisplayingPlanetTable}

import {createEmptyTable, clearElement} from "./dom_handler.js";
import {prepareResidentsButton} from "./residents_data_manager.js";
import {showVoteButtons} from "./vote.js";

// various parameter for planet table

const starWarsPlanetRequest = new XMLHttpRequest();


const planetParameters = {
    nextButton: document.getElementById('next-button'),
    previousButton: document.getElementById('previous-button'),
};


function formatPlanetData(data, planetNumber) {
    return {
        name: data.results[planetNumber].name,
        diameter: (data.results[planetNumber].diameter >= 0) ? data.results[planetNumber].diameter + ' km' : 'unknown',
        climate: data.results[planetNumber].climate,
        terrain: data.results[planetNumber].terrain,
        surface_water: (data.results[planetNumber].surface_water >= 0) ? data.results[planetNumber].surface_water + ' %' : 'unknown',
        population: (data.results[planetNumber].population > 0) ? Number(data.results[planetNumber].population).toLocaleString('ja-JP') + ' people' : 'unknown',
        residents: (data.results[planetNumber].residents.length > 0) ?
            `<button class="residents-button btn btn-outline-info">${data.results[planetNumber].residents.length} ${'resident(s)'} </button>`
            : '<button class="residents-button hidden"></button><span>No known residents</span>',
        votes: '',
        url: data.results[planetNumber].url,
        // next: data.next,
        // previous: data.previous,
    };
}

function listOfDataForPlanet(planetData) {
    return [planetData.name, planetData.diameter, planetData.climate, planetData.terrain, planetData.surface_water,
        planetData.population, planetData.residents, planetData.votes];
}

// functions for buttons previous and next - to navigate between pages with planets' data

function isEndOfPages(resultOfLinkToPage) {
    return resultOfLinkToPage === null
}

function addNavButtonFunctions(button, link) {
    if (!isEndOfPages(link)) {
        button.disabled = false;
        button.addEventListener("click", function () {
            getDataForPlanets(link)
        });
    } else {
        button.disabled = true
    }
}

function makeButtonsWorkingProperly(nextPage, previousPage) {
    addNavButtonFunctions(planetParameters.nextButton, nextPage);
    addNavButtonFunctions(planetParameters.previousButton, previousPage);
}



// fill existing planet table with data
function fillPlanetTable(data, numberOfRows, numberOfCellsInRow) {
    let rows = document.querySelectorAll('.row-class');

    for (let planetNumber = 0; planetNumber < numberOfRows; planetNumber++) {
        let row = rows[planetNumber];
        let planetInfo = formatPlanetData(data, planetNumber);
        row.setAttribute('data-url', planetInfo.url);

        for (let i = 0; i < numberOfCellsInRow; i++) {
            let cells = row.getElementsByTagName('td');
            cells[i].innerHTML = listOfDataForPlanet(planetInfo)[i];
        }
    }
}

function createFullPlanetTable(planetData, numberOfRows, numberOfCellsInRow) {
    let selector = '#table-body';
    let rowIdIndicator = 'row';
    let rowClassIndicator = 'row-class';
    let cellClassIndicator = 'cell';
    let nextPage = planetData.next;
    let previousPage = planetData.previous;

    // clear any previous table
    clearElement(selector);

    // make empty table based on row and cells given
    createEmptyTable(
        selector,
        rowIdIndicator,
        rowClassIndicator,
        cellClassIndicator,
        numberOfRows,
        numberOfCellsInRow);

    // fill planet with data
    fillPlanetTable(planetData, numberOfRows, numberOfCellsInRow);

    // prepare buttons previous and next
    makeButtonsWorkingProperly(nextPage, previousPage);

    // prepare buttons for residents with all additional functions (this is imported from residents)

    prepareResidentsButton();

    //
    showVoteButtons()



}



// send request for data (for planet)
function getDataForPlanets(link){
    document.querySelector('.spinner-border').innerHTML = "<span style='font-size: 24px'>Loading...</span>";
    starWarsPlanetRequest.open('GET', link);
    starWarsPlanetRequest.onreadystatechange = function () {
        if(starWarsPlanetRequest.readyState === 4 && starWarsPlanetRequest.status === 200){
            document.querySelector('.spinner-border').innerHTML = "";
            let starWarsPlanetData = JSON.parse(starWarsPlanetRequest.responseText);
            let numberOfRows = starWarsPlanetData.results.length;
            let numberOfCellsInRow = listOfDataForPlanet(starWarsPlanetData).length;
            createFullPlanetTable(starWarsPlanetData, numberOfRows, numberOfCellsInRow)
        }
    };starWarsPlanetRequest.send();

}

function startDisplayingPlanetTable() {
    const firstPageLink = 'https://swapi.co/api/planets/?page=1';
    getDataForPlanets(firstPageLink)
}