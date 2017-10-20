function getRandomElement() {
  var selected = getElement("invisible");
  selected.classList.remove("invisible");
  selected.classList.add("visibile");
}

// window.onload = function()
// {
//   var selected = getElement("invisible");
//   selected.addEventListener( 'click', changeClass);
// }
function getRandomNumber(max) {
  return Math.floor(Math.random() * max);
}

function getElement(className) {
  return document.getElementsByClassName(className)[getRandomNumber(9)];
}


