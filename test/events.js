var Events = artifacts.require("./Events.sol");

contract('Events', function(accounts) {
  // it("should emit 2 events : BidFailed, NewHighBid", function() {
  //   var events;
  //   return Events.deployed().then(function(instance){
  //     events = instance;
  //     // This bid will lose as the required minimum is 1010
  //     return events.bid("Ben",{from:accounts[0], value:1005});
  //   }).then(function(result){
  //     // result=tx reciept that has the log/events
  //     dumpEvents(result);
  //     assert.equal('BidFailed',result.logs[0].event );
  //     // John will become high bidder with 1100 wei
  //     return events.bid("John",{from:accounts[0], value:1100});
  //   }).then(function(result){
  //     dumpEvents(result);
  //     assert.equal('NewHighBid',result.logs[0].event );
  //     return events.getHighBidder.call();
  //   }).then(function(result){
  //     console.log('High Bidder=', result);
  //     assert.equal('John', result);
  //   });
  // });

  it("should emit 2 events : BidFailed, NewHighBid", async () => {
    var events;
    const instance = await Events.deployed();
    
    const bidResult = await ( (instance) =>{
      events = instance;
      // This bid will lose as the required minimum is 1010
      return events.bid("Ben",{from:accounts[0], value:1005}); 
    }) (instance);
   
    //await dumpEvents(bidResult); 

    const bidResult2  =  await ( async data => {
      // result=tx reciept that has the log/events
      //await dumpEvents(data);
      await assert.equal('BidFailed',data.logs[0].event );
      // John will become high bidder with 1100 wei
      return events.bid("John",{from:accounts[0], value:1100});
    }) (bidResult);

    const higherBidder = await ( async data => {
      await dumpEvents(data);
      await assert.equal('NewHighBid',data.logs[0].event );
      return events.getHighBidder.call();
    }) (bidResult2) ;
    
     
    await console.log('High Bidder=', higherBidder);
    await assert.equal('John', higherBidder);
    
  });


});

// Truffle: you may access the log in receipt
function  dumpEvents(result){
  for(var i=0; i<result.logs.length;i++){
        console.log(result.logs[i].event,'>>', result.logs[i].args.name,' ',result.logs[i].args.howmuch.toNumber())
  }
}