describe('Sample', function(){
  it('should sum 2 numbers', function () {
    expect(1+1).toEqual(2);
  });
});

describe('Game', function(){
  it('change to shark or ship', function () {
    expect(document.getElementsByClassName("invisible")[Math.floor(Math.random() * 9)].firstChild.className).toEqual(largeShark);
  });
});
