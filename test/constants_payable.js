var ConstantsPayable = artifacts.require("./ConstantsPayable.sol");

/**
 * Execute against TestRPC or other simulators
 * These test cases executed against the actual Ethereum networks may not
 * give expected results as the transaction mining takes time and this code
 * execution is carried out within TestRPC that is almost instantaneous
 */
contract('ConstantsPayable', function(accounts) {
  // it("should return lastCaller=NOTSET", function() {
  //   var constantsPayable;
  //   return ConstantsPayable.deployed().then(function(instance){
  //     constantsPayable = instance;
  //     // Transaction - call the function
  //     return constantsPayable.setLastCaller("John Wayne");
  //   }).then(function(result){ 
  //     //console.log("Received Receipt = ", result.tx);
  //     assert.equal(undefined, result.tx);
  //     return constantsPayable.lastCaller.call();
  //   }).then(function(result){
  //     //console.log("Received caller name = ",result);
  //     assert.equal("NOTSET",result,"Unexpected result!!");
  //   });
  // });

  // it("should send and receive 1000 wei",function(){
  //   var constantsPayable;
  //   return ConstantsPayable.deployed().then(function(instance){
  //     constantsPayable = instance;
  //     // Send ethers to the contract - Truffle abstraction does not have a direct method
  //     web3.eth.sendTransaction({ from: accounts[0], to: constantsPayable.address, value: 1000 });
  //     return constantsPayable.getBalance.call();
  //   }).then(function(result){
  //     //console.log("Balance=", result.toNumber());
  //     assert.equal(1000,result.toNumber(), "send receive same amount!!");
  //   });
  // });

  // it("should transfer 1500 wei to a function and end balance=2500", function(){
  //   var constantsPayable;
  //   return ConstantsPayable.deployed().then(function(instance){
  //     constantsPayable = instance;
  //     // var data = web3.eth
      
  //     constantsPayable.receiveEthers("John Wayne",{value:1500, from:accounts[0]});
  //      return constantsPayable.getBalance.call();
  //   }).then(function(result){
  //     // console.log(result.toNumber());
  //     assert.equal(2500, result.toNumber(), "Balance equals 2500");
  //   });
  // });



  it("should return lastCaller=NOTSET", async () => {
    var constantsPayable;

    result = await ConstantsPayable.deployed().then(function(instance){
      constantsPayable = instance;
      // Transaction - call the function
      return constantsPayable.setLastCaller("John Wayne");
    });
     
    //console.log("Received Receipt = ", result.tx);
    assert.equal(undefined, result.tx);
  
    result = await constantsPayable.lastCaller.call();
     
    //console.log("Received caller name = ",result);
    assert.equal("NOTSET",result,"Unexpected result!!");
     
  });

  it("should send and receive 1000 wei", async () => {
    var constantsPayable;
    instance = await ConstantsPayable.deployed();
    const result = await ( (instance) => {
      constantsPayable = instance;
      // Send ethers to the contract - Truffle abstraction does not have a direct method
      web3.eth.sendTransaction({ from: accounts[0], to: constantsPayable.address, value: 1000 });
      return constantsPayable.getBalance.call();
    }) (instance);

    console.log("Balance=", result.toNumber());
    assert.equal(1000,result.toNumber(), "send receive same amount!!");
   
  });

  it("should transfer 1500 wei to a function and end balance=2500", async () => {
    var constantsPayable;
    const instance = await ConstantsPayable.deployed()
    
    const result =  await ( async (instance) => {
      constantsPayable = instance;
    
      await constantsPayable.receiveEthers("John Wayne",{value:1500, from:accounts[0]});
      return constantsPayable.getBalance.call();
    }) (instance);
     
      // console.log(result.toNumber());
    await assert.equal(2500, result.toNumber(), "Balance equals 2500");


    const data =  await ( async (instance) => {
      constantsPayable = instance;
    
      await constantsPayable.receiveEthers("John Doe",{value:3500, from:accounts[0]});
      const name = await constantsPayable.lastCaller.call();
      const lastSender =  await constantsPayable.lastSender.call();
      const lastReceived =  await constantsPayable.lastReceived.call();
      return {
        Last_Caller: name,
        Last_Sender: lastSender,
        Last_Received: lastReceived,
      };
    }) (instance);

    await assert.equal('John Doe', data.Last_Caller, "Last caller name should be `John Doe`.");
    await assert.equal(accounts[0], data.Last_Sender, "Last sender should be ", accounts[0]);
    await assert.equal(3500, data.Last_Received, "Last amound received should be 3500");
  });
});

function  sendEtherToContract(){


}
