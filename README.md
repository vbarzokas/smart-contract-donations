# Smart Contract Donations
A smart contract written in **Solidity**, that uses the **Ethereum** blockchain.
 
## Description
This is part of an exercise developed for the needs of the course _Decentralized Technologies_ during the MSc program of _[Data & Web Science](https://dws.csd.auth.gr/en/)_ at Aristotle University of Thessaloniki.

The smart contract's purpose is to facilitate donations to different charities. When a user wants to send some funds to a destination address, instead of sending them directly to that address, they will use the smart contract. 

A part of the funds will be sent to the charity the user specified, while the rest will go to the destination address.

For facilitating the transfer of funds, there exist two different variations of the same method. 
The users that want to donate, have to make their payments by sending funds to these methods.

* In the first variation, the method that facilitates the payments, accepts a destination address, as well as the index number of the charity (0 is the index for the first charity, 1 for the second etc). The method redirects _10%_ of the funds to the selected charity, while transferring the rest to the destination address. The contract makes appropriate checks if the user that originated the transfer has sufficient funds and if the charity index number that is provided is a valid one.
* In the second variation, the method additionally accepts a value for the donated amount (in _wei_). In addition to the checks that the previous variation performs, in this case, it also checks that the donated amount is within acceptable limits; a donation has to be at least 1% of the total transferred amount, while it cannot exceed half of the total transferred amount.

The contract keeps track of the total amount raised by all donations (in _wei_) and towards any charity, collectively, and provides that information to any interested party.

The contract also keeps track of the highest donation, identified by the sender's address, along with the amount donated. This information is available
only to the user that deployed the contract.

When a donation has been made through the contract, an event transmitting the address of the donor and the amount donated is emitted.

## Requirements
* [NodeJS](https://nodejs.org/en/) >=6.X
* [truffle](https://www.npmjs.com/package/truffle) NPM package installed globally - `npm install -g truffle`
* [ganache](https://github.com/trufflesuite/ganache/releases) - Recommended: the self-contained prebuilt Ganache binary for your platform of choice from the linked releases page, otherwise follow the official instructions to build your own. 

## Prerequisites
0. Make sure that you have _Ganache_ running in order to run a personal local Ethereum blockchain. For instructions check the official repository [here](https://github.com/trufflesuite/ganache) or the website [here](https://www.trufflesuite.com/ganache). Check the file _truffle-config.js_ to match the listening host and port and be able to run the migrations.

## Compiling

0. Compile the code using _truffle_:
    ```
    truffle compile
    ```
1. Run the required migrations:
    ```
    truffle migrate
    ```

## Running:
* Execute the provided tests:
    ```
    truffle test
    ```
  
* Manually test and experiment:
    0. Open a new _truffle_ CLI with:
        ```
        truffle console
        ```
    0. Retrieve your version of the binary and ABI snippets from the produced build on `build/contracts/Charitable.json`. These have been truncated in the following example for readability purposes:
     
        ```
        > web3.eth.getAccounts().then(a => myAccount=a[0]);
        > contractBin = '0x60806040523480<...TRUNCATED...>10b75dcbdaf0029';
        > contractAbi = [{"constant":false,<...TRUNCATED...>,"type":"fallback"}]
        > FaucetContract = new web3.eth.Contract(contractAbi);
        > web3.eth.estimateGas({data: contractBin});
        118191
        > web3.eth.getGasPrice();
        ‘20000000000’
        ```
