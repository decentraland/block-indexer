export type BlockInfo = {
  block: number
  timestamp: number
}

export type BlockSearch = {
  findBlockForTimestamp(ts: number): Promise<BlockInfo | undefined>
}

export type BlockRepository = {
  findBlock(block: number): Promise<BlockInfo>
  currentBlock(): Promise<BlockInfo>
}

export type EthereumProvider = {
  getBlockNumber(): Promise<number>
  getBlock(block: number): Promise<{ timestamp: string | number }>
}
