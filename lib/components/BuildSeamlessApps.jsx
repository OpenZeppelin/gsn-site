import React from 'react'

import { Card } from 'lib/components/Card'

import PortisLogo from 'assets/images/portis-logo.svg'
import OpenZeppelinLogo from 'assets/images/open-zeppelin-logo.svg'

export const BuildSeamlessApps = function() {
  return (
    <div
      className='pt-20 pb-2 sm:pb-20 bg-gray-100'
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

        <div className='flex flex-wrap lg:-mx-32 lg-margin-override'>
          <div className='flex card-custom-max-width lg-card-width-and-padding-override my-6 order-1 sm:mt-4 sm:px-6 lg:order-2 lg:max-w-sm'>
            <Card
              img={<img src={OpenZeppelinLogo} />}
              text={<div>
                      <b>OpenZeppelin</b> is a professional platform to develop blockchain based applications. <br/><br />
                      <b>OpenZeppelin SDK</b> makes smart contract development easy. Save hours of development time by compiling, upgrading, deploying, and interacting with smart contracts with our CLI. <br/><br/>
                      <b>Connect GSN</b> with our contracts, SDK and Starter Kits and start creating a seamless app today. <br/>
                    </div>
                    }
              url='https://docs.openzeppelin.com/openzeppelin/'
              large
            />
          </div>

          <div className='flex max-w-auto lg-card-width-and-padding-override mt-6 mb-6 order-2 sm:px-6 lg:my-20 lg:order-1 lg:max-w-sm'>
            <Card
              img={<img src={PortisLogo} />}
              text='With the Portis SDK, DApps get a standard web3 provider, and thanks to E2E encryption, their users get a non-custodial wallet and can sign transactions. all using their existing browser, with a familiar email and password login flow - no installation required!'
              url='https://developers.portis.io'
            />
          </div>

          <div className='flex max-w-auto lg-card-width-and-padding-override mt-6 order-3 sm:px-6 lg:my-20 lg:max-w-sm'>
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
