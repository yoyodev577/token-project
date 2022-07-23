"use strict";
var chai = require("chai");
//const { default: chaiBn } = require("chai-bn");
const web3 = require("web3");
const BN = web3.utils.BN;
const chaiBN = require("chai-bn")(BN);
chai.use(chaiBN);

var chaiAsPromised = require("chai-as-promised");
chai.use(chaiAsPromised);

module.exports = chai;