import { useRouter } from 'next/router'
import Link from 'next/link'

import { MainLayout } from 'lib/components/layout/MainLayout'
import { Section } from 'lib/components/layout/Section'
import { RelayHubForm } from 'lib/components/RelayHubForm'
import { EthereumNetworkStatus } from 'lib/components/EthereumNetworkStatus'
import { DynamicApolloWrapper } from 'lib/components/DynamicApolloWrapper'

function RelayHubDashboard () {
  const router = useRouter()
  const { relayHubAddress } = router.query

  return (
    <MainLayout>
      <EthereumNetworkStatus />
      <Section>
        <p className='pb-4 font-silkaRegular text-gray-500'>
          <Link href='/relay-hubs'><a>Relay Hubs</a></Link> &raquo;&nbsp;
          <span className='wrap-everything text-gray-900'>{relayHubAddress}</span>
        </p>
        <RelayHubForm
          relayHubAddress={relayHubAddress}
        />
      </Section>
    </MainLayout>
  )
}

export default RelayHubDashboard;