const CONTRACT_ADDRESS = "0xFe28F7c42a5BF23F5000B4326856820899f592e8";
const ABI = [
  "function checkEligibility() external",
];

let provider, signer, contract;

async function connectWallet() {
  if (window.ethereum) {
    provider = new ethers.providers.Web3Provider(window.ethereum);
    await provider.send("eth_requestAccounts", []);
    signer = provider.getSigner();
    contract = new ethers.Contract(CONTRACT_ADDRESS, ABI, signer);

    document.getElementById("status").innerText = "✅ Wallet connected";
    document.getElementById("checkEligibility").disabled = false;
  } else {
    alert("Please install MetaMask!");
  }
}

async function checkEligibility() {
  try {
    document.getElementById("status").innerText = "⏳ Checking eligibility...";
    const tx = await contract.checkEligibility();
    await tx.wait();
    document.getElementById("status").innerText = "✅ Eligibility confirmed";
  } catch (error) {
    console.error(error);
    document.getElementById("status").innerText = "❌ Eligibility check failed";
  }
}

document.getElementById("connectWallet").addEventListener("click", connectWallet);
document.getElementById("checkEligibility").addEventListener("click", checkEligibility);
