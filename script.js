'use strict';

let minFuel = 10000;
let maxCargo = 10000;
let planets;

fetch('https://handlers.education.launchcode.org/static/planets.json')
.then(function (response) {
    response.json().then(function (json) {
        planets = json;

        for (let i = 0; i < planets.length; i++) {
            destination.innerHTML += `<option value="${i}">${planets[i].name}</option>`;
        }
    });
});

window.addEventListener('load', function () {
    formSubmit.addEventListener('click', formSubmitted);
    destination.addEventListener('change', destinationSelected);
});

function destinationSelected(event) {
    if (destination.value === '') return;

    missionTarget.innerHTML = `
    <h2>Mission Destination</h2>
        <ol>
            <li>Name: ${planets[destination.value].name}</li>
            <li>Diameter: ${planets[destination.value].diameter}</li>
            <li>Star: ${planets[destination.value].star}</li>
            <li>Distance from Earth: ${planets[destination.value].distance}</li>
            <li>Number of Moons: ${planets[destination.value].moons}</li>
        </ol>
        <img src="${planets[destination.value].image}">`;
}

function formSubmitted(event) {
    event.preventDefault();

    let inputs = document.querySelectorAll('#launchForm > form > div > label > input[type=text]');

    for (let input of inputs)
        if (input.value === '') {
            alert('All fields are required.');
            return;
        }

    if (destination.value === '') {
        alert('Please select a destination');
        return;
    }

    if (isNotAString('#launchForm > form > div:nth-child(1) > label > input[type=text]')) return;
    if (isNotAString('#launchForm > form > div:nth-child(2) > label > input[type=text]')) return;
    if (isNotANumber('#launchForm > form > div:nth-child(3) > label > input[type=text]')) return;
    if (isNotANumber('#launchForm > form > div:nth-child(4) > label > input[type=text]')) return;

    let pilotText = document.querySelector('#launchForm > form > div:nth-child(1) > label > input[type=text]').value + ' is ready.';
    let copilotText = document.querySelector('#launchForm > form > div:nth-child(2) > label > input[type=text]').value + ' is ready.';
    let cargoText = 'There is too much mass to take off.';
    let fuelText = 'Not enough fuel for the journey.';
    let launchStatusText = 'Shuttle not ready for launch.';

    let fuel = Number(document.querySelector('#launchForm > form > div:nth-child(3) > label > input[type = text]').value);
    let cargo = Number(document.querySelector('#launchForm > form > div:nth-child(4) > label > input[type = text]').value);

    if (fuel > minFuel) fuelText =
        'Fuel level high enough for launch.';
    
    if (cargo < maxCargo) cargoText =
        'Cargo mass low enough for launch.';

    if (fuel > minFuel && cargo < maxCargo)
        launchStatusText = 'Shuttle is ready for launch.';

    launchStatusCheck.innerHTML = `<h2 id="launchStatus">${launchStatusText}</h2>
                                <div id="faultyItems">
                                    <ol>
                                        <li id="pilotStatus">${pilotText}</li>
                                        <li id="copilotStatus">${copilotText}</li>
                                        <li id="fuelStatus">${fuelText}</li>
                                        <li id="cargoStatus">${cargoText}</li>
                                    </ol>
                                </div>`;

    if (fuel > minFuel && cargo < maxCargo) {
        faultyItems.style.visibility = 'hidden';
        launchStatus.style.color = 'green';
    }
    else {
        faultyItems.style.visibility = 'visible';
        launchStatus.style.color = 'red';
    }
    
}

function isNotANumber(querySelector) {
    let input = document.querySelector(querySelector);

    if (isNaN(input.value) === false) return false;

    alert(input.parentElement.textContent + ' must be a number.');

    return true;
    
}

function isNotAString(querySelector) {
    let input = document.querySelector(querySelector);

    if (isNaN(input.value)) return false;

    alert(input.parentElement.textContent + ' must be text.');

    return true;
}