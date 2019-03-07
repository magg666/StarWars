let planetId = 1;
const swapiRequest = new XMLHttpRequest();
swapiRequest.open('GET', 'https://swapi.co/api/planets/?page=1');
swapiRequest.onload = function () {
	let swapiData = JSON.parse(swapiRequest.responseText);
	// console.log(swapiData);
	// console.log(swapiData.results[0].name);
	// console.log(swapiData.results[0].diameter);
	createEmptyTable(swapiData);
	return swapiData;
}

swapiRequest.send();


function createEmptyTable(data) {
	const tableBody = document.querySelector('#table-body');

	for (let ii = 0; ii < 10; ii++) {
		let rowId = 'row' + ii;
		const tableRow = document.createElement('tr');
		tableRow.classList.add('row-class');
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
	const tableBody = document.querySelector('#table-body');
	let rows = document.querySelectorAll('.row-class');


	let factor;


	for (let j = 0; j < rows.length; j++) {
		let row = rows[j];
		factor = {
			planet: [data.results[j].name,
			         data.results[j].diameter,
			         data.results[j].climate,
			         data.results[j].terrain,
			         data.results[j].surface_water,
			         data.results[j].population,
			         data.results[j].residents.length]
		};
		// console.log("oneRow", row);
		// console.log("allRows", rows);

		let cells = row.getElementsByTagName('td');
		for (let i = 0; i < cells.length; i++) {

			cells[i].textContent = factor.planet[i];
		}
	}

}
