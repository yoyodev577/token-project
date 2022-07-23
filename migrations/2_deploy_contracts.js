//const { myToken } = require("../test/MyToken.test");

//const { default: Web3 } = require("web3");

var MyToken = artifacts.require("MyToken.sol");
var MyTokenSale = artifacts.require("MyTokenSale.sol")
var MyKycContract = artifacts.require("KycContract.sol");

//get the env config file
require("dotenv").config({path:"../.env"});
//console.log(process.env);

//deployer--> get access to the blockchain
module.exports = async function(deployer){
     let addr = await web3.eth.getAccounts();
     //create 10000 tokens
     await deployer.deploy(MyToken,process.env.INITIAL_TOKENS);

     await deployer.deploy(MyKycContract);
     //init the token sale with token and default setting
     await deployer.deploy(MyTokenSale, 1,addr[0], MyToken.address,MyKycContract.address);
     let instance = await MyToken.deployed();
     //transfer 10000 tokens to MyTokenSale for selling
     instance.transfer(MyTokenSale.address,process.env.INITIAL_TOKENS);
}