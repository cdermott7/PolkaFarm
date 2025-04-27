# PolkaFarm: DeFi Yield Farming on Polkadot Asset Hub

PolkaFarm is a decentralized yield farming application built on Polkadot Asset Hub. It allows users to stake WND tokens (native token of Westend testnet) and earn PLKF reward tokens. This project demonstrates a DeFi primitive on Polkadot's new smart contract platform.

## Features

- Stake native WND tokens to earn PLKF rewards
- Early withdrawal penalty to incentivize longer staking periods
- Simple, clean UI for staking, withdrawing, and claiming rewards
- Light and dark mode support for better user experience
- Fully built on Polkadot Asset Hub using Solidity

## Smart Contracts

- `PolkaFarmToken.sol`: ERC-20 token for rewards (PLKF)
- `PolkaFarmStaking.sol`: Staking contract that handles deposits, withdrawals, and reward distribution

## Getting Started

### Prerequisites

- Node.js and npm installed
- MetaMask browser extension
- Basic knowledge of DeFi and blockchain concepts

### Installation

1. Clone the repository
```bash
git clone https://github.com/yourusername/polkafarm.git
cd polkafarm
```

2. Install dependencies
```bash
npm install
```

3. Compile the smart contracts
```bash
npm run build
```

### Deployment

1. Create a `.env` file in the root directory with your private key:
```
PRIVATE_KEY=your_private_key_here
```

2. Deploy to Polkadot Asset Hub Westend testnet
```bash
npm run deploy
```

3. Update the contract addresses in the frontend:
After deployment, copy the deployed contract addresses and update them in `frontend/src/App.js`:
```javascript
const STAKING_CONTRACT_ADDRESS = "your_deployed_staking_contract_address";
const TOKEN_CONTRACT_ADDRESS = "your_deployed_token_contract_address";
```

#### Important Note About Contract Mappings

The current contract has a private mapping for staked balances:
```solidity
mapping(address => uint256) s; // staked WND
```

For future deployments, consider making this public for easier frontend integration:
```solidity
mapping(address => uint256) public s; // staked WND
```

### Running the Frontend

You can run the frontend directly from the root directory:

```bash
npm run frontend
```

Or manually:

1. Navigate to the frontend directory
```bash
cd frontend
```

2. Install frontend dependencies
```bash
npm install
```

3. Start the development server
```bash
npm start
```

4. Open your browser and navigate to `http://localhost:3000`

### UI Features

- **Dark Mode**: Toggle between light and dark mode using the switch in the header
- The app remembers your theme preference using local storage

### Known Issues and Workarounds

- **Staked Balance**: Due to the `s` mapping being private in the deployed contract, the frontend uses a workaround to estimate staked balances. This may require manual configuration for each user. In `App.js`, update the `estimateStakedBalance` function with your actual staked amount.
- The recommended solution for future deployments is to make the `s` mapping public in the contract.

## Interacting with PolkaFarm

1. Connect your MetaMask wallet to the Polkadot Asset Hub Westend testnet:
   - Network Name: Asset-Hub Westend Testnet
   - RPC URL: https://westend-asset-hub-eth-rpc.polkadot.io
   - Chain ID: 420420421
   - Currency Symbol: WND
   - Block Explorer URL: https://assethub-westend.subscan.io

2. Get test WND tokens from the [Westend Faucet](https://app.element.io/#/room/#westend_faucet:matrix.org)

3. Use the UI to stake your WND tokens, check your pending rewards, and withdraw when ready

## Testing

```bash
npm test
```

## Architecture

PolkaFarm uses a MasterChef-inspired reward distribution mechanism:

1. Users stake WND (native token) in the staking contract
2. The contract tracks stake amounts and block numbers
3. Rewards accrue proportionally to stake amounts
4. The staking contract mints PLKF tokens as rewards

### How the Smart Contracts Work

#### PolkaFarmToken Contract

The PLKF reward token is a minimal ERC-20 implementation with these key features:
- Standard ERC-20 functionality (transfer, balanceOf, approve, transferFrom)
- Minting capability restricted to the contract owner
- Ownership pattern for administrative control

```solidity
// Token contract simplified explanation
contract PolkaFarmToken {
    // ERC-20 Standard properties
    string public constant name = "PolkaFarm Token";
    string public constant symbol = "PLKF";
    uint8 public constant decimals = 18;
    uint256 public totalSupply;
    mapping(address => uint256) public balanceOf;
    mapping(address => mapping(address => uint256)) public allowance;
    
    // Owner address for minting authorization
    address public owner;
    
    // Only the owner can mint new tokens
    function mint(address to, uint256 amount) external onlyOwner {
        totalSupply += amount;
        balanceOf[to] += amount;
        emit Transfer(address(0), to, amount);
    }
    
    // Standard ERC-20 functions (transfer, approve, transferFrom)
    // ...
}
```

#### PolkaFarmStaking Contract

The staking contract manages WND deposits and PLKF rewards with these key functions:
- `stake()`: Allows users to stake WND tokens
- `exit()`: Allows users to withdraw their staked WND and claim rewards
- Block-based reward calculation using accumulator pattern

```solidity
// Staking contract simplified explanation
contract PolkaFarmStaking {
    IReward public token;   // PLKF token for rewards
    uint256 public rate;    // PLKF rewards per block
    uint256 public lastB;   // Last block updated
    uint256 public acc;     // Accumulated rewards per token
    uint256 public total;   // Total WND staked
    
    mapping(address => uint256) s; // Staked WND per user
    mapping(address => uint256) d; // Reward debt per user
    
    // Internal function to update accumulated rewards
    function _u() internal {
        // Updates the reward accumulator based on blocks passed
        // ...
    }
    
    // User stakes WND tokens
    function stake() external payable {
        // Update rewards
        // Claim any pending rewards
        // Increase user's stake
        // ...
    }
    
    // User withdraws WND tokens and claims rewards
    function exit() external {
        // Update rewards
        // Calculate pending rewards
        // Return staked WND
        // Mint reward tokens
        // ...
    }
}
```

The reward calculation uses the "reward debt" pattern, where:
1. Each time rewards are calculated, the global accumulator increases
2. User rewards are the difference between what they're owed now and what they've already claimed
3. This method ensures correct reward distribution even with varying stake amounts over time

### Deployed Contracts on Asset Hub Westend

The contracts are deployed on the Polkadot Asset Hub Westend testnet:

**PolkaFarmToken Contract:**
- Address: `0xeb3f68def0a92755f12afbc78c7c091882008481`
- [View on Asset Hub Westend Explorer](https://assethub-westend.subscan.io/account/0xeb3f68def0a92755f12afbc78c7c091882008481)

**PolkaFarmStaking Contract:**
- Address: `0x54c27ad8a9a35902b304c1ddda79711f23d1dd48`
- [View on Asset Hub Westend Explorer](https://assethub-westend.subscan.io/account/0x54c27ad8a9a35902b304c1ddda79711f23d1dd48)

The early withdrawal penalty feature encourages users to keep their funds staked longer, creating more stability in the protocol.

### Canva Slides Detailing PolkaFarm
- [Slides](https://www.canva.com/design/DAGl07wuLOQ/xmXWpNqKpS4aDNuEoREmpg/edit?utm_content=DAGl07wuLOQ&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton)

## License

This project is licensed under the MIT License - see the LICENSE file for details.
