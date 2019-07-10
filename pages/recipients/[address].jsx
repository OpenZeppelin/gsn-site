import { useRouter } from 'next/router'
import Link from 'next/link'

import { DynamicApolloWrapper } from 'lib/components/DynamicApolloWrapper'
import { MainLayout } from 'lib/components/layout/MainLayout'
import { RecipientForm } from 'lib/components/RecipientForm'
import { Section } from 'lib/components/layout/Section'

function RecipientDashboard() {
  const router = useRouter()
  const { address } = router.query

  return (
    <MainLayout>
      <Section>
        <p>
          <Link href='/recipients'><a>Recipients</a></Link> &raquo; {address}
        </p>
        <DynamicApolloWrapper>
          <RecipientForm recipientAddress={address} />
        </DynamicApolloWrapper>
      </Section>
    </MainLayout>
  )
}

export default RecipientDashboard;