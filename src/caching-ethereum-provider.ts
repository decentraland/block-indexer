import { EthereumProvider } from './types'
import LRU from 'lru-cache'

/**
 * @public
 */
export const createCachingEthereumProvider = (eth: EthereumProvider): EthereumProvider => {
  const cache = new LRU<number, string | number>({
    max: 10000,
    fetchMethod: async (block): Promise<string | number> => {
      const found = await eth.getBlock(block)
      if (found) {
        return found.timestamp
      }

      throw Error(`Block ${block} could not be retrieved.`)
    }
  })

  const getBlockNumber = async (): Promise<number> => await eth.getBlockNumber()

  const getBlock = async (block: number): Promise<{ timestamp: string | number }> => {
    const found = await cache.fetch(block)
    if (found) {
      return {
        timestamp: found
      }
    }

    throw Error(`Block ${block} could not be retrieved.`)
  }

  return {
    getBlockNumber,
    getBlock
  }
}
