import { pick } from 'lodash'

import { addRecentValue } from './addRecentValue'

export async function addRecentRelayHub({ relayHubAddress, networkId }) {
  const value = {
    relayHubAddress,
    networkId,
    type: 'relay-hub'
  }
  await addRecentValue(value, pick(value, ['networkId', 'type']))
  return value
}