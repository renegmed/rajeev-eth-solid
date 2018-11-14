pragma solidity ^0.4.18;

contract CalledContract {

  // This is a Type
  struct DocumentStruct{
    // Not possible to pass strings between contracts at this time
    bytes32 name;
    uint value;
  }

  // This is a namespace where we will store docs of Type DocumentStruct
  mapping(bytes32 => DocumentStruct) public documentStructs;

  // Set values in storage
  function StoreDocument(bytes32 key, bytes32 name, uint value) returns (bool) {
   documentStructs[key].name  = name;
   documentStructs[key].value = value;
   return true;
  }
  

}