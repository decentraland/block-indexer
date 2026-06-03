# Block Indexer

> **⚠️ Deprecated — this repository has moved.**
>
> `@dcl/block-indexer` is now developed and published from the [`decentraland/core-components`](https://github.com/decentraland/core-components) monorepo, under [`components/block-indexer`](https://github.com/decentraland/core-components/tree/main/components/block-indexer).
>
> This repository is archived and will no longer receive updates. The npm package name (`@dcl/block-indexer`) is unchanged — no action is required for existing consumers, but please open new issues and pull requests against `decentraland/core-components`.

A component to find the block in the blockchain that was the tip of the blockchain at a given timestamp.

## Installation

`npm i @dcl/block-indexer`

## Usage

```ts
import { createBlockSearch } from "./block-search"
import { createBlockRepository } from "./block-repository"
import { createCachingEthereumProvider } from "./caching-ethereum-provider"

it("should find the block for given timestamp", async function () {
  const ethereumProvider = createCachingEthereumProvider(
    new Web3("https://rpc.decentraland.org/mainnet?project=block-indexer").eth
  )
  const blockSearch = createBlockSearch(createBlockRepository(ethereumProvider))
  expect(await blockSearch.findBlockForTimestamp(1612524240)).toEqual({ block: 11795935, timestamp: 1612524239 })
}, 30_000)
```
