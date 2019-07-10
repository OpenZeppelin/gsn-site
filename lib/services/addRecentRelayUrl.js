import { pick } from 'lodash'

import { addRecentValue } from './addRecentValue'

export async function addRecentRelayUrl({ relayUrl, networkId }) {
  const value = {
    relayUrl,
    networkId,
    type: 'relay-url'
  }
  await addRecentValue(value, pick(value, ['networkId', 'type']))
  return value
}