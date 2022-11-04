import {
  BlockSearch,
  createAvlBlockSearch,
  createBlockRepository,
  createCachingEthereumProvider,
  EthereumProvider,
} from "../src"
import Web3 from "web3"

describe("mariano", () => {
  let web3
  let cachingEthereumProvider: EthereumProvider
  let blockSearch: BlockSearch
  beforeEach(async () => {
    web3 = new Web3("https://rpc.decentraland.org/polygon?project=block-indexer")
    cachingEthereumProvider = createCachingEthereumProvider(web3.eth)
    blockSearch = createAvlBlockSearch(createBlockRepository(cachingEthereumProvider))
  })

  afterEach(async () => {
    console.log("After all...")
  })

  it("works", async () => {
    console.log(await cachingEthereumProvider.getBlockNumber())
    let found = await blockSearch.findBlockForTimestamp(1666121128)
    console.log(found)
    expect(found).toEqual({ block: 34508023, timestamp: 1666121127 })
  }, 30_000)
})
