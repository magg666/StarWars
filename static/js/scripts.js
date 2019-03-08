const swapiRequest = new XMLHttpRequest();
swapiRequest.open('GET', 'https://swapi.co/api/planets/?page=1');
swapiRequest.onload = function () {
	let swapiData = JSON.parse(swapiRequest.responseText);
	// console.log(swapiData);
	// console.log(swapiData.results[0].name);
	// console.log(swapiData.results[0].diameter);
	createEmptyTable(swapiData);
	return swapiData;
};

swapiRequest.send();

function countVote() {
	console.log('vote-test');
}

function createEmptyTable(data) {
	const tableBody = document.querySelector('#table-body');
	const nbOfColumns = 8;


	for (let ii = 0; ii < data.results.length; ii++) {
		let rowId = 'row' + ii;
		const tableRow = document.createElement('tr');
		tableRow.classList.add('row-class');
		tableRow.setAttribute('id', rowId);
		tableBody.appendChild(tableRow);
		console.log(tableRow);

		for (let i = 0; i < nbOfColumns; i++) {
			const tableCell = document.createElement('td');
			tableRow.appendChild(tableCell);

			if (i > 6) {
				const voteButton = document.createElement('button');
				voteButton.classList.add('voteButton');
				voteButton.setAttribute('id', "vote" + ii);
				voteButton.addEventListener('click', () => {countVote(); });
				tableCell.appendChild(voteButton);
			}
		}
	}
	fillTable(data);
}


function fillTable(data) {
	let rows = document.querySelectorAll('.row-class');


	let requiredPlanetData;


	for (let j = 0; j < rows.length; j++) {
		let row = rows[j];
		requiredPlanetData = {
			planet: [data.results[j].name,
			         data.results[j].diameter,
			         data.results[j].climate,
			         data.results[j].terrain,
			         data.results[j].surface_water,
			         data.results[j].population,
			         data.results[j].residents.length
			]
		};
		// console.log("oneRow", row);
		// console.log("allRows", rows);

		let cells = row.getElementsByTagName('td');
		for (let i = 0; i < requiredPlanetData.planet.length; i++) {

			cells[i].textContent = requiredPlanetData.planet[i];
		}
	}

}
