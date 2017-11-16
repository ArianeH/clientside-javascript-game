const smallShip = "small-ship";
const largeShip = "large-ship";
const smallShark = "small-shark";
const largeShark = "large-shark";
const currentScore = getElement("score", 0);
const startButton1 = document.getElementById("start-btn-1");
const gameTable = getElement("game-table", 0);
var levelInfo = document.getElementById("level-info");
var startTime

levelInfo.innerHTML = "Reach at least 5 points!";

startButton1.addEventListener('click', gameFunctionLevel1)

// sets start time and descreases it per second
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

// activated the timer-1, calls getRandomElement function and reassignes functionality to buttons
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
  if ((startTime == 0) && (currentScore.innerHTML > 4)) {
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

  // var ship = selected.getElementsByClassName("small-ship")[0];
  if (selected.firstChild.className == smallShip) {
    setTimeout(function increaseSize() {
      selected.firstChild.className = largeShip;
    },800);
  } else {
    setTimeout(function increaseSize() {
      selected.firstChild.className = largeShark;
    },800);
  }

  var getPointFunction = function() { getPoint(selected) }
  selected.addEventListener( 'click', getPointFunction);

  var explodingShipFunction = function() { explodingElement(selected) }
  selected.addEventListener( 'click', explodingShipFunction);

  setTimeout(function changeToInvisible() {
    selected.className = "invisible";
    changeToSharkOrShip(selected, getRandomNumber(10));
    selected.removeEventListener('click', getPointFunction);
  },2000);

  // selected.firstChild.className = smallShip;
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
  var elementsFirstChild = element.firstChild;
  element.id = "orange";

  setTimeout(function changeToInvisible() {
    element.className = "invisible";
    element.id = "white";
  },500);

  function removeEventListener() {
    elementsFirstChild.id = ("clicked-element-once");
  }

  if (elementsFirstChild.id == "clicked-element-once") {
    currentScore.innerHTML = parseInt(currentScore.innerHTML) + 0;
    startTime += 0;
  } else if (((elementsFirstChild.className == smallShark) || (elementsFirstChild.className == largeShark))
    && currentScore.innerHTML > 0) {
    currentScore.innerHTML--;
    removeEventListener();
  } else if (elementsFirstChild.className == smallShip) {
    currentScore.innerHTML = parseInt(currentScore.innerHTML) + 2;
    startTime += 55;
    removeEventListener();
  } else if (elementsFirstChild.className == largeShip) {
    currentScore.innerHTML = parseInt(currentScore.innerHTML) + 1;
    startTime += 35;
    removeEventListener();
  }
};

function changeToSharkOrShip(element, num) {
  console.log(element.firstChild.className)
  if (((element.firstChild.className == smallShip) || (element.firstChild.className == largeShip)) && (num <= 9)) {
    element.firstChild.className = smallShark;
  } else {
    element.firstChild.className = smallShip;
  }
};

function explodingElement(element, magnitude = 26) {
  var counter = 1;
  var numberOfShakes = 25;
  var startX = -35;
  var startY = 0;

  var magnitudeUnit = magnitude / numberOfShakes;

  function randomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  shakeElement();

  function shakeElement() {
    if (counter < numberOfShakes) {
      element.style.transform = 'translate(' + startX + 'px, ' + startY + 'px)';
      magnitude -= magnitudeUnit;

      var randomX = randomNumber(-magnitude, magnitude)-65;
      var randomY = randomNumber(-magnitude, magnitude);
      element.style.transform = 'translate(' + randomX + 'px, ' + randomY + 'px)';

      counter += 1;
      requestAnimationFrame(shakeElement);
    }
    else {
      element.style.transform = 'translate(' + startX + ', ' + startY + ')';
    }
  }
};
