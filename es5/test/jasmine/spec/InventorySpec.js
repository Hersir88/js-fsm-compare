describe("Inventory tests", function(){

  var inventory;

  beforeEach(function(){

    inventory = new Inventory();
    inventory.addProduct("book1","wood");
    inventory.addProduct("book2","wood");
    inventory.addProduct("book3","wood");
    inventory.addProduct("book4","wood");
    inventory.addProduct("book5","wood");
    inventory.addProduct("book6","wood");
    inventory.addProduct("book7","metal");

  });

  it("Should return books made of wood",function(){
    var result = inventory.getProductsByType("wood");

    expect(result).not.toBe(null);
    expect(result).toEqual(jasmine.any(Array));
  });

  it("Should return 6 books made of wood",function(){
    var result = inventory.getProductsByType("wood");
    expect(result.length).toEqual(6);
  });

  it("Should return empty array",function(){

    var result = inventory.getProductsByType("gurkis");
    expect(result).toEqual(jasmine.any(Array));
    expect(result.length).toEqual(0);

  });

});
