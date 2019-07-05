import { NETWORK_ID_TO_NAME } from '../constants'

export function networkIdToName(networkId) {
  let unknown = 'unknown'
  if (!networkId) { return unknown }
  networkId = parseInt(networkId, 10)
  return NETWORK_ID_TO_NAME[networkId] || unknown
}