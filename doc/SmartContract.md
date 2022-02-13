# Smart Contract

A collection of snippet to interact with smart contract

## Querying State

```js
const SMART_CONTRACT_ADDRESS = "0x5FbDB2315678afecb367f032d93F642f64180aa3"
const SMART_CONTRACT_NAME = "Box"
const Box = await ethers.getContractFactory()
const box = await Box.attach(SMART_CONTRACT_ADDRESS)(
  await box.COST()
).toString() // From BigNumber to string
// 4000000000000000
```

## Calling Smart Contract

In the example below we are calling a Smart Contract method with 0 input parameters which requires an amount of `0.004 ETH` or `4000000000000000` wei in order to be executed properly.

```js
await box.mint({ value: 4000000000000000 })
// Output: result of the fulfilled transaction
/**
 * {
  hash: '0x84a988b29b22ff1f5b5399444623636943112c52685b84f37da131319d30e1b3',
  type: 2,
  accessList: [],
  blockHash: '0xcff70727a4ba3cead28d7d2e2394fd626230b9aa6045474a0b3df922d4d29de3',
  blockNumber: 6371561,
  transactionIndex: 0,
  confirmations: 1,
  from: '0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266',
  gasPrice: BigNumber { _hex: '0xee6b27fe', _isBigNumber: true },
  maxPriorityFeePerGas: BigNumber { _hex: '0xee6b27f6', _isBigNumber: true },
  maxFeePerGas: BigNumber { _hex: '0xee6b2800', _isBigNumber: true },
  gasLimit: BigNumber { _hex: '0x01b524', _isBigNumber: true },
  to: '0x5244E221ab9A63aB5471dA1B6BFdC00F72f0eA74',
  value: BigNumber { _hex: '0x0e35fa931a0000', _isBigNumber: true },
  nonce: 1191,
  data: '0x1249c58b',
  r: '0xb08ad681035cee1309676ac65f5602f938f796e3b33caf45547d8646d079eb77',
  s: '0x0bb8cbecc1fbe56182db045584ae5ba93708f2547b16028449a6bfe38bb4b0ed',
  v: 1,
  creates: null,
  chainId: 31337,
  wait: [Function (anonymous)]
}
 **/
```

## Handling errors

`REPLACEMENT_UNDERPRICED` Encountered while deploying multiple smart contracts with the same script (forEach array and promises). By doing a simple deployment we were able to deploy it.
