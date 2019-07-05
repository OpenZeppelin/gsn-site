import { useRouter } from 'next/router'

function Dashboard() {
  const router = useRouter()
  const { relayHubAddress } = router.query

  return (
    <div>
      <p>
        Relay Hub {relayHubAddress}
      </p>
    </div>
  )
}

export default Dashboard;