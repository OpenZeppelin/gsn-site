import { keys } from 'lodash'

export function projectActiveRelays(relayHubAllEvents) {
  const relays = {}

  relayHubAllEvents.forEach((event) => {
    const { name, values } = event.parsedLog
    const { relay, url } = values
    switch (name) {
      case 'RelayAdded':
        relays[relay] = url
        break
      case 'RelayRemoved':
        delete relays[relay]
        break
    }
  })

  return keys(relays).map((key) => ({ address: key, url: relays[key] }))
}