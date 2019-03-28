import {checkIfLoggedAndSetNavBarAccordingly} from "./dom_handler.js";
import {startDisplayingPlanetTable} from "./planets.js";
import {handleLogin} from "./login_handler.js";


function main() {
    checkIfLoggedAndSetNavBarAccordingly();
    startDisplayingPlanetTable();
    handleLogin();
}

main();



