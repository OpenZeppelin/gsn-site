import queryString from 'query-string'

export function formatRelayUrl({ relayHubAddress, relayAddress, relayUrl }) {
  return `/relay-hubs/${relayHubAddress}/relay?${queryString.stringify({relayAddress, relayUrl})}`
}