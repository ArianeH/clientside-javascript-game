setInterval(function getRandomElement() {
  var selected = getElement("invisible", getRandomNumber(9));
  selected.className = "visible";

  // setTimeout(function increaseSize() {
  //   var ship = selected.getElementsByClassName("fa fa-ship fa-3x")[0];
  //   ship.className = "fa fa-ship fa-5x";
  // },2000);

  selected.addEventListener( 'click', function() { getPoint(selected) });

  setTimeout(function changeToInvisible() {
    selected.className = "invisible";
  },3000);
},4000);

function getRandomNumber(max) {
  return Math.floor(Math.random() * max);
}

function getElement(className, num) {
  return document.getElementsByClassName(className)[num];
}

function getPoint(element) {
  // element.classList.add("red").animationDelay = "2s";
  element.className = "invisible";
  element.firstChild.className = "fa fa-fighter-jet fa-3x";
  var currentScore = getElement("score", 0).innerHTML++;
}

