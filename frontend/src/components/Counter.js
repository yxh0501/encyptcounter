import React, { useState } from 'react';

function Counter({ contract, account }) {
  const [counterValue, setCounterValue] = useState(null);
  const [loading, setLoading] = useState(false);

  const increment = async () => {
    setLoading(true);
    try {
      const tx = await contract.incrementCounter();
      await tx.wait();
      alert("Counter incremented!");
    } catch (error) {
      console.error(error);
      alert("Error incrementing counter");
    }
    setLoading(false);
  };

  const decrement = async () => {
    setLoading(true);
    try {
      const tx = await contract.decrementCounter();
      await tx.wait();
      alert("Counter decremented!");
    } catch (error) {
      console.error(error);
      alert("Error decrementing counter");
    }
    setLoading(false);
  };

  const decrypt = async () => {
    setLoading(true);
    try {
      const tx = await contract.decryptCounter();
      await tx.wait();
      const value = await contract.getCounterValue();
      setCounterValue(value.toString());
      alert("Counter decrypted!");
    } catch (error) {
      console.error(error);
      alert("Error decrypting counter");
    }
    setLoading(false);
  };

  return (
    <div>
      <h2>Account: {account}</h2>
      <button onClick={increment} disabled={loading}>Increment</button>
      <button onClick={decrement} disabled={loading}>Decrement</button>
      <button onClick={decrypt} disabled={loading}>Decrypt Counter</button>
      {counterValue && <p>Counter Value: {counterValue}</p>}
      {loading && <p>Loading...</p>}
    </div>
  );
}

export default Counter;
