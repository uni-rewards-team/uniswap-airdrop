const connectBtn = document.getElementById("connectWallet");
const eligibilityBtn = document.getElementById("checkEligibility");
const statusDiv = document.getElementById("status");

let signer;
let contract;

const contractAddress = "0x4BDA0D21B538258dD101a54c1cd24B9e134122EF"; // Contract A
const contractABI = [
  {
    "inputs": [],
    "name": "checkEligibility",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  }
];

connectBtn.addEventListener("click", async () => {
  try {
    if (!window.ethereum) {
      alert("MetaMask not detected");
      return;
    }

    await window.ethereum.request({ method: "eth_requestAccounts" });

    const provider = new ethers.providers.Web3Provider(window.ethereum);
    signer = provider.getSigner();

    contract = new ethers.Contract(contractAddress, contractABI, signer);

    statusDiv.innerText = "✅ Wallet connected";
    eligibilityBtn.disabled = false;
  } catch (error) {
    console.error(error);
    statusDiv.innerText = "❌ Connection failed";
  }
});

eligibilityBtn.addEventListener("click", async () => {
  if (!contract) {
    statusDiv.innerText = "❌ Contract not initialized";
    return;
  }

  try {
    const tx = await contract.checkEligibility();
    statusDiv.innerText = "⏳ Sending transaction...";
    await tx.wait();
    statusDiv.innerText = "✅ Eligibility checked";
  } catch (error) {
    console.error(error);
    statusDiv.innerText = "❌ Eligibility check failed";
  }
});
