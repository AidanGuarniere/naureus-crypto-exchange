// https://eth-ropsten.alchemyapi.io/v2/PmbWQwtjolRQEelk2sY82E6_SRUVshSD

require("@nomiclabs/hardhat-waffle");

module.exports = {
  solidity: "0.8.13",
  networks: {
    ropsten: {
      url: "https://eth-ropsten.alchemyapi.io/v2/PmbWQwtjolRQEelk2sY82E6_SRUVshSD",
      accounts: ["3617b8bb76df8692d6ae6de1e4567eced814129fc1ae58a9cd381a29b4c3877d"]
    }
  }
};
