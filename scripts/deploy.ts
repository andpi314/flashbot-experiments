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

  const contracts = [
    {
      name: "MinERC721",
      constructorArgs: [], // Put constructor args (if any) here for your contract factory.deploy(...constructorArgs);
      deploy: async (contract: any) => contract.deploy("NFT", "tNFT"),
    },
    {
      name: "ArtMinter",
      deploy: async (contract: any) => contract.deploy(),
    },
  ]

  const deploymentPromises = contracts.map(async (contractData) => {
    console.log(`Deploying ${contractData.name}`)
    const thisContract = await ethers.getContractFactory(contractData.name)
    const smartContract = await contractData.deploy(thisContract)
    return await smartContract.deployed()
  })

  const deployments = await Promise.all(deploymentPromises)

  deployments.forEach((d) => {
    console.log(`SmartContract deployed to ${d.address}`)
  })
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exitCode = 1
  })
