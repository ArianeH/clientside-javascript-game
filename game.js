setInterval(function getRandomElement() {
  var selected = getElement("invisible", getRandomNumber(9));
  console.log(selected)
  selected.classList.remove("invisible");
  selected.classList.add("visible");
  selected.addEventListener( 'click', getPoint);

  setInterval(function changeToInvisible() {
    selected.classList.remove("visible");
    selected.classList.add("invisible");
  },2000);

},3000);

function getRandomNumber(max) {
  return Math.floor(Math.random() * max);
}

function getElement(className, num) {
  return document.getElementsByClassName(className)[num];
}

function getPoint() {
  var element = getElement("visible", 0);
  element.classList.remove("visible");
  element.classList.add("invisible");
  var scoreList = getElement("score", 0);
  scoreList.innerHTML += 1;
}
