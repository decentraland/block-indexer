import { BlockInfo, BlockRepository } from "../../src"

export const createMockBlockRepository = (currentBlock: number, blocks: Record<number, number>) => {
  const blockRepository: BlockRepository = {
    currentBlock(): Promise<BlockInfo> {
      return Promise.resolve({
        block: currentBlock,
        timestamp: blocks[currentBlock],
      })
    },
    findBlock(block: number): Promise<BlockInfo | undefined> {
      if (block in blocks) {
        return Promise.resolve({
          block,
          timestamp: blocks[block],
        })
      }
      return undefined
    },
  }
  return blockRepository
}
