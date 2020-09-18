const Charitable = artifacts.require('Charitable');

module.exports = function(deployer, network, addresses) {
	deployer.deploy(Charitable, addresses.slice(2, 5));
};
