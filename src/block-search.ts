import { BlockInfo, BlockRepository, BlockSearch } from './types'
import { createAvlTree } from './avl-tree/avl-tree'

/**
 * @public
 */
export const createAvlBlockSearch = (blockRepository: BlockRepository): BlockSearch => {
  // TODO Need to check if it is possible for 2 blocks to have the same timestamp (unlikely)
  const tree = createAvlTree<number, BlockInfo>(
    (x, y) => x - y,
    (x, y) => x.block! - y.block!
  )

  const retrieveBlockAndAddToTree = async (blockNumber: number) => {
    // We first attempt to search in the tree
    const found = tree.findByValue({ block: blockNumber })
    if (found) {
      return found
    }

    // Only if not found we go to the blockchain and cache it for later
    const blockInfo = await blockRepository.findBlock(blockNumber)
    if (blockInfo) {
      tree.insert(blockInfo.timestamp, blockInfo)
    }
    return blockInfo
  }

  const findBlockForTimestamp = async (ts: number): Promise<BlockInfo | undefined> => {
    const tsStart = new Date().getTime()
    try {
      const range = tree.findEnclosingRange(ts)
      const start = range.min ? tree.get(range.min)?.block! : 1
      const end = range.max ? tree.get(range.max)?.block! : (await blockRepository.currentBlock()).block
      console.log(`BLOCK_SEARCH: findBlockForTimestamp: ${ts} in block range ${start}-${end}`)
      return await findBlockForTimestampInRange(ts, start, end)
    } catch (e) {
      console.log(e)
      throw e
    } finally {
      const tsEnd = new Date().getTime()
      console.log(`BLOCK_SEARCH: findBlockForTimestamp(${ts}) took ${tsEnd - tsStart} ms.`)
    }
  }

  const findBlockForTimestampInRange = async (
    ts: number,
    startBlock: number,
    endBlock: number
  ): Promise<BlockInfo | undefined> => {
    while (startBlock <= endBlock) {
      const middle = Math.floor((startBlock + endBlock) / 2)
      const blockInMiddle = await retrieveBlockAndAddToTree(middle)

      if (blockInMiddle.timestamp === ts) {
        return blockInMiddle
      } else if (blockInMiddle.timestamp < ts) {
        startBlock = middle + 1
      } else {
        endBlock = middle - 1
      }
    }
    const [blockAtStart, blockAtEnd] = await Promise.all([
      retrieveBlockAndAddToTree(startBlock),
      retrieveBlockAndAddToTree(endBlock)
    ])

    if (blockAtStart && blockAtStart.timestamp <= ts) {
      return blockAtStart
    } else if (blockAtEnd && blockAtEnd.timestamp <= ts) {
      return blockAtEnd
    }

    return undefined
  }

  return {
    findBlockForTimestamp
  }
}
