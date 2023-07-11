// Write your helper functions here!
require('isomorphic-fetch');

function addDestinationInfo(document, name, diameter, star, distance, moons, imageUrl) {
   // Here is the HTML formatting for our mission target div.
   document.getElementById("missionTarget").innerHTML = `
                <h2>Mission Destination</h2>
                <ol>
                    <li>Name: ${name}</li>
                    <li>Diameter: ${diameter}</li>
                    <li>Star: ${star}</li>
                    <li>Distance from Earth: ${distance}</li>
                    <li>Number of Moons: ${moons}</li>
                </ol>
                <img src="${imageUrl}">`
  
}

function validateInput(testInput) {
   let numInput = Number (testInput);
   if (testInput === "") {
    return "Empty";
   } else if (isNaN(numInput)) {
    return "Not a Number";
   } else {
    return "IS a Number";
   }
}

function formSubmission(document, list, pilot, copilot, fuelLevel, cargoLevel) {
   let pilotStatus = document.getElementById ("pilotStatus");
   let copilotStatus = document.getElementById ("copilotStatus");
   let fuelStatus = document.getElementById ("fuelStatus");
   let cargoStatus = document.getElementById ("cargoStatus");
   let launchStatus  = document.getElementById("launchStatus")

   if (validateInput(pilot) === "Empty" || validateInput(copilot) === "Empty" || validateInput(fuelLevel) === "Empty" || validateInput(cargoLevel) === "Empty"){
    alert ("All fields are require!");
   } else if (validateInput(pilot) === "Is a Number" || validateInput(copilot) === "IS a Number" || validateInput(fuelLevel) === "Not a Number" || validateInput(cargoLevel) === "Not a Number"){
    alert ("Please enter valid input for each field!");
   } else {
    list.style.visibility = "visible";
    pilotStatus.innerHTML = `Pilot ${pilot} is now ready for launch`;
    copilotStatus.innerHTML = `Co-Copilot ${copilot} is now ready for launch`;
        if (fuelLevel >= 10000 && cargoLevel > 10000) {
            fuelStatus.innerHTML = "Fuel level is high enough for launch";
            cargoStatus.innerHTML = "Cargo mass too heavy for launch";
            launchStatus.innerHTML = "Shuttle Not Ready for Launch";
            launchStatus.style.color = "red";
        } else if (fuelLevel < 10000 && cargoLevel <= 10000 ) {
            fuelStatus.innerHTML = "Fuel level is too low for launch";
            cargoStatus.innerHTML = "Cargo mass low enough for launch";
            launchStatus.innerHTML = "Shuttle Not Ready for Launch";
            launchStatus.style.color = "red";
        } else if (fuelLevel < 10000 && cargoLevel > 10000) {
            fuelStatus.innerHTML = "Fuel level is too low for launch";
            cargoStatus.innerHTML = "Cargo mass too heavy for launch";
            launchStatus.innerHTML = "Shuttle Not Ready for Launch";
            launchStatus.style.color = "red";
        } else {
            fuelStatus.innerHTML = "Fuel level high enough for launch";
            cargoStatus.innerHTML = "Cargo mass low enough for launch";
            launchStatus.innerHTML = "Shuttle Ready for Launch";
            launchStatus.style.color = "green";
        }
   }
}

async function myFetch() {
    let planetsReturned;

    planetsReturned = await fetch("https://handlers.education.launchcode.org/static/planets.json").then( function(response) {
        return response.json();
        });

    return planetsReturned;
}

function pickPlanet(planets) {
    let randomPlanet = Math.floor(Math.random()*planets.length);
    return planets[randomPlanet];
}

module.exports.addDestinationInfo = addDestinationInfo;
module.exports.validateInput = validateInput;
module.exports.formSubmission = formSubmission;
module.exports.pickPlanet = pickPlanet; 
module.exports.myFetch = myFetch;
