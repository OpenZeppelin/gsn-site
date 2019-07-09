import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

import { withRelay } from 'lib/components/hoc/withRelay'

export const RelayWrapper = withRelay(class _RelayWrapper extends PureComponent {
  static propTypes = {
    relayHubAddress: PropTypes.string.isRequired,
    relayAddress: PropTypes.string,
    relayUrl: PropTypes.string
  }

  render () {
    return this.props.children(this.props)
  }
})