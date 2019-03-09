// let's set down some things...
const starWarsPlanetRequest = new XMLHttpRequest();
const nextButton = document.getElementById('next-button');
const previousButton = document.getElementById('previous-button');


function formatPlanetData(data, planetNumber) {
    return {
        name: data.results[planetNumber].name,
        diameter: data.results[planetNumber].diameter + ' km',
        climate: data.results[planetNumber].climate,
        terrain: data.results[planetNumber].terrain,
        surface_water: (data.results[planetNumber].surface_water >= 0) ? data.results[planetNumber].surface_water + ' %' : 'unknown',
        population: (data.results[planetNumber].population > 0) ? Number(data.results[planetNumber].population).toLocaleString('ja-JP') + ' people' : 'unknown',
        residents: (data.results[planetNumber].residents.length > 0) ? `<button>${data.results[planetNumber].residents.length} ${'resident(s)'} </button>` : 'No known residents',
        votes: '<button>Vote</button>',
        previous: data.previous,
        next: data.next,
    };
}


function listOfDataFor(planet) {
    return [planet.name, planet.diameter, planet.climate, planet.terrain, planet.surface_water,
        planet.population, planet.residents, planet.votes];
}


// make table not war
function createFullTable(data, numberOfRows, numberOfCellsInRow) {
    createEmptyTable(numberOfRows, numberOfCellsInRow);
    fillTable(data, numberOfRows, numberOfCellsInRow);
}


// delete old, create new
function createEmptyTable(numberOfRows, numberOfCellsInRow) {
    const tableBody = document.querySelector('#table-body');
    while (tableBody.firstChild){
    tableBody.removeChild(tableBody.firstChild);
}

    for (let ii = 0; ii < numberOfRows; ii++) {
        let rowId = 'row' + ii;
        const tableRow = document.createElement('tr');
        tableRow.classList.add('row-class');
        tableRow.setAttribute('id', rowId);
        tableBody.appendChild(tableRow);

        for (let i = 0; i < numberOfCellsInRow; i++) {
            const tableCell = document.createElement('td');
            let cellClass = 'cell' + i;
            tableCell.classList.add(cellClass);
            tableRow.appendChild(tableCell);
        }
    }
}

function fillTable(data, numberOfRows, numberOfCellsInRow) {
    let rows = document.querySelectorAll('.row-class');
    let nextPage = data.next;
    let previousPage = data.previous;

    for (let planetNumber = 0; planetNumber < numberOfRows; planetNumber++) {
        let row = rows[planetNumber];
        let planetInfo = formatPlanetData(data, planetNumber);

        for (let i = 0; i < numberOfCellsInRow; i++) {
            let cells = row.getElementsByTagName('td');
            cells[i].innerHTML = listOfDataFor(planetInfo)[i];
        }
    }
    makeButtonsWorkingProperly(nextPage, previousPage)
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
                createFullTable(starWarsPlanetData, numberOfRows, numberOfCellsInRow);
                return starWarsPlanetData;
            };
            starWarsPlanetRequest.send();
        });
    }else {
        button.disabled = true
    }
}

function showPage(link) {
    starWarsPlanetRequest.open('GET', link);
    starWarsPlanetRequest.onload = function () {
        let starWarsPlanetData = JSON.parse(starWarsPlanetRequest.responseText);
        let numberOfRows = starWarsPlanetData.results.length;
        let numberOfCellsInRow = listOfDataFor(starWarsPlanetData).length;

        createFullTable(starWarsPlanetData, numberOfRows, numberOfCellsInRow);
        return starWarsPlanetData
    };
    starWarsPlanetRequest.send();
}



// starts all the fun...
function main() {
    const firstPageLink = 'https://swapi.co/api/planets/?page=1';
    showPage(firstPageLink);
}

window.onload = main;