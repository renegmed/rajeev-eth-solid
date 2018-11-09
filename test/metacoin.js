var MetaCoin = artifacts.require("./MetaCoin.sol");

contract('MetaCoin', function(accounts) {
  it("should put 10000 MetaCoin in the first account", async () => {
    const instance = await MetaCoin.deployed();

    const balance = await ((instance) => {
      return instance.getBalance.call(accounts[0]);
    }) (instance); 

    await assert.equal(balance.valueOf(), 10000, "10000 wasn't in the first account");
     
  });
  
  
  it("should call a function that depends on a linked library", async () => {
    var meta;
    // var metaCoinBalance;
    // var metaCoinEthBalance;

    const instance = await MetaCoin.deployed();

    const balance = await ((instance) => {
      meta = instance;
      return meta.getBalance.call(accounts[0]);
    }) (instance);

    await assert.equal(balance, 10000, "First account should have 10000");

    const outCoinBalanceEth = await ((outCoinBalance) => {
      metaCoinBalance = outCoinBalance.toNumber();
      return meta.getBalanceInEth.call(accounts[0]);
    }) (balance);
 
    await assert.equal(outCoinBalanceEth.toNumber(), 10000 * 2 + 1, "Coin balance (in ether) should be ",  10000 * 2 + 1);

    // metaCoinEthBalance = outCoinBalanceEth.toNumber();
     
    // assert.equal(metaCoinEthBalance, 2 * outCoinBalanceEth, 
    //           "Library function returned unexpected function, linkage may be broken");
     
  });

  it("should send coin correctly", async () => {
    var meta;

    // Get initial balances of first and second account.
    //var account_one = accounts[0];
    //var account_two = accounts[1];

    //var account_one_starting_balance;
    //var account_two_starting_balance;
    //var account_one_ending_balance;
    //var account_two_ending_balance;

    var amount_to_transfer = 10;

    const instance = await MetaCoin.deployed();

    const account1_balance = await ((instance, account) => {
      meta = instance;
      return meta.getBalance.call(account);
    }) (instance, accounts[0]);

    await assert.equal(account1_balance, 10000, "Account 1 should have a balance of 10000.");

    const account2_balance = await ((account) => {
      //account_one_starting_balance = balance.toNumber();
      return meta.getBalance.call(account);
    }) (accounts[1]);

    const isSentCoinSufficient = await ((from_account, to_account, amount) => {
      //account_two_starting_balance = balance.toNumber();
      return meta.sendCoin(to_account, amount, {from: from_account});
    }) (accounts[0], accounts[1], amount_to_transfer);
    
    //await console.log("Is sent coin sufficient: ", isSentCoinSufficient);

    //await assert.isTrue(isSentCoinSufficient, "Sent coin should be sufficient.");

    const new_account1_balance = await ((account) => {
      return meta.getBalance.call(account);
    }) (accounts[0]);

    //await console.log("Account 1 new balance:",  new_account1_balance.toNumber());

    const new_account2_balance = await ((account) => {
      //account_one_ending_balance = balance.toNumber();
      return meta.getBalance.call(account);
    }) (accounts[1]);

     
    //account_two_ending_balance = balance.toNumber();
    await assert.equal(new_account1_balance.toNumber(), account1_balance.toNumber() - amount_to_transfer, "Amount wasn't correctly taken from the sender");
    await assert.equal(new_account2_balance.toNumber(), account2_balance.toNumber() + amount_to_transfer, "Amount wasn't correctly sent to the receiver");
   
  });  
});
