// import tříd 
import Ball from "./Ball.js";
import Paddle from "./Paddle.js";

const ball = new Ball(document.getElementById("ball"));
const cPaddle = new Paddle(document.getElementById("c-paddle"));
const computerPaddle = new Paddle(document.getElementById("computer-paddle"));
const cScoreElem = document.getElementById("c-score");
const computerScoreElem = document.getElementById("computer-score");

let lastTime;
//update pozicí míče a platforem
function update(time) {
  if (lastTime != null) {
    const delta = time - lastTime
    ball.update(delta, [cPaddle.rect(), computerPaddle.rect()]);
    cPaddle.update(delta, ball.y);
    computerPaddle.update(delta, ball.y);
    const hue = parseFloat(getComputedStyle(document.documentElement).getPropertyValue("--hue"));
//změna pozadí
    document.documentElement.style.setProperty("--hue", hue + delta * 0.01);

    if (isLose()) handleLose();
  }

  lastTime = time;
  window.requestAnimationFrame(update);
}
//funkce pro zjištění jestli někdo prohrál
function isLose() {
  const rect = ball.rect();
  return rect.right >= window.innerWidth || rect.left <= 0;
}
//funkce pro zjištění kdo prohrál
function handleLose() {
  const rect = ball.rect();
  if (rect.right >= window.innerWidth) {
    cScoreElem.textContent = parseInt(cScoreElem.textContent) + 1;
  } else {
    computerScoreElem.textContent = parseInt(computerScoreElem.textContent) + 1;
  }
  ball.reset();
  computerPaddle.reset();
}


window.requestAnimationFrame(update);
