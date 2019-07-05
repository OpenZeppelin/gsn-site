import { useRouter } from 'next/router'
import { RelayForm } from 'lib/components/RelayForm'
import { DynamicApolloWrapper } from 'lib/components/DynamicApolloWrapper'

function Dashboard() {
  const router = useRouter()
  const { relayHubAddress, relayAddress } = router.query

  return (
    <div>
      <p>
        Relay Hub {relayHubAddress}
      </p>
      <p>
        Relay {relayAddress}
      </p>

      <DynamicApolloWrapper>
        <RelayForm relayHubAddress={relayHubAddress} relayAddress={relayAddress} />
      </DynamicApolloWrapper>
    </div>
  )
}

export default Dashboard;