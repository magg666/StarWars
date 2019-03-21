import {checkIfLoggedAndSetNavBarAccordingly} from "./dom_handler.js";
import {startDisplayingPlanetTable} from "./planet_data_manager.js";
import {handleLogin} from "./login_handler.js";

function main() {
    checkIfLoggedAndSetNavBarAccordingly();
    startDisplayingPlanetTable();
    handleLogin();

}

main();