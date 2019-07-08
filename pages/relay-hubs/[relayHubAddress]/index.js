import { useRouter } from 'next/router'
import { DynamicApolloWrapper } from 'lib/components/DynamicApolloWrapper'
import { RelayHubForm } from 'lib/components/RelayHubForm'

function RelayHubDashboard () {
  const router = useRouter()
  const { relayHubAddress } = router.query

  console.log('re-render [relayHubAddress]/index.html')

  return (
    <div>
      <p>
        Relay Hub {relayHubAddress}
      </p>

      <DynamicApolloWrapper>
        <RelayHubForm relayHubAddress={relayHubAddress} />
      </DynamicApolloWrapper>
    </div>
  )
}

export default RelayHubDashboard;