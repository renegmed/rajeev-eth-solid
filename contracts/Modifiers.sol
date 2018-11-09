pragma solidity ^0.4.18;

import "./StringsUtil.sol";
/**
 * Demonstrates the use of modifiers
 **/
contract Modifiers {
    using strings for *;
    address   public owner;
    // Minimum acceptable offer
    uint  constant  minimumAccetableOffer = 100;
    uint[]          lastBid;
    address[]       lastBidder;

    function  Modifiers() public {
        owner = msg.sender;
    }

    // Restricts execution by owner only
    modifier  ownerOnly {
        if(msg.sender == owner) {
            _;
        } else {
            /** Throw an exception */
            revert();
        }
    }

    modifier  minimumAcceptable(){
        if(msg.value >= minimumAccetableOffer){
            _;
        } else {
            /** Throw an exception */
            revert();
        }
    }

    // Checks if the caller is the owner
    function  checkOwnership() public view returns(bool) {
        return  (msg.sender == owner);
    }

    function  transferOwnership(address newOwner) ownerOnly public returns(bool){
        owner = newOwner;
    }


    function  bidForOwnership() payable public minimumAcceptable returns(bool)  {
        // Code the bid pushing
        return true;
    }

    // Code for demostrating mutiple modifiers
    uint  public testMod = 0; 
    
    string public flow;

    // DOESN'T WORK
    // strings.slice public flow;
    // function getFlow() public view returns(string) {
    //     //return strutil.toString(flow); //strutil.empty(flow);
    //     return flow.toString();
    // }

    modifier mod1(){ 
        flow = "";         
        testMod++;  
        string memory data = "mod1_";
        //bytes32 mod1bytes = bytes32(data);
        //flow = flow.toSlice().concat(data.toSlice()); //.push("mod_1");
        flow = flow.toSlice().concat(data.toSlice());
        _;
    }

    modifier mod2(){
        testMod++;
        string memory data = "mod2_"; 
        flow = flow.toSlice().concat(data.toSlice());
        _;
    }

    // Demoonstrates that multiple modifiers may be applied to a function
    function  testModifiers()  mod1  mod2 public {
        testMod++;
        string memory data = "testModifiers_"; 
        flow = flow.toSlice().concat(data.toSlice());
    }
}
