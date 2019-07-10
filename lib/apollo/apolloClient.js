import { apollo, web3 } from 'dapp-core'
import { abiMapping } from './abiMapping'
import { relayAddress } from './resolvers/queries/relayAddress'
import { recentValues } from './resolvers/queries/recentValues'

let client

export async function apolloClient() {
  const provider = await web3.getReadProvider()

  const resolvers = {
    Query: {
      relayAddress,
      recentValues
    }
  }

  if (!client) {
    client = await apollo.createClient({abiMapping, provider, resolvers})
  }

  return client
}