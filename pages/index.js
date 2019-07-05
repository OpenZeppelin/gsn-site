import { DynamicApolloWrapper } from "../lib/components/DynamicApolloWrapper";
import { Query } from 'react-apollo'
import { queries } from 'dapp-core'

import { networkIdToName } from 'lib/utils/networkIdToName'

function Home() {
  return (
    <div>
      <p>
        Welcome to Next.js!
      </p>
      <DynamicApolloWrapper>
        <p>
          <Query query={queries.networkAccountQuery}>
            {({ data, loading }) => {
              console.log(data)
              var network = 'loading...'
              if (!loading) {
                network =  networkIdToName(data.networkId)
              }

              return <>
                This content is dynamically loaded from Ethereum network {network}
              </>
            }}
          </Query>
        </p>
      </DynamicApolloWrapper>
    </div>
  )
}

export default Home;