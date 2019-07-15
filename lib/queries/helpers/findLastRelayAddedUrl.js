export function findLastRelayAddedUrl(relayAddedEvents = []) {
  if (!relayAddedEvents || !relayAddedEvents.length) {
    return null
  }
  const lastRelayAdded = relayAddedEvents[ relayAddedEvents.length - 1 ]
  return lastRelayAdded.parsedLog.values.url
}