const Token = artifacts.require("MyToken");
const TokenSale = artifacts.require("MyTokenSale");
const KycContract = artifacts.require("KycContract");

//const { myToken } = require("./MyToken.test.js");
const chai = require("./setupchai.js");
const BN = web3.utils.BN;
const expect = chai.expect;

//require("dotenv").config({path: "../.env"});

//detach from our migration file
contract("MyTokenSale", async (accounts) => {

    const [deployerAccount, recipient, anotherAccount] = accounts;

    it("should not have any tokens in my deployerAccount", async () => {
        let instance = await Token.deployed();
        await expect(instance.balanceOf(deployerAccount)).to.eventually.be.a.bignumber.equal(new BN(0));

    })

    it("all tokens are in the tokensale", async () => {
        let instance = await Token.deployed();
        let balanceOfTokenSaleContract = await instance.balanceOf(TokenSale.address);
        let totalSupply = await instance.totalSupply();
        await expect(balanceOfTokenSaleContract).to.be.a.bignumber.equal(totalSupply);
    })

    it("should be possible to buy tokens", async () => {
        let tokenInstance = await Token.deployed();
        let tokenSaleInstance = await TokenSale.deployed();
        let kycInstance = await KycContract.deployed();
        let balanceBefore = await tokenInstance.balanceOf(deployerAccount);
        console.log(balanceBefore);

        await kycInstance.setKycCompleted(deployerAccount,{from : deployerAccount});

        //deployer account buy 1 token
        await expect(tokenSaleInstance.sendTransaction({from:deployerAccount, value: web3.utils.toWei("1","wei")})).to.be.fulfilled;
        // the total token of deployer account will be added one
        await expect(tokenInstance.balanceOf(deployerAccount)).to.eventually.be.bignumber.equal(balanceBefore.add(new BN(1)));

    });
});