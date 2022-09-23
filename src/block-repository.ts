import { BlockInfo, BlockRepository, EthereumProvider } from './types'

/**
 * @public
 */
export const createBlockRepository = (eth: EthereumProvider): BlockRepository => {
  const currentBlock = async (): Promise<BlockInfo> => {
    const block = await eth.getBlockNumber()
    const found = await findBlock(block)
    if (!found) {
      throw Error(`Current block (${block}) could not be retrieved.`)
    }

    return found
  }

  const findBlock = async (block: number): Promise<BlockInfo> => {
    const { timestamp } = await eth.getBlock(block)
    if (timestamp) {
      return {
        block: block,
        timestamp: Number(timestamp)
      }
    }

    throw Error(`Block ${block} could not be retrieved.`)
  }

  return {
    currentBlock,
    findBlock
  }
}
