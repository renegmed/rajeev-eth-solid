var CallingContract = artifacts.require("./CallingContract.sol");

contract('Calling contracts', function(accounts) {
    it('should able to create and store DocumentStruct', async () => {
        try {
            var callingContractInstance;
            const instance = await CallingContract.deployed();
            const success = await ( async (instance) => {
                callingContractInstance = instance;
            
                // // Add some sample data
                const resp = await callingContractInstance.StoreDocument("state", "New York", 5001);
                await callingContractInstance.StoreDocument("zip", "no zip code", 1002);
                await callingContractInstance.StoreDocument("street", "3957 58th Street",1008);
                return true;
            }) (instance);

            assert.equal(success, true, "Should return true");
          
            const [name, value] = await ( (key) =>{
                return callingContractInstance.RetrieveData(key);
            }) ("state");

            //console.log(web3.toAscii(name));
            //const result =  (web3.toAscii(name)).toString();
             assert.equal(hex2a(name) , "New York", "Document name should be 'New York'.");

           
            assert.equal(value.toNumber(), 5001, "Value should be 5001.");


            const [name2, value2] = await ( (key) =>{
                return callingContractInstance.RetrieveData(key);
            }) ("zip");
            assert.equal(hex2a(name2) , "no zip code", "Document name should be '11377'.");
            assert.equal(value2.toNumber(), 1002, "Value2 should be 1002.");
            assert.notEqual(value2.toNumber(), 1003, "Value2 should no be equal to 1003.");
        } catch (err) {
            //assert.equal(typeof err, undefined, "Test failed." );
            console.log('----- ERROR -------');
            console.log(err);
        }  
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
  