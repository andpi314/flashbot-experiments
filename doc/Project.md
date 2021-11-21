# Flashbot experiments

A collection of experimental code to interact with Ethereum network and play with Flashbot API using some Smart Contracts.

## Experiment 1: Waste Gas

- [x] Create & Deploy a simple smart contract to waste all the gas from an incoming transaction so that it can be picked up by Flashbot's miners
- [ ] Create a simple script which interacts with the just created Smart Contract to check everything is up and running

`TheBurner.sol` - This contract enable testing Flashbots with a single transaction that will consume transaction's gas limit. As of November 2021, any transaction that consume less than 42,000 gas (gas floor) is rejected by Flashbot's relay [documentation](https://docs.flashbots.net/flashbots-protect/rpc/quick-start/#key-considerations)

Contract deployed on Goerli at: [0x002671734547B8B7fc24C2Fbaee5CA65c375Ee7F](https://goerli.etherscan.io/address/0x002671734547B8B7fc24C2Fbaee5CA65c375Ee7F#code)