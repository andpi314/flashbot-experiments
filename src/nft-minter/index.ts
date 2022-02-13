import { FlashbotsBundleProvider } from "@flashbots/ethers-provider-bundle"
import { BigNumber, ethers, providers, Wallet } from "ethers"
import ART_MINTER from "../../artifacts/contracts/FakeMinter.sol/ArtMinter.json"
import dotenv from "dotenv"
import { GWEI, ETHER } from "../ethreum.consts"

dotenv.config()

const CONTRACT_ADDRESS = "0x85F9aB2b46E71005fFeE0E623cd7Cc5512370536"
const CONTRACT_ABI = ART_MINTER.abi

/**
 * Use Flashbot service to call our GasBurner smart contract
 */
export default async function NftMinter() {
  //https://chainlist.org/
  const GOERLI_NETWORK_ID = 5
  const provider = new providers.InfuraProvider(GOERLI_NETWORK_ID)

  if (!process.env.PRIVATE_KEY) {
    throw new Error(
      `Expecting private key but found: ${process.env.PRIVATE_KEY}`
    )
  }

  if (!process.env.FLASHBOT_GOERLI_URL) {
    throw new Error(
      `Expecting a valid Flashbot Connection URL, but found: ${process.env.PRIVATE_KEY}`
    )
  }

  const privateSigner = new Wallet(process.env.PRIVATE_KEY, provider)

  const connectionUrl = process.env.FLASHBOT_GOERLI_URL

  // Need to have a real ethereum provider here
  const flashbotsProvider = await FlashbotsBundleProvider.create(
    provider,
    privateSigner,
    connectionUrl
  )

  const contract = new ethers.Contract(
    CONTRACT_ADDRESS, // Proxy
    CONTRACT_ABI, // ABI
    provider
  )

  provider.on("block", async (blockNumber) => {
    // In order to let a transaction be included, we need to set the bundle into every block till executed on chain
    console.log("Block Number:", blockNumber)

    const populatedTransaction = await contract.populateTransaction.mint()

    // avoiding standard pending pool
    flashbotsProvider.sendBundle(
      [
        // Let's create the transaction details that will create the Transaction Bundle
        {
          transaction: {
            chainId: GOERLI_NETWORK_ID,
            type: 2, // eip-1559 transaction type https://docs.flashbots.net/flashbots-auction/searchers/advanced/eip1559/
            value: ETHER.div(1000).mul(4), // expect to burn gas, so no value here
            /**
             * The gasLimit parameter is simply an override. By not specifying it we are letting
             * flashbot provider performs and estimate gas and populate last minute
             */
            gasLimit: 25 * 10e4, // Gas to waste
            data: populatedTransaction.data, // no data, 'null'
            maxFeePerGas: GWEI.mul(3), // We are going to pay 3 Gwei (10^9 wei)
            maxPriorityFeePerGas: GWEI.mul(2), // This much for priority
            to: CONTRACT_ADDRESS, // Destination address for the transaction (our NFT Smart Contract)
          },
          signer: privateSigner,
        },
      ],
      blockNumber + 1 // Let's try to include the transaction in the next block
    )
  })
}
