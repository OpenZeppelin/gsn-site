import { DynamicApolloWrapper } from '../lib/components/DynamicApolloWrapper';
import { Query } from 'react-apollo'
import { queries } from 'dapp-core'

import { networkIdToName } from 'lib/utils/networkIdToName'
import { LandingPageForm } from 'lib/components/LandingPageForm'

import '../styles/index.css'

function Home() {
  return (
    <div
      className='p-4 bg-gray-100'
    >
      <div
        className='container'
      >
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
          <LandingPageForm />
        </DynamicApolloWrapper>
      </div>
    </div>
  )
}

export default Home;