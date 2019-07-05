import { useRouter } from 'next/router'

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
    </div>
  )
}

export default Dashboard;