// This test may not work against EVM as the addCaptial are invoked as txn
// MUST be mined before data will become available. Try in TestRPC only
var MappingEnumStruct = artifacts.require("./MappingEnumStruct.sol");
const Continent = {
  Africa: 0,
  Antartica: 1,
  Asia: 2,
  Australia: 3,
  Europe: 4,
  North_America: 5, 
  South_America: 6,
};

contract('MappingEnumStruct', function(accounts) {
  // it("should return capital of Egypt & then Blank", function() {
  //   var mapping_enum_struct;
  //   return MappingEnumStruct.deployed().then(function(instance){
  //     mapping_enum_struct = instance;
  //     // Add some sample data
  //     mapping_enum_struct.addCapital("Egypt", "Cairo");
  //     mapping_enum_struct.addCapital("America", "Washington DC");
  //     return mapping_enum_struct.addCapital("Australia", "Sydney");
  //   }).then(function(){
  //     return mapping_enum_struct.getCapital.call("Egypt");
  //   }).then(function(result){
  //     console.log("Capital of Egypt: ", result);
  //     assert.isTrue(result === "Cairo");
  //     // remove the capital of Egypt
  //     mapping_enum_struct.removeCapital("Egypt");
  //     return mapping_enum_struct.getCapital.call("Egypt");
  //   }).then(function(result){
  //     console.log("Capital of Egypt: ", result);
  //     assert.isTrue(result === "");
  //   });
  // });

  it("should return capital of Egypt & then Blank", async () => {
    var mapping_enum_struct;
    const instance = await MappingEnumStruct.deployed()
    
    await ( async (instance) => {
      mapping_enum_struct = instance;
      // Add some sample data
      await mapping_enum_struct.addCapital("Egypt", "Cairo");
      await mapping_enum_struct.addCapital("America", "Washington DC");
      await mapping_enum_struct.addCapital("Australia", "Sydney");
    }) (instance);

    const egyptCapital = await ( (countryName) => {
      return mapping_enum_struct.getCapital.call(countryName);
    }) ("Egypt");

    const removedEgyptCapital = await ( async (data) =>{
      console.log("Capital of Egypt: ", data);
      await assert.isTrue(data === "Cairo");
      // remove the capital of Egypt
      await mapping_enum_struct.removeCapital(data);
      return mapping_enum_struct.getCapital.call(data);
    }) (egyptCapital);
     
    await console.log("Capital of Egypt: ", removedEgyptCapital);
    await assert.isTrue(removedEgyptCapital === "");
    
  });

  it("should return array of European countries", async () => {
    var mapping_enum_struct;
    const instance = await MappingEnumStruct.deployed();
    
    const europeCountries = await ( async (instance) => {
      mapping_enum_struct = instance;
      await mapping_enum_struct.addEuropeanCountry("France", Continent.Europe, 200);
      await mapping_enum_struct.addEuropeanCountry("Egypt", Continent.Africa, 200);
      await mapping_enum_struct.addEuropeanCountry("United Kingdom", Continent.Europe, 150);
      await mapping_enum_struct.addEuropeanCountry("Philippines", Continent.Asia, 110);
      return mapping_enum_struct.EuropeanCountriesArray.call();

    }) (instance);
 
      //  console.log(hex2a(resultArr[0][0]));  // France
      //  console.log(web3.toDecimal(resultArr[0][1]));
      //  console.log(web3.toDecimal(resultArr[0][2]));
      //  console.log(web3.toAscii(resultArr[0][3]));  // United Kingdom
      //  console.log(web3.toDecimal(resultArr[0][4]));
      //  console.log(web3.toDecimal(resultArr[0][5]));
    await assert.equal(web3.toDecimal(europeCountries[0][1]),4,"Continent code must be 4, Europe");
    await assert.equal(web3.toDecimal(europeCountries[0][2]),200,"Population (in millions) must be 200");
    await assert.equal(web3.toDecimal(europeCountries[0][4]),4,"Continent code must be 4, Europe");
    await assert.equal(web3.toDecimal(europeCountries[0][5]),150,"Population (in millions) must be 150"); 
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