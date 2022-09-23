import { BlockInfo, BlockRepository, BlockSearch } from "./types"

export const createBlockSearch = (blockRepository: BlockRepository): BlockSearch => {
  const findBlockForTimestamp = async (ts: number): Promise<BlockInfo | undefined> => {
    let start = 1
    let end = (await blockRepository.currentBlock()).block

    while (start <= end) {
      let middle = Math.floor((start + end) / 2)
      let blockInMiddle = await blockRepository.findBlock(middle)

      if (blockInMiddle.timestamp === ts) {
        return blockInMiddle
      } else if (blockInMiddle.timestamp < ts) {
        start = middle + 1
      } else {
        end = middle - 1
      }
    }
    const [blockAtStart, blockAtEnd] = [await blockRepository.findBlock(start), await blockRepository.findBlock(end)]

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
