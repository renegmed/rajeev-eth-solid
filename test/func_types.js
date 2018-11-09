var FuncTypes = artifacts.require("./FuncTypes.sol");

contract('FuncTypes', function(accounts) {

  /** Case 1, check the length of the string */
  // it("should return len=5", function() {
  //   var funcTypes;
  //   return FuncTypes.deployed().then(function(instance){
  //     funcTypes = instance;
  //     // The function actualLengthFunction should be 
  //     // undefined as its internal
  //     assert.equal(undefined, funcTypes.actualLengthFunction,'actualLengthFunction Not expected to be available!!!')
  //    return funcTypes.indirectCall.call("12345");
  //   }).then(function(result){
  //     // Result received is a number
  //     console.log("Receieved length = ", result.toNumber()); 
  //     assert.equal(5,result.toNumber(),'Incorrect length!!!' )
  //  });
  // });

  it("should return len=5", async () => {
    var funcTypes;
    const instance = await FuncTypes.deployed();
    
    const result = await (async (instance) => {
      funcTypes = instance;
      // The function actualLengthFunction should be 
      // undefined as its internal
      await assert.equal(undefined, funcTypes.actualLengthFunction,'actualLengthFunction Not expected to be available!!!')
      return funcTypes.indirectCall.call("12345");
    }) (instance);
     
    // Result received is a number
    console.log("Receieved length = ", result.toNumber()); 
    assert.equal(5,result.toNumber(),'Incorrect length!!!' )
    
  });
});

