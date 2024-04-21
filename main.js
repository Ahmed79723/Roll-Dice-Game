// ============================|selecting elements|=====================================
const random = document.getElementById("random");
const newGame = document.getElementById("newGme");
const roll = document.getElementById("roll");
const hold = document.getElementById("hold");
const scores = document.querySelectorAll("span");
const score1 = document.querySelector(".score1");
const score2 = document.querySelector(".score2");
const current1 = document.querySelector(".current1");
const current2 = document.querySelector(".current2");
const player1 = document.querySelector(".player1");
const player2 = document.querySelector(".player2");
const dice = document.querySelector(".dice");
const winner = document.querySelector(".winner");
const arrow = document.getElementById("arrow");
// ===========================|global vars|======================================
let flag = true;
let total1 = 0;
let total2 = 0;
let currentP1 = 0;
let currentP2 = 0;
// ==============================|start condition|===================================
if (!localStorage.getItem("totalP1") || !localStorage.getItem("totalP2")) {
  localStorage.setItem("totalP1", `0`);
  localStorage.setItem("totalP2", `0`);
} else {
  score1.innerHTML = localStorage.getItem("totalP1");
  score2.innerHTML = localStorage.getItem("totalP2");
  total1 = JSON.parse(localStorage.getItem("totalP1"));
  total2 = JSON.parse(localStorage.getItem("totalP2"));
}
roll.disabled = false;
hold.disabled = false;
player1.classList.add("active");
random.style.display = "none";
// ============================|switch players function|=====================================
function switchPlayer() {
  player1.classList.toggle("active");
  player2.classList.toggle("active");
  if (flag) {
    flag = false;
  } else {
    flag = true;
  }
  arrow.innerHTML = `${flag ? "⬅️" : "➡️"}`;
  currentP2 = 0;
  currentP1 = 0;
  current1.innerHTML = currentP1;
  current2.innerHTML = currentP2;
}
// ============================|game reset|=====================================
newGame.addEventListener("click", () => {
  random.style.display = "none";
  roll.disabled = false;
  hold.disabled = false;
  winner.classList.add("hidden");
  for (let i = 0; i < scores.length; i++) {
    scores[i].innerHTML = 0;
  }
  total1 = 0;
  total2 = 0;
  currentP1 = 0;
  currentP2 = 0;
  localStorage.setItem("totalP1", `0`);
  localStorage.setItem("totalP2", `0`);
  player1.classList.add("active");
  player2.classList.remove("active");
  flag = true;
});
// ============================|rolling dice|=====================================
roll.addEventListener("click", () => {
  arrow.innerHTML = `${flag ? "⬅️" : "➡️"}`;
  random.style.display = "flex";
  const randomRoll = Math.trunc(Math.random() * 6) + 1;
  dice.src = `imgs/dice-${randomRoll}.png`;
  switch (true) {
    case randomRoll === 1 && flag:
      switchPlayer();
      console.log("1");
      break;
    case randomRoll === 1:
      switchPlayer();
      console.log("2");
      break;
    case randomRoll !== 1 && flag:
      console.log("currentP1", currentP1);
      currentP1 += randomRoll;
      console.log(currentP1);
      current1.innerHTML = `${currentP1}`;
      console.log("3");
      break;
    case randomRoll !== 1:
      console.log("currentP2", currentP2);
      currentP2 += randomRoll;
      console.log(currentP2);
      current2.innerHTML = `${currentP2}`;
      console.log("4");
      break;
  }
});
// ============================|holding dice score|=====================================
hold.addEventListener("click", () => {
  flag ? (total1 += currentP1) : (total2 += currentP2);
  if (total1 >= 50 || total2 >= 50) {
    score1.innerHTML = `${total1}`;
    score2.innerHTML = `${total2}`;
    random.style.display = "none";
    roll.disabled = true;
    hold.disabled = true;
    winner.classList.remove("hidden");
    winner.innerHTML = `🎉player ${total1 >= 50 ? 1 : 2} is the winner!🎉`;
  } else if (flag && total1 < 50) {
    score1.innerHTML = `${total1}`;
    localStorage.setItem("totalP1", JSON.stringify(total1));
    switchPlayer();
  } else {
    score2.innerHTML = `${total2}`;
    localStorage.setItem("totalP2", JSON.stringify(total2));
    switchPlayer();
  }
});
