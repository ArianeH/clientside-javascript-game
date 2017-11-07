const smallShip = "fa fa-ship fa-3x";
const largeShip = "fa fa-ship fa-4x";
const smallShark = "fa fa-fighter-jet fa-3x";
const largeShark = "fa fa-fighter-jet fa-4x";
const currentScore = getElement("score", 0);
const startButton1 = document.getElementById("start-btn-1");
const gameTable = getElement("game-table", 0);
var levelInfo = document.getElementById("level-info");

levelInfo.innerHTML = "Reach at least 5 points!";

startButton1.addEventListener('click', gameFunctionLevel1)

var startTime

function runTimer(timerId) {
  startTime = 100;
  document.getElementById(timerId).innerHTML = startTime;
  setInterval(function decreaseTime() {
    if (startTime > 0) {
      startTime--;
      document.getElementById(timerId).innerHTML = startTime;
    }
  },100);
};

function gameFunctionLevel1() {
  runTimer("timer-1");

  setInterval(function() { getRandomElement() },3000);
  startButton1.id = "restart-btn-1";
  startButton1.innerHTML = "Restart Game!";
  startButton1.removeEventListener('click', gameFunctionLevel1);
  document.getElementById("restart-btn-1").addEventListener('click', restartGameFunction);
};

function gameFunctionLevel2() {
  gameTable.id = "game-2";

  runTimer("timer-1");

  setInterval(function() { getRandomElement() },3000);
  startButton1.id = "restart-btn-2";
  startButton1.innerHTML = "Restart Game!";
  startButton1.removeEventListener('click', gameFunctionLevel2);
  document.getElementById("restart-btn-2").addEventListener('click', restartGameFunction);
};

function getRandomElement() {
  if ((startTime == 0) && (currentScore.innerHTML > 0)) {
    if (gameTable.id == "game-1") {
      scrollNextLevel();
      return;
    } else {
      return;
    }
  } else if (startTime == 0) {
    document.getElementById("level-message").innerHTML = "GAME OVER!";
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

  var explodingShipFunction = function() { explodingElement(selected) }
  selected.addEventListener( 'click', explodingShipFunction);

  setTimeout(function changeToInvisible() {
    selected.className = "invisible";
    changeToSharkOrShip(selected.firstChild, getRandomNumber(10));
    selected.removeEventListener('click', getPointFunction);
  },2000);
};

function restartGameFunction() {
  document.getElementById("level-message").innerHTML = "";
  currentScore.innerHTML = 0;
  startTime = 101;
};

function scrollNextLevel() {
  var levelOne = document.getElementById('game-1');
  levelOne.style.marginTop = "-300px";
  levelInfo.innerHTML = "Reach at least 10 points!"
  startButton1.id = "start-btn-2";
  startButton1.innerHTML = "Start Game!";
  document.getElementById("timer-1").innerHTML = 100;
  var startButton2 = document.getElementById("start-btn-2");
  startButton2.addEventListener('click', gameFunctionLevel2);
};

function getRandomNumber(max) {
  return Math.floor(Math.random() * max);
};

function getElement(className, num) {
  return document.getElementsByClassName(className)[num];
};

function getPoint(element) {
  element.classList.add("red");

  setTimeout(function changeToInvisible() {
    element.className = "invisible";
  },500);

  var elementsFirstChild = element.firstChild

  if (((elementsFirstChild.className == smallShark) || (elementsFirstChild.className == largeShark))
    && currentScore.innerHTML > 0) {
    currentScore.innerHTML--;
  } else if (elementsFirstChild.className == smallShip) {
    currentScore.innerHTML = parseInt(currentScore.innerHTML) + 2;
    startTime += 55;
  } else if (elementsFirstChild.className == largeShip) {
    currentScore.innerHTML = parseInt(currentScore.innerHTML) + 1;
    startTime += 35;
  }
};

function changeToSharkOrShip(elementsFirstChild, num) {
  if (num <= 3) {
    elementsFirstChild.className = largeShark;
  } else {
    elementsFirstChild.className = smallShip;
  }
};

function explodingElement(element, magnitude = 16) {
  var tiltAngle = 1;
  var counter = 1;
  var numberOfShakes = 15;
  var startX = 0;
  var startY = 0;
  var startAngle = 0;

  var magnitudeUnit = magnitude / numberOfShakes;

  var randomNum = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  shakeElement();

  function shakeElement() {
    if (counter < numberOfShakes) {
      element.style.transform = 'translate(' + startX + 'px, ' + startY + 'px)';
      magnitude -= magnitudeUnit;

      var randomX = randomNum(-magnitude, magnitude);
      var randomY = randomNum(-magnitude, magnitude);
      element.style.transform = 'translate(' + randomX + 'px, ' + randomY + 'px)';

      counter += 1;
      requestAnimationFrame(shakeElement);
    }
    if (counter >= numberOfShakes) {
      element.style.transform = 'translate(' + startX + ', ' + startY + ')';
    }
  }
};
