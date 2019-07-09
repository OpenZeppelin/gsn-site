import { useRouter } from 'next/router'

import { MainLayout } from 'lib/components/layout/MainLayout'
import { DynamicApolloWrapper } from 'lib/components/DynamicApolloWrapper'
import { RelayHubForm } from 'lib/components/RelayHubForm'

function RelayHubDashboard () {
  const router = useRouter()
  const { relayHubAddress } = router.query

  console.log('re-render [relayHubAddress]/index.html')

  return (
    <MainLayout>
      <div
        className='container'
      >
        <p>
          Relay Hub {relayHubAddress}
        </p>

        <DynamicApolloWrapper>
          <RelayHubForm relayHubAddress={relayHubAddress} />
        </DynamicApolloWrapper>
      </div>
    </MainLayout>
  )
}

export default RelayHubDashboard;