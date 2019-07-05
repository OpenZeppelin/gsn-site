import { AddressLinkForm } from 'lib/components/AddressLinkForm'

export function LandingPageForm () {
  return (
    <>
      <h1>Gas Station Network</h1>
      <h3>Access Relay Hub</h3>
      <AddressLinkForm
        formatUrl={(address) => `/relay-hubs/${address}`}
        />

      <h3>Access Recipient</h3>
      <AddressLinkForm
        formatUrl={(address) => `/recipients/${address}`}
        />
    </>
  )
}
