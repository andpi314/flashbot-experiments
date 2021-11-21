// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
import { ethers } from "hardhat"

async function main() {
  const [deployer] = await ethers.getSigners()

  console.log(`Deploying contracts with the account: ${deployer.address}`)

  const balance = await deployer.getBalance()

  console.log(`Account balance: ${balance}`)

  // We get the contract to deploy
  const GasBurner = await ethers.getContractFactory("GasBurner")
  const smartContract = await GasBurner.deploy()

  await smartContract.deployed()

  console.log(`SmartContract deployed to ${smartContract.address}`)
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exitCode = 1
  })
