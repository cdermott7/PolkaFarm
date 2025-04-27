// Script to deploy PolkaFarm contracts to Polkadot Asset Hub

async function main() {
  console.log("Deploying PolkaFarm contracts to Polkadot Asset Hub Westend...");

  // Get deployer account
  const [deployer] = await ethers.getSigners();
  console.log("Deploying contracts with account:", deployer.address);

  console.log("Account balance:", (await deployer.provider.getBalance(deployer.address)).toString());

  // Deploy Token contract
  const PolkaFarmToken = await ethers.getContractFactory("PolkaFarmToken");
  const token = await PolkaFarmToken.deploy();
  await token.waitForDeployment();

  console.log("PolkaFarmToken deployed to:", await token.getAddress());

  // Deploy Staking contract
  const PolkaFarmStaking = await ethers.getContractFactory("PolkaFarmStaking");
  
  // Parameters for the staking contract:
  // 1. Token address
  // 2. Reward rate: 1 token per block (1e18 in wei)
  // 3. Min stake duration: 10 blocks (for demo purposes)
  // 4. Early withdrawal penalty: 10%
  const staking = await PolkaFarmStaking.deploy(
    await token.getAddress(),
    ethers.parseEther("1.0"), // 1 token per block
    10, // 10 blocks minimum stake
    10  // 10% early withdrawal penalty
  );
  
  await staking.waitForDeployment();
  console.log("PolkaFarmStaking deployed to:", await staking.getAddress());

  // Transfer token ownership to staking contract
  console.log("Transferring token ownership to staking contract...");
  await token.transferOwnership(await staking.getAddress());
  console.log("Ownership transferred! Staking contract can now mint reward tokens.");

  console.log("Deployment complete!");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });