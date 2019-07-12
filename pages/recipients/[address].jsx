import { useRouter } from 'next/router'
import Link from 'next/link'

import { DynamicApolloWrapper } from 'lib/components/DynamicApolloWrapper'
import { EthereumNetworkStatus } from 'lib/components/EthereumNetworkStatus'
import { MainLayout } from 'lib/components/layout/MainLayout'
import { RecipientForm } from 'lib/components/RecipientForm'
import { Section } from 'lib/components/layout/Section'

function RecipientDashboard() {
  const router = useRouter()
  const { address } = router.query

  return (
    <MainLayout>
      <EthereumNetworkStatus />      
      <Section>
        <p className='pb-4 font-silkaRegular text-gray-500'>
          <Link href='/recipients'><a>Recipients</a></Link> &raquo;&nbsp;
          <span className='wrap-everything text-gray-900'>{address}</span>
        </p>

        <DynamicApolloWrapper>
          <RecipientForm recipientAddress={address} />
        </DynamicApolloWrapper>
      </Section>
    </MainLayout>
  )
}

export default RecipientDashboard;