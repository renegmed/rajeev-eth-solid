var StoragePatterns = artifacts.require("./StoragePatterns.sol");

contract('StoragePatterns', function(accounts) {

    it("should create, store and access Simple List entity", async () => {
        let simpleList;
        const instance = await StoragePatterns.deployed();
        await ( async (instance) => {
            simpleList = instance;
            const row1 = await simpleList.simpleListNewEntity(accounts[0], 5);
            const row2= await simpleList.simpleListNewEntity(accounts[1], 8);
            //console.log("Row1: ", row1, "  Row2: ", row2);
            //return simpleList.simpleListNewEntity.call(accounts[0], 5);
        }) (instance);
             
        //await console.log("Row number:",rowNumber); ???? why receive this?  Need to use method call() as simpleList.simpleListNewEntity.call(accounts[0], 5);      
        // Row number: { tx:
        //     '0x973ed465013dd2b4d5c1bd8fae10b13c397282bac908dbd86a460f8571e519cc',
        //    receipt:
        //     { transactionHash:
        //        '0x973ed465013dd2b4d5c1bd8fae10b13c397282bac908dbd86a460f8571e519cc',

        const count = await ( async () => {
            result = await simpleList.simpleListGetEntityCount();
            return result;
        })();

        //await ( (count) => {
            console.log("Count:",count.toNumber());
            await assert.equal(count.toNumber(), 2, "Simple list should have a size of 2.");
        //}) (count);


        const entityData = await ((row) => {
            return simpleList.simpleListGetEntityData(row);
        })(0);

        await ( (data) => {
            console.log("Entity data:",data.toNumber());
            assert.equal(data.toNumber(), 5, "Simple list entity data should be 5.");
        }) (entityData);

    }); 
    
    it("should create, store read and update Mapping with Structs entity", async () => {
        let mappingEntity;
        const instance = await StoragePatterns.deployed();
        const isCreated = await (async (instance) => {
            mappingEntity = instance;
            return  mappingEntity.mappingNewEntity.call(accounts[0], 25);             
        }) (instance);

        await ( (isCreated) => {
            console.log("2. isCreated?",isCreated);
            assert.isTrue(isCreated, "MappingEntity with Structs should have been created.");
        }) (isCreated);

    });     
});
