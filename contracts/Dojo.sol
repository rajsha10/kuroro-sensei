// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

interface IERC20 {
    function transferFrom(address sender, address recipient, uint256 amount) external returns (bool);
}

contract StartLearning {
    address public owner;
    IERC20 public eduToken;
    uint256 public fee = 100000000000000; // 0.1 EDU (with 15 decimals)

    event LearningStarted(address indexed user, bytes32 txHash);

    constructor(address _eduToken) {
        owner = msg.sender;
        eduToken = IERC20(_eduToken);
    }

    function startLearning() external {
        require(eduToken.transferFrom(msg.sender, owner, fee), "EDU transfer failed");
        emit LearningStarted(msg.sender, keccak256(abi.encodePacked(block.timestamp, msg.sender, block.number)));
    }
}
