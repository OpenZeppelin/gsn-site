// import React, { PureComponent } from 'react'
// import { graphql } from 'react-apollo'
// import PropTypes from 'prop-types'

// import { recentRelayHubsQuery } from 'lib/queries/recentRelayHubsQuery'
// import { withNetworkAccountQuery } from 'lib/components/hoc/withNetworkAccountQuery'
// import { isAddress } from 'lib/utils/isAddress'
// import { GSNSelect } from 'lib/components/GSNSelect'

// export const RelayHubSelect = withNetworkAccountQuery(
//   graphql(recentRelayHubsQuery, {
//     name: 'recentRelayHubsQuery',
//     skip: (props) => !props.networkAccountQuery || !props.networkAccountQuery.networkId,
//     options: (props) => {
//       return {
//         fetchPolicy: 'network-only',
//         variables: {
//           networkId: props.networkAccountQuery.networkId
//         }
//       }
//     }
//   })(
// class _RelayHubSelect extends PureComponent {
//   static propTypes = {
//     handleChange: PropTypes.func.isRequired,
//     value: PropTypes.object
//   }

//   render () {
//     let options = []
    
//     const newProps = this.props
//     const { recentRelayHubsQuery } = this.props
//     const { recentRelayHubs } = recentRelayHubsQuery || {}

//     if (recentRelayHubs) {
//       options = recentRelayHubs.map(({ relayHubAddress, networkId }) => {
//         return {
//           label: relayHubAddress,
//           value: relayHubAddress,
//           networkId
//         }
//       })
//     }

//     return (
//       <GSNSelect
//         {...newProps}
//         options={options}
//         valid={isAddress}
//       />
//     )
//   }
// }
// ))
