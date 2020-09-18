# Smart Contract Donations

An exercise I developed for the needs of the course _Decentralized Technologies_ during my MSc program on _[Data & Web Science](https://dws.csd.auth.gr/en/)_ at Aristotle University of Thessaloniki.
 
## Description
A smart contract written in **Solidity**, that uses the **Ethereum** blockchain.

The smart contract's purpose is to facilitate donations to different charities. When a user wants to send some funds to a destination address, instead of sending them directly to
that address, they will use the smart contract. 

A part of the funds will be sent to the charity the user specified, while the rest will go to the destination address.

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
1. Step 2 - Run the required migrations:
    ```
    truffle migrate
    ```

## Testing:
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
