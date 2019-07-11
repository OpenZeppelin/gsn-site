import React, { Component } from 'react'
import classnames from 'classnames'
import { web3 } from 'dapp-core'

import { shortenAddress } from 'lib/utils/shortenAddress'

export const EnsName = class _EnsName extends Component {
  state = {}

  resolveEnsName = async (provider) => {
    let address = this.props.address

    // test address w/ ens registered on ropsten & mainnet
    // address = '0x6fC21092DA55B392b045eD78F4732bff3C580e2c'

    try {
      let result = await provider.lookupAddress(address)

      if (result !== null) {
        this.setState({
          value: result
        })
      }
    } catch (error) {
      // console.warn(error)
    }
  }

  async componentDidMount() {
    const provider = await web3.getReadProvider()

    this.resolveEnsName(provider)
  }

  render() {
    return (
      <React.Fragment>
        <span
          name={this.props.shorten ? shortenAddress(this.props.address) : this.props.address}
          className={classnames(
            'animate-content', {
              'animate-content-enter': this.state.value
            }
          )}
          title={this.state.value}
        />
      </React.Fragment>
    )
  }
}
