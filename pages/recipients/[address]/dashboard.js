import { DynamicApolloWrapper } from 'lib/components/DynamicApolloWrapper'
import { Query } from 'react-apollo'
import { recipientQuery } from 'lib/queries/recipientQuery'
import { useRouter } from 'next/router'

function Dashboard() {
  const router = useRouter()
  const { address } = router.query

  return (
    <div>
        <p>
          Recipient {address}
          <DynamicApolloWrapper>
            <Query query={recipientQuery} variables={{ recipientAddress: address }}>
              {({ data, loading, error }) => {
                if (error) {
                  console.error(error)
                  return error.message
                } else if (loading) {
                  console.log('loading...')
                  return '...'
                } else {
                  console.log(data)
                  return <>
                    Recipient balance is {data.balance.toString()}
                  </>
                }
              }}
            </Query>
          </DynamicApolloWrapper>
        </p>
    </div>
  )
}

export default Dashboard;