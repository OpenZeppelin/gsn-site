import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

import { RelayUrlSelect } from 'lib/components/RelayUrlSelect'
import { RelayUrlTestBadge } from 'lib/components/RelayUrlTestBadge'

export const RelayUrlTestForm = class _RelayUrlTestForm extends PureComponent {
  static propTypes = {
    relayUrl: PropTypes.string
  }

  constructor (props) {
    super(props)
    let relayUrlOption
    if (props.relayUrl) {
      relayUrlOption = {
        value: props.relayUrl,
        label: props.relayUrl
      }
    }
    this.state = {
      relayUrlOption
    }
  }

  componentDidMount = () => {
    this.checkRelayUrlDefault()
  }

  componentDidUpdate = () => {
    this.checkRelayUrlDefault()
  }

  checkRelayUrlDefault = () => {
    if (this.props.relayUrl && !this.state.relayUrlOption) {
      this.setState({
        relayUrlOption: {
          value: this.props.relayUrl,
          label: this.props.relayUrl
        }
      })
    }
  }

  handleChangeRelayUrl = (relayUrlOption) => {
    this.setState({
      relayUrlOption
    })
  }

  render () {
    const { relayUrlOption } = this.state

    return (
      <dl>
        <h3 className='font-silkaMedium mb-8 text-black'>
          Relay Server Status
        </h3>
        <label htmlFor='relay-by-url'>
          Relay URL
        </label>
        <dd className='mb-0'>
          <RelayUrlSelect
            value={relayUrlOption}
            onChange={this.handleChangeRelayUrl}
            className='flex-1'
            isDisabled={relayUrlOption}
          />

          <div className='flex mt-4'>
            <RelayUrlTestBadge
              relayUrl={relayUrlOption ? relayUrlOption.value : null}
            />
          </div>
        </dd>
      </dl>
    )
  }
}