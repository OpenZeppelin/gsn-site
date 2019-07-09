import { useRouter } from 'next/router'
import { RelayForm } from 'lib/components/RelayForm'
import { DynamicApolloWrapper } from 'lib/components/DynamicApolloWrapper'

function RelayDashboard() {
  const router = useRouter()
  const { relayHubAddress, relayAddress, relayUrl } = router.query

  console.log('re-render [relayAddress]/index.html')

  return (
    <div>
      <p>
        Relay Hub {relayHubAddress}
      </p>

      <DynamicApolloWrapper>
        <RelayForm
          relayHubAddress={relayHubAddress}
          relayAddress={relayAddress}
          relayUrl={relayUrl} />
      </DynamicApolloWrapper>
    </div>
  )
}

export default RelayDashboard;