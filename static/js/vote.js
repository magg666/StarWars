export {controlVoteButtons, removeCellsWithVoteButtons}


function controlVoteButtons() {
    let username = localStorage.getItem('username');
    let cellVote = document.querySelector('.cell-vote');


    if (username !== null) {
        addCellsWithVoteButtons()
    } else {
        removeCellsWithVoteButtons()
    }
}

function removeCellsWithVoteButtons() {
    let cells = document.querySelectorAll('.cell-vote');
    for (let cell of cells) {
        cell.remove()
    }
}

function addCellsWithVoteButtons() {
    let rows = document.querySelectorAll('.row-class');
    let cell = document.createElement('th');
    cell.classList.add('cell-vote');
    rows[0].appendChild(cell);

    for (let i = 1; i < rows.length; i++) {
        let cell = document.createElement('td');

        let voteButton = createVoteButton();
        cell.appendChild(voteButton);
        cell.classList.add('cell-vote');

        rows[i].appendChild(cell);

        let closestRow = cell.closest('.row-class');
        voteButton.setAttribute('data-planet-url', closestRow.dataset.url);

        let planetLink = voteButton.dataset.planetUrl;
        bindPlanetNameToButton(planetLink, voteButton)

    }
}

function createVoteButton() {
    let voteButton = document.createElement('button');
    voteButton.classList.add('vote-button', 'btn', 'btn-outline-dark');
    voteButton.textContent = 'Vote';
    voteButton.addEventListener('click', (ev) => {
        ev.preventDefault();
        vote(voteButton)
    });
    return voteButton
}

function bindPlanetNameToButton(link, button) {
    let planetRequest = new XMLHttpRequest();
    planetRequest.open('GET', link);
    planetRequest.onload = function () {
        let planetData = JSON.parse(planetRequest.responseText);
        button.setAttribute('data-planet-name', planetData.name);
        button.setAttribute('data-planet-id', link.slice(29, -1))
    };
    planetRequest.send();
}

function vote(voteButton) {
    let voteRequest = new XMLHttpRequest();
    voteRequest.open('POST', '/vote');
    voteRequest.setRequestHeader("Content-Type", "application/json");

    let jsonPlanetData = {
        'planet_name': voteButton.dataset.planetName,
        'planet_id': voteButton.dataset.planetId,
        'username': localStorage.getItem('username'),
    };

    voteRequest.onload = function () {
        let voteData = JSON.parse(voteRequest.responseText);
        if (voteData['state'] !== 'error') {
            alert('You voted on ' + voteData['state'])
        } else {
            alert('Some error')
        }

    };voteRequest.send(JSON.stringify(jsonPlanetData));


}