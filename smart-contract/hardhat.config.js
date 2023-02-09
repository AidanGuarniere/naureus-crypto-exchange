require("@nomiclabs/hardhat-waffle");

module.exports = {
  solidity: "0.8.13",
  networks: {
    goerli: {
      url: "https://eth-goerli.g.alchemy.com/v2/vIVzaVXmu8suJgtJ12Ph4c9qAbdL8fO_",
      accounts: ["3617b8bb76df8692d6ae6de1e4567eced814129fc1ae58a9cd381a29b4c3877d"]
    }
  }
};
