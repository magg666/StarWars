let planetId = 1;

const swapiRequest = new XMLHttpRequest();
swapiRequest.open('GET', 'https://swapi.co/api/planets/?page=1');
swapiRequest.onload = function () {
    let swapiData = JSON.parse(swapiRequest.responseText);
    console.log(swapiData);
    console.log(swapiData.results[0].name);
    createEmptyTable(swapiData)


};

swapiRequest.send();

// window.onload = createEmptyTable;


function createEmptyTable(data) {
    const tableBody = document.querySelector('#table-body');

    for (let ii = 0; ii < 10; ii++) {
        let rowId = 'row' + ii;
        const tableRow = document.createElement('tr');
        tableRow.setAttribute('id', rowId);
        tableBody.appendChild(tableRow);

        for (let i = 0; i < 8; i++) {
            const tableCell = document.createElement('td');
            tableRow.appendChild(tableCell);
        }
    }
    fillTable(data);
}


function fillTable(data) {
    let factor = {
        planet: [data.results[0].climate,
            data.results[0].name,
            data.results[0].terrain,]

    };

    const tableBody = document.querySelector('#table-body');
    let cols = document.querySelector('#row0').getElementsByTagName('td');
    for (let i = 0; i < 8; i++) {
        cols[i].textContent = factor.planet[i];
    }
}
