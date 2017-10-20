function changeClass() {
  var selected = getElement("mole");
  selected.classList.add("red");
}

window.onload = function()
{
  var selected = getElement("mole");
  selected.addEventListener( 'click', changeClass);
}

function getElement(className) {
  return document.getElementsByClassName(className)[0];
}
