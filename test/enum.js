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
contract('enum', function(accounts) {
  // it("should assert true", function() {
  //   var mapping_enum_struct;
  //   return MappingEnumStruct.deployed().then(function(instance){
  //     mapping_enum_struct = instance;
  //     // Get the enum continent/value at index = 0
  //     return mapping_enum_struct.getContinent.call(0);
  //   }).then(function(result){
  //     console.log("Continent at index=", 0, "is: ",result);
  //     assert.isTrue(result === "Africa");
  //     return mapping_enum_struct.getContinent.call(4);
  //   }).then(function(result){
  //     console.log("Continent at index=", 4, "is: ",result);
  //     assert.isTrue(result === "Europe");
  //   });
  // });






  // it("should assert true", async () => {
  //   var mapping_enum_struct;
  //   const instance = await MappingEnumStruct.deployed()
    
  //   const result = await ( (instance) => {
  //     mapping_enum_struct = instance;
  //     // Get the enum continent/value at index = 0
  //     return mapping_enum_struct.getContinent.call(0);
  //   }) (instance); 

  //   //console.log("Continent at index=", 0, "is: ",result);
  //   await assert.isTrue(result === "Africa");

  //   const europeContinent = await mapping_enum_struct.getContinent.call(4);
    
  //   //console.log("Continent at index=", 4, "is: ",result);
  //   await assert.isTrue(europeContinent === "Europe");
     
  // });

  it("should return country details", async () => {

    var mapping_enum_struct;
    const instance = await MappingEnumStruct.deployed();

    await ( async (instance ) => {
      mapping_enum_struct = instance; 
      await mapping_enum_struct.addEuropeanCountry("France", Continent.Europe, 200);
      await mapping_enum_struct.addEuropeanCountry("United Kingdom", Continent.Europe, 150);
      await mapping_enum_struct.addEuropeanCountry("Germany", Continent.Europe, 250);
    }) (instance); 

    const [country, continent, pop] = await ( (instance, countryName) => {
      mapping_enum_struct = instance;
      
      return mapping_enum_struct.countryDetail.call(countryName);
    }) (instance, "Germany"); 
    // await console.log("country:",web3.toAscii(country));
    // await console.log("continent:", web3.toDecimal(continent));
    // await console.log("population:",web3.toDecimal(pop));

    assert.equal(hex2a(country),'Germany',"Country should be Germany");
    assert.equal(web3.toDecimal(continent),4,"Continent code must be 4, Europe");
    assert.equal(web3.toDecimal(pop),250,"Population should be 250");
  });

  // it("should assert true 2", async () => {
    
  //   const mapping_enum_struct = await MappingEnumStruct.deployed()
    
  //     // Get the enum continent/value at index = 0
  //   const result = await mapping_enum_struct.getContinent.call(0);
    
  //   console.log("Continent at index=", 0, "is: ",result);
  //   assert.isTrue(result === "Africa");
    
  //   const result2 = await mapping_enum_struct.getContinent.call(4);
    
  //     console.log("Continent at index=", 4, "is: ",result2);
  //     assert.isTrue(result2 === "Europe");
  //   });
  
});

 
function hex2a(hex) {
  var str = '';
  for (var i = 0; i < hex.length; i += 2) {
      var v = parseInt(hex.substr(i, 2), 16);
      if (v) str += String.fromCharCode(v);
  }
  return str;
}  