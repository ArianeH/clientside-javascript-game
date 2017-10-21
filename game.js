const ship = "fa fa-ship fa-3x"
const shark = "fa fa-fighter-jet fa-3x"

setInterval(function getRandomElement() {
  var selected = getElement("invisible", getRandomNumber(9));
  selected.className = "visible";

  // setTimeout(function increaseSize() {
  //   var ship = selected.getElementsByClassName("fa fa-ship fa-3x")[0];
  //   ship.className = "fa fa-ship fa-5x";
  // },2000);

  var getPointFunction = function() { getPoint(selected) }

  selected.addEventListener( 'click', getPointFunction);

  setTimeout(function changeToInvisible() {
    selected.className = "invisible";
    selected.removeEventListener('click', getPointFunction);
  },2000);
},3000);

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

  if ((elementsFirstChild.className == shark) && currentScore.innerHTML > 0) {
    currentScore.innerHTML--;
  } else if (elementsFirstChild.className == ship) {
    currentScore.innerHTML++;
  }

  changeToSharkOrShip(elementsFirstChild);
}

function changeToSharkOrShip(elementsFirstChild) {
  var num = getRandomNumber(10)
  if (num <= 3) {
    elementsFirstChild.className = shark;
  } else {
    elementsFirstChild.className = ship;
  }
}

