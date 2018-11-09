pragma solidity ^0.4.6;
/*
I started with your example and adapted it until it works. 
A few pointers I noticed while doing it.

struct defines a Type. You have to cast a Variable with that 
Type to storage values. mapping is the tool for organizing 
instances by unique key.

I changed the Type of name to bytes32 because it's not possible 
to pass strings between contracts at this time.

E will need knowledge of the ABI for D so it can make calls. 
D is in the same source file, so the compiler can "see" it when 
it encounters this line that casts a variable as type "D".

D d;

E will also need to know the address of "the" D instance it 
should be talking to. The constructor for E expects an address 
passed in when it gets deployed.

I made the mapping public so there's a "free" getter function 
called documentStructs() and it expects only the key passed in. 
It returns the two values stored. 

    Source: https://ethereum.stackexchange.com/questions/15930/pushing-pulling-data-from-data-storage-contract

*/
contract D {

  // This is a Type
  struct DocumentStruct{
    // Not possible to pass strings between contracts at this time
    bytes32 name;
    uint value;
  }

  // This is a namespace where we will store docs of Type DocumentStruct
  mapping(bytes32 => DocumentStruct) public documentStructs;

  // Set values in storage
  function StoreDocument(bytes32 key, bytes32 name, uint value) returns (bool success) {
   documentStructs[key].name  = name;
   documentStructs[key].value = value;
   return true;
  }

}


contract E {

  // "d" is of type "D" which is a contract ^
  D d;

  // Define the Type in this context
  struct DocumentStruct{
    bytes32 name;
    uint value;
  }    

  // For this to work, pass in D's address to E's constructor
  function E(address dAddress) {
    d = D(dAddress);
  }

    // function E(address DContractAddress) {
    //     d = D(DContractAddress);
    // }
  function RetrieveData(bytes32 key) 
    public
    view
    returns(bytes32, uint) 
  {
    // Declare a temporary "doc" to hold a DocumentStruct
    DocumentStruct memory doc;
    // Get it from the "public" mapping's free getter.
    (doc.name, doc.value) = d.documentStructs(key);
    // return values with a fixed sized layout
    return(doc.name, doc.value);
  }
}

