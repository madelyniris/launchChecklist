// Write your JavaScript code here!

/* This block of code shows how to format the HTML once you fetch some planetary JSON!
<h2>Mission Destination</h2>
<ol>
   <li>Name: ${}</li>
   <li>Diameter: ${}</li>
   <li>Star: ${}</li>
   <li>Distance from Earth: ${}</li>
   <li>Number of Moons: ${}</li>
</ol>
<img src="${}">
*/

let fuelReady = false;
let cargoReady = false;
let fieldCheck;
window.addEventListener("load", function()
{
this.fetch("https://handlers.education.launchcode.org/static/planets.json").then(function(response)
{
   response.json().then(function(json){
      let index = Math.floor(Math.random() * json.length);
      console.log(json[index].name);
      console.log(json[index].name);
      document.getElementById("missionTarget").innerHTML = `
         <h2>Mission Destination</h2>
      <ol>
         <li>Name: ${json[index].name}</li>
         <li>Diameter: ${json[index].diameter}</li>
         <li>Star: ${json[index].star}</li>
         <li>Distance from Earth: ${json[index].index}</li>
         <li>Number of Moons: ${json[index].moon}</li>
      </ol>
      <img src="${json[index].image}">
      `;
   });
});
let form = document.querySelector("form");
form.addEventListener("submit", function(event)
{
   let inputPilotName = document.querySelector("input[name = pilotName]");
   let inputCopilotName = document.querySelector("input[name = copilotName]");
   let inputFuelLevel = document.querySelector("input[name=fuelLevel]");
   let inputCargoMass = document.querySelector("input[name = cargoMass]");
   document.getElementById('launchStatus').innerText = 'Awaiting Information Before Launch';
   document.getElementById('launchStatus').style.color = 'black';
   document.getElementById('pilotStatus').innerText =   `Pilot${inputPilotName.value} Ready`;
   document.getElementById('copilotStatus').innerText = `Co Pilot${inputCopilotName.value} Ready`;
   document.getElementById('fuelStatus').innerText = `Fuel Level Sufficient for Launch`;
   document.getElementById('cargoStatus').innerText = `Cargo Mass Low Enough for Launch`;

   fieldCheck = false;
   cargoReady = false;
   fuelReady = false;

   if (inputPilotName.value.trim () === "" ||
   inputCopilotName.value.trim() === "" ||
   inputFuelLevel.value.trim() === "" ||
   inputCargoMass.value.trim() === "") 
   {
      alert("All fields are required.");
      event.preventDefault();
      fieldCheck = false;
      document.getElementById("faultyItems").style.visibility = "hidden";
   } else if (typeof String(inputPilotName.value) !== "string" || inputPilotName.value.trim().length === 0){
      alert("Pilot name is required!");
      event.preventDefault();
      fieldCheck = false;
      document.getElementById("faultyItems").style.visibility = "hidden";
   }
   else if (!isNaN (Number(inputPilotName.value)) && inputPilotName.value.trim().length > 0) 
   {
      alert("Invalid Input: Numbers cannot be used in pilot name.");
      event.preventDefault();
      fieldCheck = false;
      document.getElementById("faultyItems").style.visibility = "hidden";
   }
   else if (typeof String(inputCopilotName.value) !== "string" || inputCopilotName.value.trim().length === 0) 
   {
      alert("Co-Pilot field is required");
      event.preventDefault();
      fieldCheck = false;
      document.getElementById("faultyItems").style.visibility = "hidden";
   }
  else if (!isNaN(Number(inputCopilotName.value)) && inputCopilotName.value.trim().length > 0)
   {
      alert("Invalid Input: Numbers cannot be used in co-pilot name.");
      event.preventDefault();
      fieldCheck = false;
      document.getElementById("faultyItems").style.visibility = "hidden";
   }
   else if (typeof Number(inputFuelLevel.value) !== "number" || isNaN(Number(fuelLevelInput.value)))
   {
      alert("Invalid Input: Only numbers can be used in fuel level input.");
      event.preventDefault();
      fieldCheck = false;
      document.getElementById("faultyItems").style.visibility = "hidden";
   }
   else if (typeof Number(cargoMassInput.value) !== "number" || isNaN(Number(cargoMassInput.value)))
   {
      alert("Invalid Input: Only numbers can be used for cargo mass.");
      event.preventDefault();
      fieldCheck = false;
      document.getElementById("faultyItems").style.visibility = "hidden";
   } 
   else
   {
      fieldCheck = true;
   }
   if (Number(inputFuelLevel.value) < 10000 && fieldCheck) {
      document.getElementById("faultyItems").style.visibility = "visible";
      document.getElementById("fuelStatus").innerText = `Insufficient fuel. User input: ${inputFuelLevel.value}L. Needed: 10,000L.`;
      document.getElementById('launchStatus').innerText = "Shuttle not ready for launch.";
      document.getElementById('launchStatus').style.color = "red";
      fuelReady = false;
      event.preventDefault();
   }
   else
   {
      fuelReady = true;
   }
   if (Number(inputCargoMass.value) > 10000 && fieldCheck)
   {
      document.getElementById("faultyItems").style.visibility = "visible";
      document.getElementById("cargoStatus").innerText = `Excessive mass. Maximum cargo load is 10,000kg.`;
      document.getElementById('launchStatus').innerText = 'Shuttle is not ready for launch.';
      document.getElementById('launchStatus').style.color = "red";
      cargoReady = false;
      event.preventDefault();
   }
   else
   {
      cargoReady = true;
   }
   if (fuelReady && cargoReady && fieldCheck) {
      document.getElementById("faultyItems").style.visibility = "visible";
      document.getElementById('launchStatus').innerText = 'Shuttle is ready for launch.';
      document.getElementById('launchStatus').style.color = "green";
      event.preventDefault();
   }
});
});
