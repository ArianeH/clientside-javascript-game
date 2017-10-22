const smallShip = "fa fa-ship fa-3x"
const largeShip = "fa fa-ship fa-4x"
const smallShark = "fa fa-fighter-jet fa-3x"
const largeShark = "fa fa-fighter-jet fa-4x"

setInterval(function getRandomElement() {
  var selected = getElement("invisible", getRandomNumber(9));
  selected.className = "visible";
  var ship = selected.getElementsByClassName("fa fa-ship")[0];

  setTimeout(function increaseSize() {
    ship.className = largeShip;
  },800);

  var getPointFunction = function() { getPoint(selected) }

  selected.addEventListener( 'click', getPointFunction);

  setTimeout(function changeToInvisible() {
    selected.className = "invisible";
    ship.className = smallShip;
    selected.removeEventListener('click', getPointFunction);
  },1000);
},2000);

function getRandomNumber(max) {
  return Math.floor(Math.random() * max);
}

function getElement(className, num) {
  return document.getElementsByClassName(className)[num];
}

function getPoint(element) {
  // element.classList.add("red").animationDelay = "2s";
  element.className = "invisible";

  var currentScore = getElement("score", 0);
  var elementsFirstChild = element.firstChild

  if ((elementsFirstChild.className == smallShark || largeShark) && currentScore.innerHTML > 0) {
    currentScore.innerHTML--;
  } else if (elementsFirstChild.className == smallShip || largeShip) {
    currentScore.innerHTML++;
  }

  changeToSharkOrShip(elementsFirstChild);
}

function changeToSharkOrShip(elementsFirstChild) {
  var num = getRandomNumber(10)
  if (num <= 3) {
    elementsFirstChild.className = largeShark;
  } else {
    elementsFirstChild.className = smallShip;
  }
}

