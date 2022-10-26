import { BlockInfo, BlockRepository, EthereumProvider } from './types'

/**
 * @public
 */
export const createBlockRepository = (eth: EthereumProvider): BlockRepository => {
  const currentBlock = async (): Promise<BlockInfo> => {
    const tsStart = new Date().getTime()
    try {
      const block = await eth.getBlockNumber()
      const found = await findBlock(block)
      if (!found) {
        throw Error(`Current block (${block}) could not be retrieved.`)
      }

      return found
    } finally {
      const tsEnd = new Date().getTime()
      console.log(`BLOCK_SEARCH: currentBlock() took ${tsEnd - tsStart} ms.`)
    }
  }

  const findBlock = async (block: number): Promise<BlockInfo> => {
    const tsStart = new Date().getTime()
    try {
      const { timestamp } = await eth.getBlock(block)
      if (timestamp) {
        return {
          block: block,
          timestamp: Number(timestamp)
        }
      }
    } finally {
      const tsEnd = new Date().getTime()
      console.log(`BLOCK_SEARCH: findBlock(${block}) took ${tsEnd - tsStart} ms.`)
    }

    throw Error(`Block ${block} could not be retrieved.`)
  }

  return {
    currentBlock,
    findBlock
  }
}
