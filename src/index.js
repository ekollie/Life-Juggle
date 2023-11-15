// Url + Endpoints
const url = "http://localhost:3000";
const scenariosUrl = url + "/Scenarios";

const button1 = document.getElementById("choice_1");
const button2 = document.getElementById("choice_2");

// Groups
const groupA = document.getElementById("group_A");
const groupB = document.getElementById("group_B");
const groupC = document.getElementById("group_C");
let groupStats = [50, 50, 50];
// Text Box
const textBox = document.getElementById("textBox");
const choiceExpanded = document.getElementById("choice_expanded");
choiceExpanded.style.color = "white";
choiceExpanded.style.fontSize = "large";

// Helper functions
function fillTextBox(text) {
  textBox.innerText = text.prompt_text;
  button1.innerText = text.choices[0].preview;
  button2.innerText = text.choices[1].preview;
}

function fillStatBox() {
  groupA.innerText = `Social: ${groupStats[0]}`;
  groupB.innerText = `School: ${groupStats[1]}`;
  groupC.innerText = `Health: ${groupStats[2]}`;
  choiceExpanded.innerText = "";
}
const multiplier = 1.3;
function statAdder(stats) {
  stats = stats.map((stat) => Math.round(stat * multiplier));
  groupStats[0] += stats[0];
  groupStats[1] += stats[1];
  groupStats[2] += stats[2];
  console.log("line 33 ran");
  groupStats.forEach((stat) => statMaxLimiter(stat));
  fillStatBox();
}

function randomNumberGenerator(range) {
  return Math.floor(Math.random() * range);
}

function statMaxLimiter(stat) {
  if (stat > 100) {
    groupStats[groupStats.indexOf(stat)] = 100;
  }
}
function statMinChecker(stat) {
  if (stat <= 0) {
    gameOver();
  }
}
function gameOver() {
  textBox.innerText = "Game over";
  button1.remove();
  button2.remove();
}

// Gameplay
fetch(scenariosUrl)
  .then((res) => res.json())
  .then((scenarios) => {
    let currScenario = scenarios[0];
    fillTextBox(currScenario);
    fillStatBox();

    // Event listeners

    button1.addEventListener("click", () => {
      fetch(scenariosUrl)
        .then((res) => res.json())
        .then((scenarios) => {
          statAdder(scenarios[currScenario.id - 1].choices[0].change);
          let rng = randomNumberGenerator(scenarios.length - 1) + 1;
          currScenario = scenarios[rng];
          fillTextBox(currScenario);
          groupStats.forEach(statMinChecker);
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
          groupStats.forEach(statMinChecker);
        });
    });

    //  Mouse Hover functionality
    button1.addEventListener("mouseover", () => {
      choiceExpanded.textContent =
        scenarios[currScenario.id - 1].choices[0].choice_text; // Hover on, text appears
    });
    button1.addEventListener("mouseleave", () => {
      // Hover off, text disappears
      choiceExpanded.textContent = "";
    });

    button2.addEventListener("mouseover", () => {
      choiceExpanded.textContent =
        scenarios[currScenario.id - 1].choices[1].choice_text;
    });
    button2.addEventListener("mouseleave", () => {
      choiceExpanded.textContent = "";
    });
  });
