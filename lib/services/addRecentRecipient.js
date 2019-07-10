import { pick } from 'lodash'

import { addRecentValue } from './addRecentValue'
import { RECENT_VALUE_TYPE_RECIPIENT_ADDRESS } from 'lib/constants'

export async function addRecentRecipient({ recipientAddress, networkId }) {
  const value = {
    recipientAddress,
    networkId,
    type: RECENT_VALUE_TYPE_RECIPIENT_ADDRESS
  }
  await addRecentValue(value, pick(value, ['networkId', 'type']))
  return value
}