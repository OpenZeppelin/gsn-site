import React, { PureComponent } from 'react'
import Link from 'next/link'
import { withRouter } from 'next/router'

import { MainLayout } from 'lib/components/layout/MainLayout'
import { Section } from 'lib/components/layout/Section'
import { RecipientSelect } from 'lib/components/RecipientSelect'
import { EthereumNetworkStatus } from 'lib/components/EthereumNetworkStatus'
import { DynamicApolloWrapper } from 'lib/components/DynamicApolloWrapper'
import { addRecentRecipient } from 'lib/services/addRecentRecipient'
import {
  Submit,
  Field
} from 'lib/components/form'

const RecipientsIndex = class _RecipientsIndex extends PureComponent {
  constructor (props) {
    super(props)
    this.state = {
      recipientOption: null
    }
  }

  handleSubmit = async (e) => {
    e.preventDefault()
    if (this.state.recipientOption) {
      await addRecentRecipient({
        recipientAddress: this.state.recipientOption.value,
        networkId: this.state.recipientOption.networkId
      })
      this.props.router.push(
        `/recipients/${this.state.recipientOption.value}`
      )
    }
  }

  handleChangeRelayHubOption = (recipientOption) => {
    this.setState({
      recipientOption
    })
  }

  render () {
    return (
      <MainLayout>
        <EthereumNetworkStatus />
        <Section>
          <div className='lg:w-2/3'>
            <p className='pb-4 font-silkaRegular'>
              Recipients
            </p>
            <p>
              Check your contract balances and make deposits using this <strong>Dapp Tool</strong>.  You'll want to make sure the contract has enough of an Ether balance to cover transaction costs for users.
            </p>
            <p>
              Enter the contract address below.  The contract must implement the <a href='https://github.com/tabookey/tabookey-gasless/blob/master/contracts/RelayRecipient.sol' target='_blank' rel='noopen' rel='noreferrer'>RelayRecipient</a> interface.
            </p>
          </div>
          <form onSubmit={this.handleSubmit}>
            <h3 className='font-silkaMedium mb-6'>
              Lookup Recipient by Address
            </h3>
            <label htmlFor='relay-form-stake'>
              Recipient's Contract Address
            </label>

            <DynamicApolloWrapper>
              <Field>
                <RecipientSelect
                  value={this.state.recipientOption}
                  onChange={this.handleChangeRelayHubOption}
                />
              </Field>

              <Submit value='Go' disabled={!this.state.recipientOption} />
            </DynamicApolloWrapper>
          </form>
        </Section>
      </MainLayout>
    )
  }
}

export default withRouter(RecipientsIndex);
