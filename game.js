const smallShip = "fa fa-ship fa-3x"
const largeShip = "fa fa-ship fa-4x"
const smallShark = "fa fa-fighter-jet fa-3x"
const largeShark = "fa fa-fighter-jet fa-4x"
const currentScore = getElement("score", 0);
const startButton1 = document.getElementById("start-btn-1")
const startButton2 = document.getElementById("start-btn-2")

startButton1.addEventListener('click', gameFunctionLevel1)
startButton2.addEventListener('click', gameFunctionLevel2)

var startTime
// document.getElementById("timer-1").innerHTML = startTime
// document.getElementById("timer-2").innerHTML = startTime

function runTimer(timerId) {
  startTime = 100;
  document.getElementById(timerId).innerHTML = startTime;
  setInterval(function decreaseTime() {
    if (startTime > 0) {
      startTime--;
      document.getElementById(timerId).innerHTML = startTime;
    }
  },100);
}

function restartGameFunction() {
  currentScore.innerHTML = 0;
  startTime = 101;
}

function gameFunctionLevel1() {
  runTimer("timer-1");

  setInterval(function() { getRandomElement() },3000);
  startButton1.id = "restart-btn-1";
  startButton1.innerHTML = "Restart Game!";
  startButton1.removeEventListener('click', gameFunctionLevel1);
  document.getElementById("restart-btn-1").addEventListener('click', restartGameFunction);
}

function gameFunctionLevel2() {
  runTimer("timer-2");

  setInterval(function() { getRandomElement() },3000);
  startButton2.id = "restart-btn-2";
  startButton2.innerHTML = "Restart Game!";
  startButton2.removeEventListener('click', gameFunctionLevel2);
  document.getElementById("restart-btn-2").addEventListener('click', restartGameFunction);
}

function getRandomElement() {
  if (startTime == 0) {
    scrollNextGame();
    return;
  }
  var selected = getElement("invisible", getRandomNumber(9));
  selected.className = "visible";

  var ship = selected.getElementsByClassName("fa fa-ship")[0];
  if (ship) {
    setTimeout(function increaseSize() {
      ship.className = largeShip;
    },800);
  }

  var getPointFunction = function() { getPoint(selected) }
  selected.addEventListener( 'click', getPointFunction);

  setTimeout(function changeToInvisible() {
    selected.className = "invisible";
    changeToSharkOrShip(selected.firstChild);
    selected.removeEventListener('click', getPointFunction);
  },2000);
}

function scrollNextGame() {
  document.getElementById('timer-2').scrollIntoView({block: 'start', behavior: 'smooth'});
}

function getRandomNumber(max) {
  return Math.floor(Math.random() * max);
}

function getElement(className, num) {
  return document.getElementsByClassName(className)[num];
}

function getPoint(element) {
  element.classList.add("red");

  setTimeout(function changeToInvisible() {
    element.className = "invisible";
  },200);

  var elementsFirstChild = element.firstChild

  if (((elementsFirstChild.className == smallShark) || (elementsFirstChild.className == largeShark)) && currentScore.innerHTML > 0) {
    currentScore.innerHTML--;
  } else if (elementsFirstChild.className == smallShip) {
    currentScore.innerHTML = parseInt(currentScore.innerHTML) + 2;
  } else if (elementsFirstChild.className == largeShip) {
    currentScore.innerHTML = parseInt(currentScore.innerHTML) + 1;
  }
}

function changeToSharkOrShip(elementsFirstChild) {
  var num = getRandomNumber(10)
  if (num <= 3) {
    elementsFirstChild.className = largeShark;
  } else {
    elementsFirstChild.className = smallShip;
  }
}

