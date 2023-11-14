// Url + Endpoints
const url = "http://localhost:3000";
const scenariosUrl = url + "/Scenarios";

const button1 = document.getElementById("choice_1");
const button2 = document.getElementById("choice_2");

// Groups
const groupA = document.getElementById("group_A");
const groupB = document.getElementById("group_B");
const groupC = document.getElementById("group_C");
let groupStats = [25, 25, 25];
// Text Box
const textBox = document.getElementById("textBox"); // grabs element

// Helper functions
function fillTextBox(text) {
  textBox.innerText = text.prompt_text;
  button1.innerText = text.choices[0].choice_text;
  button2.innerText = text.choices[1].choice_text;
}

function fillStatBox() {
  groupA.innerText = `Social: ${groupStats[0]}`;
  groupB.innerText = `School: ${groupStats[1]}`;
  groupC.innerText = `Health: ${groupStats[2]}`;
}

function statAdder(stats) {
  groupStats[0] += stats[0];
  groupStats[1] += stats[1];
  groupStats[2] += stats[2];
  fillStatBox();
}

function randomNumberGenerator(range) {
  return Math.floor(Math.random() * range);
}

// Gameplay
fetch(scenariosUrl)
  .then((res) => res.json())
  .then((scenarios) => {
    let currScenario = scenarios[randomNumberGenerator(scenarios.length)];
    fillTextBox(currScenario);
    fillStatBox();

    // Event listeners
    button1.addEventListener("click", () => {
      fetch(scenariosUrl)
        .then((res) => res.json())
        .then((scenarios) => {
          statAdder(scenarios[currScenario.id - 1].choices[0].change);
          let rng = randomNumberGenerator(scenarios.length);
          currScenario = scenarios[rng];
          fillTextBox(currScenario);
        });
    });
    button2.addEventListener("click", () => {
      fetch(scenariosUrl)
        .then((res) => res.json())
        .then((scenarios) => {
          statAdder(scenarios[currScenario.id - 1].choices[1].change);
          let rng = randomNumberGenerator(scenarios.length);
          currScenario = scenarios[rng];
          fillTextBox(currScenario);
        });
    });
  });
