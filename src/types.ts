/**
 * @public
 */
import { AvlTree } from './avl-tree/types'

/**
 * @public
 */
export type BlockInfo = {
  block: number
  timestamp: number
}

/**
 * @public
 */
export type BlockSearch = {
  tree: AvlTree<number, BlockInfo>
  findBlockForTimestamp(ts: number): Promise<BlockInfo | undefined>
}

/**
 * @public
 */
export type BlockRepository = {
  findBlock(block: number): Promise<BlockInfo>
  currentBlock(): Promise<BlockInfo>
}

/**
 * @public
 */
export type EthereumProvider = {
  getBlockNumber(): Promise<number>
  getBlock(block: number): Promise<{ timestamp: string | number }>
}
