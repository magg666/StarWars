import {checkIfLoggedAndSetNavBarAccordingly} from "./dom_handler.js";
import {startDisplayingPlanetTable} from "./planet_data_manager.js";
import {handleLogin} from "./login_handler.js";
import {addVoteButton, showVoteButtons} from "./vote.js";

function main() {

    checkIfLoggedAndSetNavBarAccordingly();
    startDisplayingPlanetTable();
    handleLogin();
    // document.onreadystatechange = () => {
    //     if(document.readyState === 'complete'){
    //         console.log(document.readyState);
    //         showVoteButtons()
    //     }
    //
    // }


    //
    // setTimeout(function () {
    //     showVoteButtons();
    // }, 2000)

}

main();



