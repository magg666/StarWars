export {controlVoteButtons, addCellsWithVoteButtons, removeCellsWithVoteButtons, addPlanetStatListener}
import {openModal, clearElement} from "./dom_handler.js";
import {postDataModern, getDataModern} from "./api_ajax.js";

function controlVoteButtons() {
    let username = localStorage.getItem('username');

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
        setDataAttributesForVoteButton(voteButton);
    }
    getVotedPlanetForUser()

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

function setDataAttributesForVoteButton(button) {
    let row = button.closest('tr');
    let planetUrl = row.dataset.url;
    let cellWithName = row.querySelector('.cell0');
    button.setAttribute('data-planet-name', cellWithName.textContent);
    button.setAttribute('data-planet-id', planetUrl.slice(29, -1))
}

function showVotingResponse(response) {
    let username = localStorage.getItem('username');
    if (response['state'] !== 'error') {
        openModal(username, `You voted on ${response['state']}!`);
    } else {
        openModal(username, `We are sorry, error happened. Try again later.`)
    }
}

function vote(voteButton) {
    let jsonPlanetData = {
        'planet_name': voteButton.dataset.planetName,
        'planet_id': voteButton.dataset.planetId,
        'username': localStorage.getItem('username'),
    };
    postDataModern('/vote', jsonPlanetData, showVotingResponse);
    voteButton.disabled = true
}

// ------------------

function getVotedPlanetForUser() {
    let username = localStorage.getItem('username');
    let data = {
        'username': username,
    };
    postDataModern('/user-vote', data, markVotedButtonsForUser)
}


function markVotedButtonsForUser(response) {
    let listOfIds = response['planetsId'];

    let voteButtons = document.querySelectorAll('.vote-button');

    voteButtons.forEach(function (button) {
            let buttonId = parseInt(button.dataset.planetId, 10);
            if (listOfIds.includes(buttonId)) {
                button.disabled = true
            }
        }
    )
}


// ------------------------------
function addPlanetStatListener() {
    let voteStatLink = document.getElementById('vote-statistic');
    voteStatLink.addEventListener('click', (ev) => {
        ev.preventDefault();
        getStatistic()

    })

}

function getStatistic() {
    getDataModern('GET', '/statistic', buildVoteStatTable)
    // let voteStatisticRequest = new XMLHttpRequest();
    // voteStatisticRequest.open('GET', '/statistic');
    // voteStatisticRequest.onload = function () {
    //     let voteData = JSON.parse(voteStatisticRequest.responseText);
    //     console.log(voteData['planet_votes']);
    //     buildVoteStatTable(voteData['planet_votes'])
    // };
    // voteStatisticRequest.send()
}


function buildVoteStatTable(voteData) {

    $('#myModal')
        .modal('show')
        .on('hidden.bs.modal', function () {
            clearElement('#stat-modal')
        });

    let modalBody = document.getElementById('stat-modal');
    for (let data of voteData['planet_votes']) {
        let modalTable = `
        <tr>
        <td>${data['planet_name']}</td>
        <td>${data['count']}</td>
        </tr>`;
        modalBody.insertAdjacentHTML('beforeend', modalTable);
    }
}