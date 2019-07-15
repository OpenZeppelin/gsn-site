import React, { Component } from 'react'
import classnames from 'classnames'
import { web3, utils } from 'dapp-core'

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
          className={classnames(
            'animate-content', {
              'animate-content-enter': this.state.value
            }
          )}
        >
          {this.props.shorten ? utils.shortenAddress(this.props.address) : this.props.address}
        </span>
      </React.Fragment>
    )
  }
}
