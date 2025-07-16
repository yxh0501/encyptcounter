import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import Counter from './components/Counter';
import './App.css';

function App() {
  const [provider, setProvider] = useState(null);
  const [signer, setSigner] = useState(null);
  const [contract, setContract] = useState(null);
  const [account, setAccount] = useState(null);

  // 替换为你的合约地址和 ABI
  const contractAddress = "YOUR_CONTRACT_ADDRESS";
  const contractABI = [
    // 从编译后的 EncryptedCounter.json 获取 ABI
    // 示例 ABI 片段
    "function incrementCounter() external",
    "function decrementCounter() external",
    "function decryptCounter() external",
    "function getCounterValue() external view returns (uint256)"
  ];

  useEffect(() => {
    const init = async () => {
      if (window.ethereum) {
        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();
        const contract = new ethers.Contract(contractAddress, contractABI, signer);
        const accounts = await provider.listAccounts();
        setProvider(provider);
        setSigner(signer);
        setContract(contract);
        setAccount(accounts[0]);
      } else {
        alert("Please install MetaMask!");
      }
    };
    init();
  }, []);

  return (
    <div className="App">
      <h1>FHEVM Encrypted Counter DApp</h1>
      {account ? (
        <Counter contract={contract} account={account} />
      ) : (
        <p>Connecting to wallet...</p>
      )}
    </div>
  );
}

export default App;
