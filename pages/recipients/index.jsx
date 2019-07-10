import React from 'react'

import { AddressLinkForm } from 'lib/components/AddressLinkForm'
import { MainLayout } from 'lib/components/layout/MainLayout'
import { Section } from 'lib/components/layout/Section'

const RecipientsIndex = function() {
  return (
    <MainLayout>
      <Section>
        <h1>Dapp Tool</h1>
        <p>
          Check and top-up your contract balances using the dapp tool.
        </p>
        <p>
          Enter your contract address below.  The contract must implement the <a href='https://github.com/tabookey/tabookey-gasless/blob/master/contracts/RelayRecipient.sol' target='_blank' rel='noopen' rel='noreferrer'>RelayRecipient</a> interface.
        </p>
        <AddressLinkForm
          title=''
          placeholder='enter the contract address'
          formatUrl={(address) => `/recipients/${address}`}
        />
      </Section>
    </MainLayout>
  )
}

export default RecipientsIndex;
