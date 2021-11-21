import { FlashbotsBundleProvider } from "@flashbots/ethers-provider-bundle"
import { BigNumber, providers, Wallet } from "ethers"

import dotenv from "dotenv"
import { GWEI } from "../ethreum.consts"

dotenv.config()

/**
 * Use Flashbot service to call our GasBurner smart contract
 */
export default async function GasBurner() {
  //https://chainlist.org/
  const GOERLI_NETWORK_ID = 5
  const provider = new providers.InfuraProvider(GOERLI_NETWORK_ID)

  // Define a random signer
  const randomSinger = new Wallet(
    process.env.RANDOM_PRIVATE_KEY || "",
    provider
  )

  const privateSigner = new Wallet(process.env.PRIVATE_KEY || "", provider)

  const connectionUrl = process.env.FLASHBOT_GOERLI_URL

  // Need to have a real ethereum provider here
  const flashbotsProvider = await FlashbotsBundleProvider.create(
    provider,
    randomSinger,
    connectionUrl
  )

  provider.on("block", (blockNumber) => {
    // In order to let a transaction be included, we need to set the bundle into every block till executed on chain
    console.log("Block Number:", blockNumber)

    // avoiding standard pending pool
    flashbotsProvider.sendBundle(
      [
        // Let's create the transaction details that will create the Transaction Bundle
        {
          transaction: {
            chainId: GOERLI_NETWORK_ID,
            type: 2, // eip-1559 transaction type https://docs.flashbots.net/flashbots-auction/searchers/advanced/eip1559/
            value: BigNumber.from(0), // expect to burn gas, so no value here
            gasLimit: 5 * 10e4, // Gas to waste
            data: "0x", // no data, 'null'
            maxFeePerGas: GWEI.mul(3), // We are going to pay 3 Gwei (10^9 wei)
            maxPriorityFeePerGas: GWEI.mul(2), // This much for priority
            to: "0x002671734547B8B7fc24C2Fbaee5CA65c375Ee7F", // Destination address for the transaction (our GasBurner Smart Contract)
          },
          signer: privateSigner,
        },
      ],
      blockNumber + 1 // Let's try to include the transaction in the next block
    )
  })
}
