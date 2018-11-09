var SpecialArrays = artifacts.require("./SpecialArrays.sol");

contract('SpecialArrays', function(accounts) {
  it("convert should return 5", function() {
    var special_arrays;
    return SpecialArrays.deployed().then(function(inst){
      special_arrays = inst;
      // Call the conversionTest()
      return special_arrays.conversionTest.call();
    }).then(function(result){
      console.log("conversionTest() = ", result);
      // Call the getElementAt(1)
      return special_arrays.getElementAt.call(1);
    }).then(function(result){
      console.log("getElementAt() as byte = ", result);
      console.log("getElementAt() as string = ", web3.toAscii(result));
      // Check if we have received 0x62 which is ascii for character 'b'
      assert.equal(result, '0x62', "Unexpected result!!!");
    });    
  });

  it("retrieves the element at specified indeces", function() {
    var byteResult;
    var special_arrays;
    return SpecialArrays.deployed().then(function(inst){
      special_arrays = inst;
      return special_arrays.getElementAt.call(0);
    }).then( function(result){
      console.log("+++Result: ", hex_to_ascii(result));
      assert.equal(web3.toAscii(result), 'a', "Expected to be 'a' not " + hex_to_ascii(result));
    //   return special_arrays.getElementAt.call(1);
    // }).then( function(result){
    //   console.log("+++Result: ", hex_to_ascii(result));
    //      assert.equal(result, 'b', "Expected to be 'b'");
    //      return special_arrays.getElementAt.call(2); 
    // }).then( function(result){
    //   console.log("+++Result: ", hex_to_ascii(result));
    //     assert.equal(result, 'c', "Expected to be 'c'");
    //    // return special_arrays.getElementAt.call(3);   
    });
  });  
});

function hex_to_ascii(str1)
 {
	var hex  = str1.toString();
	var str = '';
	for (var n = 0; n < hex.length; n += 2) {
		str += String.fromCharCode(parseInt(hex.substr(n, 2), 16));
	}
	return str;
 }

