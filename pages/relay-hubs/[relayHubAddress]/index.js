import { useRouter } from 'next/router'
import { DynamicApolloWrapper } from 'lib/components/DynamicApolloWrapper'
import { RelayHubForm } from 'lib/components/RelayHubForm'

function Dashboard () {
  const router = useRouter()
  const { relayHubAddress } = router.query

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

export default Dashboard;