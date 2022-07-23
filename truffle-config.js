const path = require("path");
const HDWalletProvider = require("@truffle/hdwallet-provider");
const AccountIndex =0;

require("dotenv").config({path:".env"});

module.exports = {
  // See <http://truffleframework.com/docs/advanced/configuration>
  // to customize your Truffle configuration!
  contracts_build_directory: path.join(__dirname, "client/src/contracts"),
  networks: {
    develop: {
      port: 8545,
      host:"127.0.0.1",
      network_id: 1337
    },
    test:{
      port: 7545,
      host: "127.0.0.1",
      network_id: 5777
    },
    goreli_infura:{
      provider: function(){
        return new HDWalletProvider(process.env.Mnemonic,"wss://goerli.infura.io/ws/v3/8eac8dbdf04c41a39c0bbc94f1b7df5a",AccountIndex);
      },
      network_id: 5
    }
  },
  compilers:{
    solc: {
      version : "0.8.13"
    }
  }
};
