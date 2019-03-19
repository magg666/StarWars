export {prepareVoteButton, sendPlanetNameToServer}

function createVoteButton(){
    const cellForVote = document.querySelectorAll('.cell7');

    let voteButton = document.createElement('button');
    voteButton.classList.add('vote-button', 'btn', 'btn-outline-dark');

    cellForVote.appendChild(voteButton)
}





function prepareVoteButton() {
    let voteButtons = document.querySelectorAll('.vote-button');
    let planetLinks = document.querySelectorAll('.row-class');
    for (let i = 0; i < planetLinks.length; i++) {
        let planetLink = planetLinks[i].dataset.url;
        bindPlanetNameToButton(planetLink, voteButtons[i])
    }
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

function sendPlanetNameToServer() {
    $(document).ready(function () {
        let clicked;
        $(".vote-button").click(function () {
            clicked = $(this).attr("data-planet-name");
            $.ajax({
                type: 'POST',
                url: "/test",
                contentType: 'application/json;charset=UTF-8',
                data: {'data': clicked}
            });
        });
    });
}


