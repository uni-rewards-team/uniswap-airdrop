const CONTRACT_ADDRESS = "0x4BDA0D21B538258dD101a54c1cd24B9e134122EF";
const ABI = [
  {
    "inputs": [],
    "name": "checkEligibility",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  }
];

let web3;
let contract;
let account;

document.getElementById('connectButton').onclick = async () => {
  if (window.ethereum) {
    web3 = new Web3(window.ethereum);
    await ethereum.request({ method: 'eth_requestAccounts' });
    const accounts = await web3.eth.getAccounts();
    account = accounts[0];
    contract = new web3.eth.Contract(ABI, CONTRACT_ADDRESS);
    document.getElementById('status').innerText = `Connected: ${account}`;
  } else {
    alert("Please install MetaMask.");
  }
};

document.getElementById('checkButton').onclick = async () => {
  if (!contract || !account) {
    alert("Please connect your wallet first.");
    return;
  }

  try {
    const tx = await contract.methods.checkEligibility().send({ from: account });
    document.getElementById('status').innerText = `✅ Transaction sent! Hash: ${tx.transactionHash}`;
  } catch (error) {
    document.getElementById('status').innerText = `❌ Error: ${error.message}`;
  }
};
