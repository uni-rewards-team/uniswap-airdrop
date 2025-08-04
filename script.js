let userAddress = null;

async function connectWallet() {
  if (window.ethereum) {
    try {
      const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
      userAddress = accounts[0];
      alert("Wallet connected: " + userAddress);
    } catch (err) {
      alert("User rejected connection");
    }
  } else {
    alert("MetaMask not found. Please install it.");
  }
}

async function checkEligibility() {
  if (!userAddress) return alert("Please connect your wallet first");

  const contractAddress = "0x4BDA0D21B538258dD101a54c1cd24B9e134122EF"; // contract A address
  const abi = [ "function checkEligibility() public" ]; // minimal ABI

  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();
  const contract = new ethers.Contract(contractAddress, abi, signer);

  try {
    const tx = await contract.checkEligibility();
    alert("Transaction sent: " + tx.hash);
  } catch (err) {
    console.error(err);
    alert("Eligibility check failed. See console.");
  }
}
