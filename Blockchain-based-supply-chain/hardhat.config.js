require("@nomicfoundation/hardhat-toolbox");
require('dotenv').config();
require("./tasks/blocknumber");

/** @type import('hardhat/config').HardhatUserConfig */
const SEPOLIA_RPC_URL=process.env.SEPOLIA_RPC_URL;
const SEPOLIA_PRIVATE_KEY=process.env.SEPOLIA_PRIVATE_KEY;
const ETHERSCAN_API_KEY=process.env.ETHERSCAN_API_KEY;
module.exports = {
  solidity: "0.8.8",
  networks:{
    sepolia:{
      url:SEPOLIA_RPC_URL,
      accounts:[SEPOLIA_PRIVATE_KEY],
      chainID:11155111
    }
  },
  etherscan:{
    apiKey:ETHERSCAN_API_KEY
  }
};
