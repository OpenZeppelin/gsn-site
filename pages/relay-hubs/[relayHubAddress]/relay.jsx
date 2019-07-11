import { useRouter } from 'next/router'
import Link from 'next/link'

import { MainLayout } from 'lib/components/layout/MainLayout'
import { Section } from 'lib/components/layout/Section'
import { RelayForm } from 'lib/components/RelayForm'
import { DynamicApolloWrapper } from 'lib/components/DynamicApolloWrapper'
import { RelayWrapper } from 'lib/components/RelayWrapper'
import { EnsName } from 'lib/components/EnsName'

function RelayDashboard() {
  const router = useRouter()
  const { relayHubAddress, relayAddress, relayUrl } = router.query

  return (
    <MainLayout>
      <Section>
        <DynamicApolloWrapper>
          <RelayWrapper
            relayHubAddress={relayHubAddress}
            relayAddress={relayAddress}
            relayUrl={relayUrl}
          >
              {(relayWrapperProps) => {
                return (
                  <p className='pb-4 font-silkaRegular text-gray-500'>
                    <Link href='/relays'><a>Relay Hubs</a></Link> &raquo;&nbsp;
                    <Link href={`/relay-hubs/${relayWrapperProps.relayHubAddress}`}>
                      <a>
                        <span className='wrap-everything'>
                          <EnsName
                            address={relayWrapperProps.relayHubAddress}
                            shorten
                          />
                        </span>
                      </a>
                    </Link> &raquo;&nbsp;
                    <Link href='/relays'><a>Relays</a></Link> &raquo;&nbsp;
                    <span className='wrap-everything text-gray-900'>
                      {
                        relayWrapperProps.relayAddress ?
                          <EnsName
                            address={relayWrapperProps.relayAddress}
                            shorten
                          /> :
                          relayWrapperProps.relayUrl
                      }
                    </span>
                  </p>
                )
              }}
          </RelayWrapper>
          <RelayForm
            relayHubAddress={relayHubAddress}
            relayAddress={relayAddress}
            relayUrl={relayUrl}
          />
        </DynamicApolloWrapper>
      </Section>
    </MainLayout>
  )
}

export default RelayDashboard;
