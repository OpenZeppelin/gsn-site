import { pick } from 'lodash'

import { addRecentValue } from './addRecentValue'
import { RECENT_VALUE_TYPE_RELAY_HUB_ADDRESS } from 'lib/constants'

export async function addRecentRelayHub({ relayHubAddress, networkId }) {
  const value = {
    relayHubAddress,
    networkId,
    type: RECENT_VALUE_TYPE_RELAY_HUB_ADDRESS
  }
  await addRecentValue(value, pick(value, ['networkId', 'type']))
  return value
}