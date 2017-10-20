setInterval(function getRandomElement() {
  var selected = getElement("invisible");
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

function getElement(className) {
  return document.getElementsByClassName(className)[getRandomNumber(9)];
}

function getPoint() {
  var element = document.getElementsByClassName("visible")[0];
  element.classList.remove("visible");
  element.classList.add("invisible");
}
