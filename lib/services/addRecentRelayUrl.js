import { pick } from 'lodash'

import { addRecentValue } from './addRecentValue'
import { RECENT_VALUE_TYPE_RELAY_URL } from 'lib/constants'

export async function addRecentRelayUrl({ relayUrl, networkId }) {
  const value = {
    relayUrl,
    networkId,
    type: RECENT_VALUE_TYPE_RELAY_URL
  }
  
  await addRecentValue(value, pick(value, ['networkId', 'type']))

  return value
}