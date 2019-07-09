import { DynamicApolloWrapper } from '../lib/components/DynamicApolloWrapper';
import { Query } from 'react-apollo'
import { queries } from 'dapp-core'

import { MainLayout } from 'lib/components/layout/MainLayout'
import { LandingPageForm } from 'lib/components/LandingPageForm'
import { networkIdToName } from 'lib/utils/networkIdToName'

function Home() {
  return (
    <MainLayout>
      <div
        className='p-4 bg-gray-100'
      >
        <div
          className='container'
        >
          <div className="container w-9/12 mx-auto">
            <div className="text-center pb-16">
              <h1 className="font-silkaSemiBold text-4xl pt-12">
                GSN is the final onboarding solution for Ethereum applications
              </h1>
              <h2 className="text-lg font-light	tracking-wide mt-2 mb-4 py-4">
                Turn your dapps into apps. Free your users. No more Metamask. No more gas.
              </h2>

              <a href="#" className="font-silkaSemiBold shadow uppercase rounded tracking-wider bg-indigo-500 text-white p-2 px-4 inline-block mb-16">
                Use GSN in your application
              </a>
            </div>
          </div>
          

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
    </MainLayout>
  )
}

export default Home;