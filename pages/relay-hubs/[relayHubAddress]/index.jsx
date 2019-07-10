import { useRouter } from 'next/router'
import Link from 'next/link'

import { MainLayout } from 'lib/components/layout/MainLayout'
import { Section } from 'lib/components/layout/Section'
import { RelayHubForm } from 'lib/components/RelayHubForm'

function RelayHubDashboard () {
  const router = useRouter()
  const { relayHubAddress } = router.query

  return (
    <MainLayout>
      <Section>
        <p>
          <Link href='/relay-hubs'>Relay Hubs</Link> &raquo; {relayHubAddress}
        </p>
        <RelayHubForm relayHubAddress={relayHubAddress} />
      </Section>
    </MainLayout>
  )
}

export default RelayHubDashboard;