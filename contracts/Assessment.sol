// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Assessment {
    string public greeting;
    uint256 public number;

    // Constructor to set initial values
    constructor(string memory _greeting, uint256 _number) {
        greeting = _greeting;
        number = _number;
    }

    // Function to update the greeting
    function setGreeting(string memory _newGreeting) public {
        greeting = _newGreeting;
    }

    // Function to update the number
    function setNumber(uint256 _newNumber) public {
        number = _newNumber;
    }

    // Function to retrieve the number
    function getNumber() public view returns (uint256) {
        return number;
    }

    // Function to retrieve the greeting
    function getGreeting() public view returns (string memory) {
        return greeting;
    }

    // Function to reset the greeting to a default value
    function resetGreeting() public {
        greeting = "";  // Default greeting
    }

    // Function to reset the number to 0
    function resetNumber() public {
        number = 0;  // Reset number to 0
    }

    // Function to reverse the greeting string
    function reverseGreeting() public {
    bytes memory str = bytes(greeting);  // Convert string to bytes
    uint256 len = str.length;
    
    for (uint256 i = 0; i < len / 2; i++) {
        bytes1 temp = str[i];  
        str[i] = str[len - i - 1];
        str[len - i - 1] = temp;
    }
    
    greeting = string(str);  // Convert bytes back to string
}


    // Optional fallback function
    fallback() external payable {
        // Handle unexpected calls
    }
}
