import { AddressLinkForm } from 'lib/components/AddressLinkForm'

export function LandingPageForm () {
  return (
    <>
      <AddressLinkForm
        title='Access Relay Hub'
        formatUrl={(address) => `/relay-hubs/${address}`}
      />

      <AddressLinkForm
        title='Access Recipient'
        formatUrl={(address) => `/recipients/${address}`}
      />
    </>
  )
}
