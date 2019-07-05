import { DynamicApolloWrapper } from 'lib/components/DynamicApolloWrapper'
import { useRouter } from 'next/router'
import { RecipientForm } from 'lib/components/RecipientForm'

function Dashboard() {
  const router = useRouter()
  const { address } = router.query

  return (
    <div>
        <p>
          Recipient {address}
        </p>
        <DynamicApolloWrapper>
          <RecipientForm recipientAddress={address} />
        </DynamicApolloWrapper>
    </div>
  )
}

export default Dashboard;