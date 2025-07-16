// SPDX-License-Identifier: BSD-3-Clause-Clear
pragma solidity ^0.8.19;

import "fhevm/lib/TFHE.sol";

contract EncryptedCounter {
    address public owner;
    euint32 private counter; // 加密的计数器值
    euint32 private lastDecryptedCounter; // 最后解密的计数器值
    euint32 private step; // 加密的步长值

    // 仅限拥有者访问的修饰符
    modifier onlyOwner() {
        require(msg.sender == owner, "Only the owner can access this function");
        _;
    }

    // 构造函数：初始化加密计数器
    constructor(uint32 initialValue) {
        owner = msg.sender;
        counter = TFHE.asEuint32(initialValue); // 加密初始值
        TFHE.allowThis(counter); // 允许合约操作加密值
        step = TFHE.asEuint32(1); // 加密步长为 1
        TFHE.allowThis(step); // 允许合约操作步长
    }

    // 增加计数器
    function incrementCounter() external onlyOwner {
        counter = TFHE.add(counter, step); // 加密加法
        TFHE.allowThis(counter);
    }

    // 减少计数器
    function decrementCounter() external onlyOwner {
        counter = TFHE.sub(counter, step); // 加密减法
        TFHE.allowThis(counter);
    }

    // 解密计数器值（仅限拥有者）
    function decryptCounter() external onlyOwner {
        lastDecryptedCounter = counter;
        TFHE.decrypt(lastDecryptedCounter); // 触发解密
    }

    // 获取解密的计数器值
    function getCounterValue() external view onlyOwner returns (uint256) {
        (uint256 value, bool decrypted) = TFHE.getDecryptResultSafe(lastDecryptedCounter);
        require(decrypted, "Value is not ready");
        return value;
    }
}
