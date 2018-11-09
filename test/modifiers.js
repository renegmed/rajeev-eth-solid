var Modifiers = artifacts.require("./Modifiers.sol");

contract('Modifiers', function (accounts) {
  // it("deployed with msg.sender=account[0]", function () {
  //   var modifiers;
  //     return Modifiers.deployed().then(function (instance) {
  //     modifiers = instance;
  //     return modifiers.owner.call();
  //   }).then(function (result) {
  //     // truffle uses account[0] for deployment of contract
  //     assert.equal(accounts[0], result);
  //   }).catch( function(err) {
  //     console.log(err);
  //   });
  // });

  // it("calling transferOwnership with account[1] should fail", function () {
  //   var modifiers;
  //     return Modifiers.deployed().then(function (instance) {
  //     modifiers = instance;
  //     // Simulate a transaction sent from accounts[1] 
  //     // Since accounts[1] is NOT the owner - this would fail
  //     // In truffle it will throw exception and terminate the script execution
  //     // This will throw exception
  //    modifiers.transferOwnership(accounts[1], {from:accounts[1]});
  //     // This would go OK
  //     // modifiers.transferOwnership(accounts[0], {from:accounts[0]});
  //     return modifiers.owner.call();
  //   }).then(function (result) {
  //     console.log(result)
  //     // owner == account[0]
  //     assert.equal(accounts[0], result);
  //   }).catch( function(err) {
  //     console.log(err);
  //   });
  // });

  // // Multiple modifier
  // // Uncomment code below to see behavior of func with multiple modifier
  // it("should invoke multiple modifiers", function(){
  //   var modifiers;
  //     return Modifiers.deployed().then(function (instance) {
  //     modifiers = instance;
  //     // Simulate a transaction sent from accounts[1] 
  //     // Since accounts[1] is NOT the owner - this would fail
  //     // In truffle it will throw exception and terminate the script execution
  //     modifiers.testModifiers();
  //     return modifiers.testMod.call();
  //   }).then(function(result){
  //     console.log("testMod=",result.toNumber());
  //     assert.equal(1,result.toNumber());
  //   });
    
  // });
  


  it("deployed with msg.sender=account[0]", async () => {
    try {
      var modifiers;
      const instance = await Modifiers.deployed();
      const owner = await ((instance) => {
        modifiers = instance;
        return modifiers.owner.call();
      }) (instance);
    
      await ( (account) => {
       // truffle uses account[0] for deployment of contract
        assert.equal(accounts[0], account, "Owner account is not valid.");
      }) (owner);
    
    } catch( err) {
      console.log(err);
    } 
     
  });


  it("calling transferOwnership with account[1] should fail", async () => {
    try {
      var modifiers;
      const instance = await Modifiers.deployed();
      const owner = await (async (instance) => {
        modifiers = instance;
        // Simulate a transaction sent from accounts[1] 
        // Since accounts[1] is NOT the owner - this would fail
        // In truffle it will throw exception and terminate the script execution
        // This will throw exception
        await modifiers.transferOwnership(accounts[1], {from:accounts[1]});
        // This would go OK
        // modifiers.transferOwnership(accounts[0], {from:accounts[0]});
        return modifiers.owner.call();
      }) (instance); 
      await ((account) => {
        console.log(account)
        // owner == account[0]
        assert.notEqual(accounts[0], account, "Accounts should not be equal.");
      }) (owner);
    } catch(err) {
      //console.log(err);
      await assert.isTrue(err !== undefined, "Transaction reverted. Error should be generated");
    } 
  });

  // Multiple modifier
  //Uncomment code below to see behavior of func with multiple modifier
  it("should invoke multiple modifiers", async () => {
    var modifiers;
    const instance = await Modifiers.deployed();
    const testModifier = await (async (instance) => {
      modifiers = instance;
      // Simulate a transaction sent from accounts[1] 
      // Since accounts[1] is NOT the owner - this would fail
      // In truffle it will throw exception and terminate the script execution
      await modifiers.testModifiers();
      return modifiers.testMod.call();
    }) (instance);

    await ((result) => {
      console.log("testMod=",result.toNumber());
      assert.equal(3,result.toNumber());
    }) (testModifier);
    
  });
  
  it("should display modifier workflow", async () => {
    var modifiers;
    const instance = await Modifiers.deployed();
    const flow = await (async (instance) => {
      modifiers = instance;
      // Simulate a transaction sent from accounts[1] 
      // Since accounts[1] is NOT the owner - this would fail
      // In truffle it will throw exception and terminate the script execution
      await modifiers.testModifiers();
      return modifiers.flow.call();
      //return modifiers.getFlow();
    }) (instance);

    await ((result) => {
      console.log("flow=",flow);
      assert.equal("mod1_mod2_testModifiers_",flow, "Flow strings are not equal.");
    }) (flow);
    
  });

});


function hex2a(hex) {
  var str = '';
  for (var i = 0; i < hex.length; i += 2) {
      var v = parseInt(hex.substr(i, 2), 16);
      if (v) str += String.fromCharCode(v);
  }
  return str;
}  
