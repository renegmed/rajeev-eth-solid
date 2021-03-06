var FuncTypes = artifacts.require("./FuncTypes.sol");
var FuncTypesCaller = artifacts.require("./FuncTypesCaller.sol");

contract('FuncTypesCaller', function(accounts) {

  /** Case 1, check the length of the string */
  // it("should return len=6", function() {
  //   var funcTypes;
  //   var funcTypesCaller;
  //   return FuncTypes.deployed().then(function(instance){
  //     funcTypes = instance;
  //     return FuncTypesCaller.deployed();
  //   }).then(function(instance){
  //     funcTypesCaller = instance;
  //     // console.log(instance)
  //     return funcTypesCaller.callExternal.call(funcTypes.address, "123456");
  //   }).then(function(result){
  //     console.log("Receieved length = ", result.toNumber()); 
  //     assert.equal(6,result.toNumber(),'Incorrect length!!!' )
  //   });
  // });

  it("should return len=6", async () => {
    var funcTypes;
    var funcTypesCaller;
    const funcTypesInstance = await FuncTypes.deployed();
    
    const funcTypesCallerInstance = await ( (instance) => {
      funcTypes = instance;
      return FuncTypesCaller.deployed();
    }) (funcTypesInstance);
    
    const result = await ( (instance) =>{
      funcTypesCaller = instance;
      // console.log(instance)
      return funcTypesCaller.callExternal.call(funcTypes.address, "123456");
    }) (funcTypesCallerInstance);
 
    await console.log("Receieved length = ", result.toNumber()); 
    await assert.equal(6,result.toNumber(),'Incorrect length. Should be 6.');
     
  });

});

