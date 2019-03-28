export {startDisplayingPlanetTable}

import {clearElement} from "./dom_handler.js";
import {prepareResidentsButton} from "./residents.js";
import {controlVoteButtons, removeCellsWithVoteButtons} from "./vote.js";

// various parameter for planet table

const starWarsPlanetRequest = new XMLHttpRequest();


const planetParameters = {
    nextButton: document.getElementById('next-button'),
    previousButton: document.getElementById('previous-button'),
};

function formatPlanet(planets) {
        return planets.map(function(planet){
        let name = planet.name,
            diameter = planet['diameter'] >= 0 ? planet['diameter'] + ' km' : 'unknown',
            climate = planet['climate'],
            terrain = planet['terrain'],
            surfaceWater = planet['surface_water'] >= 0 ? planet['surface_water'] + ' %' : 'unknown',
            population = planet['population'] > 0 ? Number(planet['population']).toLocaleString('ja-JP') + ' people' : 'unknown',
            residents = planet['residents'].length > 0 ?
            `<button class="residents-button btn btn-outline-info">${planet['residents'].length} ${'resident(s)'} </button>`
            : '<button class="residents-button hidden"></button><span>No known residents</span>',
            url = planet.url;
            return [name, diameter, climate, terrain, surfaceWater, population, residents, url]
    });
}

// send request for data (for planet)
function getDataForPlanets(link){
    document.querySelector('.spinner-border').innerHTML = "<span style='font-size: 24px'>Loading...</span>";
    starWarsPlanetRequest.open('GET', link);
    starWarsPlanetRequest.onreadystatechange = function () {
        if(starWarsPlanetRequest.readyState === 4 && starWarsPlanetRequest.status === 200){
            document.querySelector('.spinner-border').innerHTML = "";
            let starWarsPlanetData = JSON.parse(starWarsPlanetRequest.responseText);
            makeButtonsWorkingProperly(starWarsPlanetData);
            createPlanetTable(formatPlanet(starWarsPlanetData.results));
            prepareResidentsButton();
            controlVoteButtons();

        }
    };starWarsPlanetRequest.send();
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

function makeButtonsWorkingProperly(planetsData) {
    let nextPage = planetsData['next'];
    let previousPage = planetsData['previous'];
    addNavButtonFunctions(planetParameters.nextButton, nextPage);
    addNavButtonFunctions(planetParameters.previousButton, previousPage);

}

function createPlanetTable(planetData) {
    clearElement('#table-body');
    removeCellsWithVoteButtons();
    const tableBody = document.querySelector('#table-body');
    let rows = planetData.length;


    for (let i = 0; i < rows; i++) {
        let onePlanet = planetData[i];
        let cells = onePlanet.length - 1;
        let rowId = 'row' + i;
        let tableRow = document.createElement('tr');
        tableRow.classList.add('row-class');
        tableRow.setAttribute('id', rowId);
        tableRow.setAttribute('data-url', onePlanet[7]);
        tableBody.appendChild(tableRow);

        for (let j = 0; j < cells; j++) {
            const tableCell = document.createElement('td');
            tableCell.classList.add('cell' + j);
            tableCell.innerHTML = onePlanet[j];
            tableRow.appendChild(tableCell)
        }
    }
}


function startDisplayingPlanetTable(link) {
    if(link === undefined){
        link = 'https://swapi.co/api/planets/?page=1';
    }
    getDataForPlanets(link);

}