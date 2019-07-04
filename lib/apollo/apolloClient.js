import { apollo, web3 } from 'dapp-core'
import { abiMapping } from './abiMapping'

let client

export async function apolloClient() {
  const provider = await web3.getReadProvider()

  if (!client) {
    client = await apollo.createClient(abiMapping, provider, 0)
  }

  return client
}