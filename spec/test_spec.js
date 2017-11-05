describe('Sample', function(){
  it('should sum 2 numbers', function () {
    expect(1+1).toEqual(2);
  });
});

describe('Game', function(){
  it('should change to shark', function () {
    var largeShark = "fa fa-fighter-jet fa-4x";
    var element = document.createElement("DIV");
    changeToSharkOrShip(element, 2);
    expect(element.className).toEqual(largeShark);
  });

  it('should change to ship', function() {
    var smallShip = "fa fa-ship fa-3x";
    var element = document.createElement("DIV");
    changeToSharkOrShip(element, 4);
    expect(element.className).toEqual(smallShip);
  })
});
