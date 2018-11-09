var Globals = artifacts.require("./Globals.sol");

contract('Globals', function(accounts) {
  
  // it("should assert true", function() {
  //   var globals;
  //     Globals.deployed().then(function(instance){
  //     globals = instance;
  //     return globals.etherUnitsTest.call();
  //   }).then(function(result){
  //     console.log("etherUnitsTest() received bool=",result);
  //     return globals.timeUnitsTest.call();
  //   }).then(function(result){
  //     var curTime = Math.floor((new Date().getTime())/1000);
  //     console.log("timeUnitsTest() = ", result.toNumber()," Local time = ",curTime);
  //     // Time after 1 days - Enum index for day unit = 2
  //     return globals.calculateFutureTime.call(1,0)
  //   }).then(function(result){
  //     // Create the date - time received in second need to be converted to millisec
  //     var dt = new Date(result.toNumber()*1000);
  //     //console.log("Current time = ",Math.floor((new Date().getTime())/1000));
  //     console.log("calculateFutureTime() = ",dt," Result = ", result.toNumber());
  //     return globals.getBlockInformation.call();
  //   }).then(function(result){
  //     console.log("block.number=",result[0].toNumber()," block.hash=",result[1]);
  //     console.log("Miner coinbase = ", result[2], " difficulty = ",result[3].toNumber());
  //     return globals.getMsgInformation.call();
  //   }).then(function(result){
  //     console.log("data = ",result[0]," sig = ",result[1]);
  //     console.log("sender = ",result[2]);

  //     // Using empty string as arg will throw an exception in the contract
  //     // return globals.revertBehavior("");
  //     return globals.revertBehavior("John Smith");
  //   }).then(function(result){
  //     // Result = txn receipt
  //     // console.log(result);
  //     return globals.lastCaller.call();
  //   }).then(function(result){
  //     console.log("lastCaller = ",result);
  //     return globals.callCrypto.call("ABCDE");
  //   }).then(function(result){
  //     console.log("keccak256 = ",result[0]);
  //     console.log("sha3      = ",result[1]);
  //     console.log("sha256    = ",result[2]);
  //     console.log("packed sha3 = ",result[3]);
  //     console.log("ripemd160   = ",result[4]);
  //   });
  // });

  it("should assert true", async () => {
    var globals;
    const instance = await Globals.deployed();
    await assert.notEqual(undefined, typeof instance);

    const isEther = await ((instance) => {
      globals = instance;
      return globals.etherUnitsTest.call();
    }) (instance);

    const timeUnit = await ((result) => {
      console.log("etherUnitsTest() received bool=",result);
      assert.equal(result, true, "ether unit test should be true");
      return globals.timeUnitsTest.call();
    }) (isEther);


    const calculatedTimeUnit = await ((result) =>{
      var curTime = Math.floor((new Date().getTime())/1000);
      //console.log("timeUnitsTest() = ", result.toNumber()," Local time = ",curTime);
      assert.equal(result.toNumber(), curTime, "Result time should be ", curTime);
      // Time after 1 days - Enum index for day unit = 2
      return globals.calculateFutureTime.call(1,0)
    }) (timeUnit);

    const blockInfo = await ((result) => {
      // Create the date - time received in second need to be converted to millisec
      var dt = new Date(result.toNumber()*1000);
      //console.log("Current time = ",Math.floor((new Date().getTime())/1000));
      console.log("calculateFutureTime() = ",dt," Result = ", result.toNumber());
      return globals.getBlockInformation.call();
    }) (calculatedTimeUnit);

    const msgInfo = await ((result) => {
      console.log("block.number=",result[0].toNumber()," block.hash=",result[1]);
      console.log("Miner coinbase = ", result[2], " difficulty = ",result[3].toNumber());
      return globals.getMsgInformation.call();
    }) (blockInfo);

    const revertBehavior = await ((result) => {
      console.log("data = ",result[0]," sig = ",result[1]);
      console.log("sender = ",result[2]);

      // Using empty string as arg will throw an exception in the contract
      // return globals.revertBehavior("");
      return globals.revertBehavior("John Smith");
    }) (msgInfo);

    const lastCaller = await ((result) => {
      // Result = txn receipt
      // console.log(result);
      return globals.lastCaller.call();
    }) (revertBehavior);

    const cryptoData = await ((result) => {
      console.log("lastCaller = ",result);
      return globals.callCrypto.call("ABCDE");
    }) (lastCaller);

    await ((result) => {
      console.log("keccak256 = ",result[0]);
      console.log("sha3      = ",result[1]);
      console.log("sha256    = ",result[2]);
      console.log("packed sha3 = ",result[3]);
      console.log("ripemd160   = ",result[4]);
    }) (cryptoData);
  });


});