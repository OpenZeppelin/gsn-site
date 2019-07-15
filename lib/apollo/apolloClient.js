import { apollo, web3 } from 'dapp-core'
import { abiMapping } from './abiMapping'
import { relayServerInfo } from './resolvers/queries/relayServerInfo'
import { recentValues } from './resolvers/queries/recentValues'

let client

export async function apolloClient() {
  const provider = await web3.getReadProvider({ defaultNetworkName: process.env.DEFAULT_ETHEREUM_NETWORK_NAME })

  const resolvers = {
    Query: {
      relayServerInfo,
      recentValues
    }
  }

  if (!client) {
    client = await apollo.createClient({abiMapping, provider, resolvers})
  }

  return client
}