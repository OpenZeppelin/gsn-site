import React, { PureComponent } from 'react'
import Link from 'next/link'
import { withRouter } from 'next/router'

import { MainLayout } from 'lib/components/layout/MainLayout'
import { Section } from 'lib/components/layout/Section'
import { RecipientSelect } from 'lib/components/RecipientSelect'
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
        <Section>
          <p>
            <Link href='/recipients'><a>Recipients</a></Link>
          </p>
          <p>
            Check your contract balances and make deposits using the Dapp Tool.  You'll want to make sure the contract has enough balance to cover transaction costs for users.
          </p>
          <p>
            Enter the contract address below.  The contract must implement the <a href='https://github.com/tabookey/tabookey-gasless/blob/master/contracts/RelayRecipient.sol' target='_blank' rel='noopen' rel='noreferrer'>RelayRecipient</a> interface.
          </p>
          <form onSubmit={this.handleSubmit}>
            <DynamicApolloWrapper>
              <Field>
                <RecipientSelect value={this.state.recipientOption} onChange={this.handleChangeRelayHubOption} />
              </Field>
            </DynamicApolloWrapper>
            <Submit value='Go' />
          </form>
        </Section>
      </MainLayout>
    )
  }
}

export default withRouter(RecipientsIndex);
