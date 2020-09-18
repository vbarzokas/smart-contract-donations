const assert = require('assert').strict;

const Charitable = artifacts.require('Charitable');

contract('Charitable', (accounts) => {
	describe('deposit:', () => {
		// TODO add a test for the version of the function that does not expect a donation amount.
		it('Should properly deposit the donation and transfer amount '
				+ 'when the sender is specified, for a single transfer', async () => {
			const instance = await Charitable.deployed();

			// const addresses = await instance.getAddresses.call();
			// console.log('addresses: ' + JSON.stringify(addresses, null, 4));

			const balances ={
				before: {
					contract: await web3.eth.getBalance(instance.address),
					account0: await web3.eth.getBalance(accounts[0]),
					account1: await web3.eth.getBalance(accounts[1]),
					account5: await web3.eth.getBalance(accounts[5]),
				},
				after: {
					contract: null,
					account0: null,
					account1: null,
					account5: null
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
			assert.notEqual(balances.before.account5, balances.after.account5);
			assert.notEqual(balances.before.account1, balances.after.account1);
			assert.equal(Number(balances.after.account1), Number(balances.before.account1) + donationAmount);

			const totalDonationsAmount = await instance.getTotalDonationsAmount();
			assert.equal(Number(totalDonationsAmount), donationAmount)

			const highestDonationResults = await instance.getHighestDonation();
			const highestDonation = highestDonationResults[0];
			const highestDonor = highestDonationResults[1];

			assert.equal(Number(highestDonation), donationAmount);
			assert.equal(highestDonor, accounts[5]);
		});

		it('Should properly deposit the donation and transfer amount '
				+ 'when the sender is specified, for multiple transfers.', async () => {
			const instance = await Charitable.deployed();

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
			const charityIndex = 1;
			const transferAmount = Number(web3.utils.toWei('1', 'ether'));
			const donationAmount1 = transferAmount / 3;
			const donationAmount2 = transferAmount / 4;

			await instance.deposit(destinationAddress, charityIndex, donationAmount1.toString(), {
				value: transferAmount
			});

			await instance.deposit(destinationAddress, charityIndex, donationAmount2.toString(), {
				value: transferAmount
			});

			balances.after.contract = await web3.eth.getBalance(instance.address);
			balances.after.account0 = await web3.eth.getBalance(accounts[0]);
			balances.after.account1 = await web3.eth.getBalance(accounts[1]);

			assert.equal(balances.before.contract, balances.after.contract);
			assert.notEqual(balances.before.account0, balances.after.account0);
			assert.notEqual(balances.before.account1, balances.after.account1);
			assert.equal(Number(balances.after.account1), Number(balances.before.account1) + transferAmount * 2 -  (donationAmount1 + donationAmount2));

			const totalDonationsAmount = await instance.getTotalDonationsAmount();
			assert.equal(Number(totalDonationsAmount), 833333333333333200)

			const highestDonationResults = await instance.getHighestDonation();
			const highestDonation = highestDonationResults[0];
			const highestDonor = highestDonationResults[1];

			assert.equal(Number(highestDonation), 333333333333333300);
			assert.equal(highestDonor, accounts[0]);

			// await instance.destroy.call();
			//
			// const highestDonationResults2 = await instance.getHighestDonation.call();
			//
			// console.log('highestDonation: ' + highestDonationResults2[0]);
			// console.log('highestDonor: ' + highestDonationResults2[1]);
		})
	});
});
