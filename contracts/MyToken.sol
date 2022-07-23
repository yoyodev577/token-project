// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract MyToken is ERC20 {
    constructor(uint256 initialSupply) ERC20("StarBucks", "STAR") {
        //pre-minted tokens from message sender 
        _mint(msg.sender, initialSupply);
    }
}
