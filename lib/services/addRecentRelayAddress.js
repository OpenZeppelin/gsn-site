import { pick } from 'lodash'

import { addRecentValue } from './addRecentValue'
import { RECENT_VALUE_TYPE_RELAY_ADDRESS } from 'lib/constants'

export async function addRecentRelayAddress({ relayAddress, networkId }) {
  const value = {
    relayAddress,
    networkId,
    type: RECENT_VALUE_TYPE_RELAY_ADDRESS
  }

  await addRecentValue(value, pick(value, ['networkId', 'type']))
  
  return value
}