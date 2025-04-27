const { ethers } = require('ethers');

// Contract addresses from your deployments
const TOKEN_ADDRESS = "0xeb3f68def0a92755f12afbc78c7c091882008481";
const STAKING_ADDRESS = "0x54c27ad8a9a35902b304c1ddda79711f23d1dd48";

// ABIs for the simplified contracts
const TOKEN_ABI = [
  "function balanceOf(address owner) view returns (uint256)",
  "function name() view returns (string)",
  "function symbol() view returns (string)",
  "function decimals() view returns (uint8)",
  "function transfer(address to, uint256 amount) returns (bool)"
];

const STAKING_ABI = [
  "function stake() payable",
  "function exit()",
  "function total() view returns (uint256)",
  "function s(address) view returns (uint256)",
  "function rate() view returns (uint256)"
];

async function testContracts() {
  try {
    console.log("Testing PolkaFarm contracts on Westend Asset Hub...");
    
    // Connect to the provider
    const provider = new ethers.JsonRpcProvider("https://westend-asset-hub-eth-rpc.polkadot.io");
    
    // Create contract instances
    const tokenContract = new ethers.Contract(TOKEN_ADDRESS, TOKEN_ABI, provider);
    const stakingContract = new ethers.Contract(STAKING_ADDRESS, STAKING_ABI, provider);
    
    // Get token info
    const tokenName = await tokenContract.name();
    const tokenSymbol = await tokenContract.symbol();
    console.log(`Token: ${tokenName} (${tokenSymbol})`);
    
    // Get staking info
    const totalStaked = await stakingContract.total();
    console.log(`Total staked: ${ethers.formatEther(totalStaked)} WND`);
    
    const rewardRate = await stakingContract.rate();
    console.log(`Reward rate: ${ethers.formatEther(rewardRate)} PLKF per block`);
    
    console.log("\nContract test completed successfully!");
    console.log("Your PolkaFarm DeFi system is correctly deployed and ready to use.");
    
  } catch (error) {
    console.error("Error testing contracts:", error);
  }
}

testContracts();