import React, { PureComponent } from 'react'
import FeatherIcon from 'feather-icons-react'

import { withNetworkAccountQuery } from 'lib/components/hoc/withNetworkAccountQuery'
import { formatEtherscanAddressUrl } from 'lib/utils/formatEtherscanAddressUrl'

export const EtherscanAddressLink = 
  withNetworkAccountQuery(class _EtherscanAddressLink extends PureComponent {

    render () {
      const { address, children, className } = this.props

      const networkId = this.props.networkAccountQuery.networkId
      const url = formatEtherscanAddressUrl(address, networkId)

      return (
        <>
          {/* <ReactTooltip type='info' effect='solid' /> */}
          {children} <a
            // data-tip='View on Etherscan'
            href={url}
            className={`no-underline ${className}`}
            target='_blank'
            rel='noopener noreferrer'
            title='View on Etherscan'
          >
            <FeatherIcon
              icon='external-link'
              className='is-etherscan-arrow inline-block'
            />
          </a>
        </>
      )
    }
    
  }
)