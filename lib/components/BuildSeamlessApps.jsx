import React from 'react'

import { Card } from 'lib/components/Card'

import PortisLogo from '~/images/portis-logo.svg'
import OpenZeppelinLogo from '~/images/open-zeppelin-logo.svg'

export const BuildSeamlessApps = function() {
  return (
    <div
      className='pt-20 pb-20 bg-gray-100'
    >
      <div className='container'>
        <div className='lg:w-9/12 mx-auto text-center mb-8'>
          <h2 className='font-silkaSemiBold text-2xl md:text-3xl pb-6 lg:pb-0'>
            Build a seamless application with GSN
          </h2>

          <p className='text-sm md:text-base'>
            Use the following SDKs to easily integrate your application with the Gas Station Network. Although you can do it by yourself, the following partners give you plug-play solutions to solve your onboarding needs.
          </p>
        </div>

        <div className='flex flex-wrap lg:-mx-32'>
          <div className='max-w-auto lg:max-w-sm mt-6 lg:mt-20 mb-4 lg:px-6'>
            <Card
              img={<PortisLogo className='w-2/3 lg:w-auto' />}
              text='With the Portis SDK, DApps get a standard web3 provider, and thanks to E2E encryption, their users get a non-custodial wallet and can sign transactions. all using their existing browser, with a familiar email and password login flow - no installation required!'
              url='https://developers.portis.io'
            />
          </div>

          <div className='card-custom-max-width max-w-auto lg:max-w-sm mt-6 lg:mt-10 mb-4 lg:px-6'>
            <Card
              img={<OpenZeppelinLogo className='w-2/3 lg:w-auto' />}
              text='OpenZeppelin is a battle-tested library of reusable smart contracts for Ethereum and other blockchains. Reduce the risk of vulnerabilities in your applications by using standard, tested, community-reviewed code. Using industry standard contract security patterns and best practices.'
              url='https://openzeppelin.org'
              large
            />
          </div>

          <div className='max-w-auto lg:max-w-sm mt-6 lg:mt-20 mb-4 lg:px-6'>
            <Card
              img={<img
                srcSet='/static/tabookey-logo.png 1x, /static/tabookey-logo@2x.png 2x'
                src='/static/tabookey-logo.png'
                alt='Tabookey logo'
                className='mx-auto'
              />}
              text='TabooKey started this project. It invented the GSN (EIP 1613) so dapps have a trustless decentralized way of onboarding new users with no ETH to pay for gas fees, or even users with no wallet at all!'
              url='https://www.tabookey.com'
            />
          </div>
        </div>
      </div>
    </div>    
  )
}