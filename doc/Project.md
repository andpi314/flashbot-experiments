# Flashbot experiments

A collection of experimental code to interact with Ethereum network and play with Flashbot API using some Smart Contracts.

Why to use Flashbots:

- Revert protection
- Privacy improvements

## Experiment 1: Waste Gas

In order for a bundle of transactions to be included in a block, the Flashbots relay checks wether is 'profitable enough' or not. So to trigger the relay we need to fool the relay creating a smart contract that simply waste some gas.

- [x] Level 1: Create & Deploy a simple smart contract (on Goerli\*) to waste all the gas from an incoming transaction so that it can be picked up by Flashbot's miners
- [x] Level 2: Create a simple script which interacts with the just created Smart Contract to check everything is up and running

\*Flashbots operates a Goerli validator and searchers can test Flashbots by using it

### Level 1: Create the contract

`GasBurner.sol` - This contract enable testing Flashbots with a single transaction that will consume transaction's gas limit. As of November 2021, any transaction that consume less than 42,000 gas (gas floor) is rejected by Flashbot's relay [documentation](https://docs.flashbots.net/flashbots-protect/rpc/quick-start/#key-considerations)

Level passed: Contract deployed on Goerli at: [0x002671734547B8B7fc24C2Fbaee5CA65c375Ee7F](https://goerli.etherscan.io/address/0x002671734547B8B7fc24C2Fbaee5CA65c375Ee7F#code)

### Level 2: Create the script / bot

Define a simple script to send a bundle of transaction to the Flashbot relay in order to call the `GasBurner.sol` contract and waste some gas.

Level passed: Transaction successfully executed on chain [0x9f37f787b987c9cb8e91f85f2f57af6087fbc29706f3f3cf92db8320f2de1842](https://goerli.etherscan.io/tx/0x9f37f787b987c9cb8e91f85f2f57af6087fbc29706f3f3cf92db8320f2de1842) wasting 5,000,000 Gas.

## Experiment 2: Buy & Sell NFT on a single block without price exposure

This experiment aim to build a Flashbot searcher (i.e. Bot) to mint NFTs

### Level 1: Create the smart contract

A smart contract to mint a fake NFT at price of 0.0004 ETH.
