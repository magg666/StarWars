import {clearElementBy, createEmptyTable} from "./create_table.js";
import {init} from "./residents.js";
import {prepareVoteButton, sendPlanetNameToServer} from "./vote.js";

const starWarsPlanetRequest = new XMLHttpRequest();
const nextButton = document.getElementById('next-button');
const previousButton = document.getElementById('previous-button');


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
        votes: '<button class="vote-button btn btn-outline-dark">Vote</button>',
        url: data.results[planetNumber].url,
        next: data.next,
        previous: data.previous,

    };
}

function listOfDataFor(planet) {
    return [planet.name, planet.diameter, planet.climate, planet.terrain, planet.surface_water,
        planet.population, planet.residents, planet.votes];
}


// create planet table
function fillPlanetTable(data, numberOfRows, numberOfCellsInRow) {
    let rows = document.querySelectorAll('.row-class');
    let nextPage = data.next;
    let previousPage = data.previous;

    for (let planetNumber = 0; planetNumber < numberOfRows; planetNumber++) {
        let row = rows[planetNumber];
        let planetInfo = formatPlanetData(data, planetNumber);
        row.setAttribute('data-url', planetInfo.url);

        for (let i = 0; i < numberOfCellsInRow; i++) {
            let cells = row.getElementsByTagName('td');
            cells[i].innerHTML = listOfDataFor(planetInfo)[i];
        }

    }
    makeButtonsWorkingProperly(nextPage, previousPage);
}


function makeButtonsWorkingProperly(nextPage, previousPage) {
    addButtonFunctions(nextButton, nextPage);
    addButtonFunctions(previousButton, previousPage);
}

function isEndOfPages(resultOfLinkToPage) {
    return resultOfLinkToPage === null
}

function addButtonFunctions(button, link) {
    if (!isEndOfPages(link)) {
        button.disabled = false;
        button.addEventListener("click", function () {
            starWarsPlanetRequest.open('GET', link);
            starWarsPlanetRequest.onload = function () {
                let starWarsPlanetData = JSON.parse(starWarsPlanetRequest.responseText);
                let numberOfRows = starWarsPlanetData.results.length;
                let numberOfCellsInRow = listOfDataFor(starWarsPlanetData).length;
                createFullPlanetTable(starWarsPlanetData, numberOfRows, numberOfCellsInRow);
                return starWarsPlanetData;
            };
            starWarsPlanetRequest.send();
        });
    } else {
        button.disabled = true
    }
}


function prepareResidentsButton() {
    let residentsButton = document.querySelectorAll('.residents-button');
    for (let i = 0; i < residentsButton.length; i++) {
        let rowId = 'row' + i;
        let buttonId = 'rButton' + i;
        let linkToPlanet = document.getElementById(rowId).dataset.url;
        residentsButton[i].setAttribute('type', 'button');
        residentsButton[i].setAttribute('id', buttonId);
        residentsButton[i].setAttribute('data-planet-url', linkToPlanet);
        residentsButton[i].onclick = function () {
            init(residentsButton[i]);
        };
        residentsButton[i].setAttribute('data-toggle', 'modal');
        residentsButton[i].setAttribute('data-target', '#residentsModal');

    }
}


function createFullPlanetTable(data, numberOfRows, numberOfCellsInRow) {
    clearElementBy('#table-body');

    createEmptyTable(
        '#table-body',
        'row',
        'row-class',
        'cell',
        numberOfRows,
        numberOfCellsInRow);

    fillPlanetTable(data, numberOfRows, numberOfCellsInRow);

    prepareResidentsButton();

    prepareVoteButton()

    //
    // checkIsUserLogged()
}




function showPage(link) {
    starWarsPlanetRequest.open('GET', link);
    starWarsPlanetRequest.onload = function () {
        let starWarsPlanetData = JSON.parse(starWarsPlanetRequest.responseText);
        let numberOfRows = starWarsPlanetData.results.length;
        let numberOfCellsInRow = listOfDataFor(starWarsPlanetData).length;

        createFullPlanetTable(starWarsPlanetData, numberOfRows, numberOfCellsInRow);
    };
    starWarsPlanetRequest.send();
}

function checkIsUserLogged() {

    let indicator = document.getElementById('check-user');
    let voteButtons = document.querySelectorAll('.vote-button');

        if (indicator.dataset.user === 'no') {
            for (let i = 0; i < voteButtons.length; i++) {
                voteButtons[i].classList.add('hidden')
            }
        } else {
            for (let i = 0; i < voteButtons.length; i++) {
                voteButtons[i].classList.remove('hidden')
            }
        }
    }




//start
function main() {
    const firstPageLink = 'https://swapi.co/api/planets/?page=1';
    showPage(firstPageLink);
    sendPlanetNameToServer();
    // document.cookie = 'user=yyyy';
    // getCookie('username')
}

window.onload = main;

let getCookie = function(name) {
    let cookies = document.cookie.split(';');
    for(let i=0 ; i < cookies.length ; ++i) {
        let pair = cookies[i].trim().split('=');
        if(pair[0] === name)
            console.log( pair[1]);
    }
    return null;
};

