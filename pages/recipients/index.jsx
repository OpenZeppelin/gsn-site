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
          Check your contract balances and make deposits using the Dapp Tool.  You'll want to make sure the contract has enough balance to cover transaction costs for users.
        </p>
        <p>
          Enter the contract address below.  The contract must implement the <a href='https://github.com/tabookey/tabookey-gasless/blob/master/contracts/RelayRecipient.sol' target='_blank' rel='noopen' rel='noreferrer'>RelayRecipient</a> interface.
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
