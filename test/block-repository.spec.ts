import { createBlockRepository } from "../src/block-repository"
import { EthereumProvider } from "../src/types"

const createEthereumMock = (currentBlock: number): EthereumProvider => ({
  getBlock(block: number): Promise<{ timestamp: string | number }> {
    return Promise.resolve({ timestamp: block + 500 })
  },
  getBlockNumber(): Promise<number> {
    return Promise.resolve(currentBlock)
  },
})

describe("block-repository", () => {
  it("currentBlock", async () => {
    const eth = createEthereumMock(1000)
    const blockRepository = createBlockRepository(eth)

    const currentBlock = await blockRepository.currentBlock()

    expect(currentBlock.block).toBe(1000)
    expect(currentBlock.timestamp).toBe(1500)
  })

  it("currentBlock 2", async () => {
    const eth = createEthereumMock(13268200)
    const blockRepository = createBlockRepository(eth)

    const foundBlock = await blockRepository.findBlock(13268153)

    expect(foundBlock.block).toBe(13268153)
    expect(foundBlock.timestamp).toBe(13268653)
  })
})
