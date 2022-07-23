// SPDX-License-Identifier: MIT
pragma solidity  ^0.8.13;

import "./CrowdSale.sol";
import "./KycContract.sol";

//Token sale owns the tokens, 
//when you send money in here, then it will transfer tokens from here to your address
contract MyTokenSale is Crowdsale {

    KycContract kyc;
    constructor(
        uint256 rate,    // rate in TKNbits  // how many wei to purchase a token
        address payable wallet,
        IERC20 token,
        KycContract _kyc
    )
        Crowdsale(rate, wallet, token)
        public
    {
        kyc = _kyc;
    }
        /**
     * @dev Validation of an incoming purchase. Use require statements to revert state when conditions are not met.
     * Use `super` in contracts that inherit from Crowdsale to extend their validations.
     * Example from CappedCrowdsale.sol's _preValidatePurchase method:
     *     super._preValidatePurchase(beneficiary, weiAmount);
     *     require(weiRaised().add(weiAmount) <= cap);
     * @param beneficiary Address performing the token purchase
     * @param weiAmount Value in wei involved in the purchase
     */
    function _preValidatePurchase(address beneficiary, uint256 weiAmount) internal view override {
        //run the parent class function
        super._preValidatePurchase(beneficiary,weiAmount);
        require(kyc.kycCompleted((msg.sender)),"KYC is not completed,the purchase is not allowed");
    }
}