// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

// Minimal reward‐token interface; your PLKF must have this mint()
interface IReward { 
    function mint(address to, uint256 amt) external; 
}

/// @notice PolkaFarmStaking – bare‐bones staking + rewards + full‐withdraw exit
contract PolkaFarmStaking {
    IReward public token;   // PLKF minter
    uint256 public rate;    // PLKF per block
    uint256 public lastB;   // last block
    uint256 public acc;     // acc reward×1e18 per WND
    uint256 public total;   // total WND staked

    mapping(address => uint256) s; // staked WND
    mapping(address => uint256) d; // reward debt

    constructor(address _t, uint256 _r) {
        token = IReward(_t);
        rate  = _r;
        lastB = block.number;
    }

    function _u() internal {
        uint256 b = block.number;
        if (b <= lastB || total == 0) { lastB = b; return; }
        uint256 blocks = b - lastB;
        acc += (blocks * rate * 1e18) / total;
        lastB = b;
    }

    /// @notice Stake native WND
    function stake() external payable {
        require(msg.value > 0);
        _u();
        uint256 q = s[msg.sender];
        if (q > 0) {
            uint256 owed = (q * acc) / 1e18 - d[msg.sender];
            if (owed > 0) token.mint(msg.sender, owed);
        }
        s[msg.sender] = q + msg.value;
        total += msg.value;
        d[msg.sender] = (s[msg.sender] * acc) / 1e18;
    }

    /// @notice Withdraw your entire WND stake + rewards
    function exit() external {
        _u();
        uint256 q = s[msg.sender];
        require(q > 0);
        total -= q;
        uint256 owed = (q * acc) / 1e18 - d[msg.sender];

        // send back WND
        (bool ok, ) = msg.sender.call{value: q}("");
        require(ok);

        if (owed > 0) token.mint(msg.sender, owed);

        // reset user
        s[msg.sender] = 0;
        d[msg.sender] = 0;
    }
}
