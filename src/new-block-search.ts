import { BlockInfo, BlockRepository, BlockSearch } from "./types"

import { AvlTree } from "./avl-tree/avlTree"

/**
 * @public
 */
export const createAvlBlockSearch = (blockRepository: BlockRepository): BlockSearch => {
  // TODO Need to check if it is possible for 2 blocks to have the same timestamp (unlikely)
  const tree = new AvlTree<number, BlockInfo>()

  const retrieveBlockAndAddToTree = async (blockNumber: number) => {
    const blockInfo = await blockRepository.findBlock(blockNumber)
    if (blockInfo) {
      tree.insert(blockInfo.timestamp, blockInfo)
    }
    return blockInfo
  }

  const findBlockForTimestamp = async (ts: number): Promise<BlockInfo | undefined> => {
    const range = tree.findEnclosingRange(ts)
    let start = range.min ? tree.get(range.min)?.block! : 1
    let end = range.max ? tree.get(range.max)?.block! : (await blockRepository.currentBlock()).block
    return findBlockForTimestampInRange(ts, start, end)
  }

  const findBlockForTimestampInRange = async (
    ts: number,
    startBlock: number,
    endBlock: number
  ): Promise<BlockInfo | undefined> => {
    console.log("rango a buscar", { startBlock, endBlock })
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
    const [blockAtStart, blockAtEnd] = [
      await retrieveBlockAndAddToTree(startBlock),
      await retrieveBlockAndAddToTree(endBlock),
    ]

    if (blockAtStart && blockAtStart.timestamp <= ts) {
      return blockAtStart
    } else if (blockAtEnd && blockAtEnd.timestamp <= ts) {
      return blockAtEnd
    }

    return undefined
  }

  return {
    findBlockForTimestamp,
  }
}
