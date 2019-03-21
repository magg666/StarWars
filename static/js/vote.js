export {addVoteButton, showVoteButtons}
import {getCookie} from "./cookies_handler.js";

function showVoteButtons() {
    let username = getCookie('username');
    if(username !== null){
        addVoteButton()
    }
}

function addVoteButton() {
    let voteCells = document.querySelectorAll('.cell7');
    for(let cell of voteCells){
        let voteButton = createVoteButton();
        cell.appendChild(voteButton);

        let closestRow = cell.closest('.row-class');
        voteButton.setAttribute('data-planet-url', closestRow.dataset.url);

        let planetLink = voteButton.dataset.planetUrl;
        bindPlanetNameToButton(planetLink, voteButton)

    }
}

function createVoteButton (){
    let voteButton = document.createElement('button');
    voteButton.classList.add('vote-button');
    voteButton.textContent = 'Vote';
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

