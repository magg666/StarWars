import {displayNavigationBar} from "./navbar.js";
import {displayPlanetPage} from "./planets.js";
import {addPlanetStatListener} from "./vote.js";
import {sendErrorLogsToServer} from "./api_ajax.js";


function main() {
    displayNavigationBar();
    displayPlanetPage();

    addPlanetStatListener();

}

// error handler
window.addEventListener('error', function (e) {
  let stack = e.error.stack;
  let message = e.error.toString();
  if (stack) {
    message += '\n' + stack;
  }
  sendErrorLogsToServer(message)
});


main();

