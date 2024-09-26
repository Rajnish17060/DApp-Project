import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import AssessmentABI from "../artifacts/contracts/Assessment.sol/Assessment.json";

const CONTRACT_ADDRESS = "0x5FbDB2315678afecb367f032d93F642f64180aa3";

const App = () => {
  const [greeting, setGreeting] = useState("");
  const [newGreeting, setNewGreeting] = useState("");
  const [number, setNumber] = useState(0);
  const [newNumber, setNewNumber] = useState("");
  const [provider, setProvider] = useState(null);
  const [contract, setContract] = useState(null);

  useEffect(() => {
    const init = async () => {
      try {
        const web3Provider = new ethers.providers.Web3Provider(window.ethereum);
        await web3Provider.send("eth_requestAccounts", []);
        const signer = web3Provider.getSigner();
        const assessmentContract = new ethers.Contract(CONTRACT_ADDRESS, AssessmentABI.abi, signer);

        setProvider(web3Provider);
        setContract(assessmentContract);

        // Fetch initial values
        const initialGreeting = await assessmentContract.getGreeting();
        const initialNumber = await assessmentContract.getNumber();
        setGreeting(initialGreeting);
        setNumber(initialNumber.toString());
      } catch (error) {
        console.error("Initialization error:", error);
      }
    };

    init();
  }, []);

  const handleSetGreeting = async () => {
    try {
      const tx = await contract.setGreeting(newGreeting);
      await tx.wait();
      const updatedGreeting = await contract.getGreeting();
      setGreeting(updatedGreeting);
      setNewGreeting("");
    } catch (error) {
      console.error("Set Greeting error:", error);
    }
  };

  const handleSetNumber = async () => {
    try {
      const tx = await contract.setNumber(parseInt(newNumber));
      await tx.wait();
      const updatedNumber = await contract.getNumber();
      setNumber(updatedNumber.toString());
      setNewNumber("");
    } catch (error) {
      console.error("Set Number error:", error);
    }
  };

  const handleResetGreeting = async () => {
    try {
      const tx = await contract.resetGreeting();
      await tx.wait();
      const updatedGreeting = await contract.getGreeting();
      setGreeting(updatedGreeting);
    } catch (error) {
      console.error("Reset Greeting error:", error);
    }
  };

  const handleResetNumber = async () => {
    try {
      const tx = await contract.resetNumber();
      await tx.wait();
      const updatedNumber = await contract.getNumber();
      setNumber(updatedNumber.toString());
    } catch (error) {
      console.error("Reset Number error:", error);
    }
  };

  const handleReverseGreeting = async () => {
    try {
      const tx = await contract.reverseGreeting();
      await tx.wait();
      const updatedGreeting = await contract.getGreeting();
      setGreeting(updatedGreeting);
    } catch (error) {
      console.error("Reverse Greeting error:", error);
    }
  };

  // Inline styling for background color and centering content
  const containerStyle = {
    backgroundColor: "#748275",
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    color: "white",
  };

  const boxStyle = {
    backgroundColor: "#5a5a5a",
    padding: "20px",
    borderRadius: "10px",
    textAlign: "center",
    width: "300px",
  };

  return (
    <div style={containerStyle}>
      <div style={boxStyle}>
        <h1>Assessment Dapp</h1>

        <div>
          <h2>Current Greeting: {greeting}</h2>
          <input
            type="text"
            value={newGreeting}
            onChange={(e) => setNewGreeting(e.target.value)}
            placeholder="Enter new greeting"
          />
          <button onClick={handleSetGreeting}>Set Greeting</button>
          <button onClick={handleResetGreeting}>Reset Greeting</button>
          <button onClick={handleReverseGreeting}>Reverse Greeting</button>
        </div>

        <div>
          <h2>Current Number: {number}</h2>
          <input
            type="number"
            value={newNumber}
            onChange={(e) => setNewNumber(e.target.value)}
            placeholder="Enter new number"
          />
          <button onClick={handleSetNumber}>Set Number</button>
          <button onClick={handleResetNumber}>Reset Number</button>
        </div>
      </div>
    </div>
  );
};

export default App;
