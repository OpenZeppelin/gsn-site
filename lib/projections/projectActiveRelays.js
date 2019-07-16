import { keys } from 'lodash'
import { utils } from 'dapp-core'

export function projectActiveRelays(relayHubAllEvents) {
  const relays = {}

  relayHubAllEvents.forEach((event) => {
    const { name, values } = event.parsedLog
    const relay = utils.normalizeAddr(values.relay)
    const url = values.url
    switch (name) {
      case 'RelayAdded':
        relays[relay] = url
        break
      case 'RelayRemoved':
        delete relays[relay]
        break
    }
  })

  const result = keys(relays).map((key) => ({ address: key, url: relays[key] }))

  return result
}