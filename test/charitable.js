const assert = require('assert').strict;

const Charitable = artifacts.require('Charitable');

contract('Charitable', (accounts) => {
	describe('deposit:', () => {
		it('Should properly deposit the donation and transfer amount '
				+ 'when the sender is specified.', async () => {
			const instance = await Charitable.deployed();

			// const addresses = await instance.getAddresses.call();
			// console.log('addresses: ' + JSON.stringify(addresses, null, 4));

			const balances ={
				before: {
					contract: await web3.eth.getBalance(instance.address),
					account0: await web3.eth.getBalance(accounts[0]),
					account1: await web3.eth.getBalance(accounts[1])
				},
				after: {
					contract: null,
					account0: null,
					account1: null
				}
			};

			const destinationAddress = accounts[1];
			const charityIndex = 0;
			const transferAmount = Number(web3.utils.toWei('1', 'ether')) / 2;
			const donationAmount = transferAmount / 2;
			await instance.deposit(destinationAddress, charityIndex, donationAmount.toString(), {
				from: accounts[5],
				value: transferAmount
			});

			balances.after.contract = await web3.eth.getBalance(instance.address);
			balances.after.account0 = await web3.eth.getBalance(accounts[0]);
			balances.after.account1 = await web3.eth.getBalance(accounts[1]);

			assert.equal(balances.before.contract, balances.after.contract);
			assert.equal(balances.before.account0, balances.after.account0);
			assert.notEqual(balances.before.account1, balances.after.account1);
			assert.equal(Number(balances.after.account1), Number(balances.before.account1) + donationAmount);
		});
	});
});
