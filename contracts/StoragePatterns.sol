pragma solidity ^0.4.17;
/*
    Here are some simple and useful patterns in increasing order of utility.

    Event logs are omitted for brevity. In practice, 
    it's desirable to emit events for every important state change. 
    
    Source: https://ethereum.stackexchange.com/questions/13167/are-there-well-solved-and-simple-storage-patterns-for-solidity/13168#13168
*/
contract StoragePatterns {
    /*
   SimpleList

    Strenghts:
        Reliably choronoligical order
        Provides a count
        Random access Row Number (not Id)
    Weaknesses:
        No random access by Id
        No assurance of uniqueness 
        No check for duplicates 
        Uncontrolled growth of the list     
    */
    struct SimpleListEntityStruct {
        address entityAddress;
        uint entityData;
        // more fields
    }

    SimpleListEntityStruct[] public simpleListEntityStructs;

    function simpleListNewEntity(address entityAddress, uint entityData) public returns(uint row) {
        SimpleListEntityStruct memory newEntity;
        newEntity.entityAddress = entityAddress;
        newEntity.entityData    = entityData;
        return simpleListEntityStructs.push(newEntity) - 1; 
        // simpleListEntityStructs.push(newEntity);
        // return simpleListEntityStructs.length - 1;
    }
    
    function simpleListGetEntityCount() public view returns(uint) {
        return simpleListEntityStructs.length;
    }

    function simpleListGetEntityData(uint row) public view returns(uint) {
        return  simpleListEntityStructs[row].entityData;
    }
    /*
        Mapping with Structs
        
        Strengths:
            Random access by unique Id
            Assurance of Id uniqueness
            Enclose arrays, mappings, structs within each 'record'
        
        Weaknesses:
            Unable to enumerate the keys
            Unable to count the keys
            Needs a manual check to distinguish a default from an explicitly "all 0" record
    */

    struct MappingEntityStruct {
        uint entityData;
        bool isEntity;
    }

    mapping (address => MappingEntityStruct) public mappingEntityStructs;

    function mappingIsEntity(address entityAddress) public constant returns(bool) {
        return mappingEntityStructs[entityAddress].isEntity;
    }

    function mappingNewEntity(address entityAddress, uint entityData) public returns(bool) {
        if(mappingIsEntity(entityAddress)) revert(); 
        mappingEntityStructs[entityAddress].entityData = entityData;
        mappingEntityStructs[entityAddress].isEntity = true;
        return true;
    }

    function mappingDeleteEntity(address entityAddress) public returns(bool success) {
        if(!mappingIsEntity(entityAddress)) revert();
        mappingEntityStructs[entityAddress].isEntity = false;
        return true;
    }

    function mappingUpdateEntity(address entityAddress, uint entityData) public returns(bool success) {
        if(!mappingIsEntity(entityAddress)) revert();
        mappingEntityStructs[entityAddress].entityData = entityData;
        return true;
    }


    /*
        Array of Structs with Unique Ids

        Strengths:
            Random access by Row number
            Assurance of Id uniqueness 
            Enclose arrays, mappings and structs with each "record"

        Weaknesses:
            No random access by Id
            Uncontrolled growth of the list 
    */

    struct ArrayStructsEntityStruct {
        address entityAddress;
        uint entityData;
    }

    ArrayStructsEntityStruct[] public arrayStructsEntityStructs;

    mapping(address => bool) knownEntity;

    function arrayStructsIsEntity(address entityAddress) public constant returns(bool isIndeed) {
        return knownEntity[entityAddress];
    }

    function arrayStructsGetEntityCount() public constant returns(uint entityCount) {
        return arrayStructsEntityStructs.length;
    }

    function arrayStructsNewEntity(address entityAddress, uint entityData) public returns(uint rowNumber) {
        if(arrayStructsIsEntity(entityAddress)) revert();
        ArrayStructsEntityStruct memory newEntity;
        newEntity.entityAddress = entityAddress;
        newEntity.entityData = entityData;
        knownEntity[entityAddress] = true;
        return arrayStructsEntityStructs.push(newEntity) - 1;
    }

    function arrayStructsUpdateEntity(uint rowNumber, address entityAddress, uint entityData) public returns(bool success) {
        if(!arrayStructsIsEntity(entityAddress)) revert();
        if(arrayStructsEntityStructs[rowNumber].entityAddress != entityAddress) revert();
        arrayStructsEntityStructs[rowNumber].entityData    = entityData;
        return true;
    }

    /*
        Mapped Structs with Index

        Strengths:
            Random access by unique Id or row number
            Assurance of Id uniqueness
            Enclose arrays, mappings and structs within each "record"
            List maintains order of declaration
            Count the records
            Enumerate the Ids
            "Soft" delete an item by setting a boolean
        Weaknesses:
            Uncontrolled growth of the list     
    */

    struct MappedStructsEntityStruct {
        uint entityData;
        bool isEntity;
    }

    mapping(address => MappedStructsEntityStruct) public mappedStructsEntityStructs;
    address[] public mappedStructsEntityList;

    function isEntity(address entityAddress) public constant returns(bool isIndeed) {
        return mappedStructsEntityStructs[entityAddress].isEntity;
    }

    function getEntityCount() public constant returns(uint entityCount) {
        return mappedStructsEntityList.length;
    }

    function newEntity(address entityAddress, uint entityData) public returns(uint rowNumber) {
        if(isEntity(entityAddress)) revert();
        mappedStructsEntityStructs[entityAddress].entityData = entityData;
        mappedStructsEntityStructs[entityAddress].isEntity = true;
        return mappedStructsEntityList.push(entityAddress) - 1;
    }

    function updateEntity(address entityAddress, uint entityData) public returns(bool success) {
        if(!isEntity(entityAddress)) revert();
        mappedStructsEntityStructs[entityAddress].entityData    = entityData;
        return true;
    }
}