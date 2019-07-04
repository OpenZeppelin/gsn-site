import React, { PureComponent } from 'react';
import { ApolloProvider } from 'react-apollo'

import { apolloClient } from 'lib/apollo/apolloClient'

class ApolloWrapper extends PureComponent {
  constructor (props) {
    super(props)
    this.state = {}
  }

  async componentDidMount() {
    const client = await apolloClient()
    this.setState({ client })
  }

  render() {
    const { client } = this.state;

    let children

    if (client) {
      children = 
        <ApolloProvider client={client}>
          {this.props.children}
        </ApolloProvider>
    } else {
      children = this.props.children
    }

    return children;
  }
}

export default ApolloWrapper