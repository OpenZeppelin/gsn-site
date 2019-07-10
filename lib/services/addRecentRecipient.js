import { pick } from 'lodash'

import { addRecentValue } from './addRecentValue'

export async function addRecentRecipient({ recipientAddress, networkId }) {
  const value = {
    recipientAddress,
    networkId,
    type: 'recipient'
  }
  await addRecentValue(value, pick(value, ['networkId', 'type']))
  return value
}