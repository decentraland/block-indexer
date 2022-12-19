import { IMetricsComponent } from '@well-known-components/interfaces'

/**
 * @public
 */
export const metricsDefinitions = {
  block_indexer_misses: {
    help: 'Amount of misses',
    type: IMetricsComponent.CounterType
  },
  block_indexer_hits: {
    help: 'Amount of hits',
    type: IMetricsComponent.CounterType
  },
  block_indexer_rpc_requests: {
    help: 'Amount of RPC requests',
    type: IMetricsComponent.CounterType
  }
}
