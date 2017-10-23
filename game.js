const smallShip = "fa fa-ship fa-3x"
const largeShip = "fa fa-ship fa-4x"
const smallShark = "fa fa-fighter-jet fa-3x"
const largeShark = "fa fa-fighter-jet fa-4x"
const currentScore = getElement("score", 0);
const startButton = document.getElementById("start-btn")

startButton.addEventListener('click', gameFunction)

var startTime = 100
document.getElementById("timer").innerHTML = startTime

function runTimer() {
  setInterval(function decreaseTime() {
    if (startTime > 0) {
      startTime--;
      document.getElementById("timer").innerHTML = startTime;
    }
  },100);
}

function restartGameFunction() {
  currentScore.innerHTML = 0;
  startTime = 101;
}

function gameFunction() {
  runTimer();

  setInterval(function getRandomElement() {
    if (startTime == 0) {
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
  },3000);
  startButton.id = "restart-btn";
  startButton.innerHTML = "Restart Game!";
  startButton.removeEventListener('click', gameFunction);
  document.getElementById("restart-btn").addEventListener('click', restartGameFunction);
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

