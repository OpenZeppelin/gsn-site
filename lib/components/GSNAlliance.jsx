import React from 'react'

import OpenZeppelinColorLogo from 'assets/images/open-zeppelin-color-logo.svg'
import PortisLogo from 'assets/images/portis-logo.svg'
import PillarLogo from 'assets/images/pillar-logo.svg'
import EFLogo from 'assets/images/ethfund.svg'
import GroundhogLogo from 'assets/images/groundhog-logo.svg'

export const GSNAlliance = function() {
  return (
    <div className='pt-10 pb-20 bg-white'>
      <div className='container'>
        <div className='text-center mb-1 mt-10'>
          <h2 className='font-silkaMedium tracking-wider uppercase text-sm'>
            GSN Alliance
          </h2>
        </div>

        <div className='flex flex-wrap justify-center items-center content-center -mx-6 mt-20'>
          <div className='md:w-1/4 mb-20 px-20 sm:px-12 md:px-6'>
            <a href='https://openzeppelin.org'>
              <img src={OpenZeppelinColorLogo} className='mx-auto hover:opacity-80 trans trans-fast' />
            </a>
          </div>
          <div className='md:w-1/4 mb-20 px-20 sm:px-12 md:px-6 md:-mt-1'>
            <a href='https://www.tabookey.com'>
              <img
                srcSet='/static/tabookey-logo.png 1x, /static/tabookey-logo@2x.png 2x'
                src='/static/tabookey-logo.png'
                alt='Tabookey logo'
                className='mx-auto hover:opacity-80 trans trans-fast'
              />
            </a>
          </div>
          <div className='md:w-1/4 mb-20 px-20 sm:px-12 md:px-6'>
            <a href='https://www.portis.io'>
              <img src={PortisLogo} className='mx-auto hover:opacity-80 trans trans-fast' width='98' height='30' />
            </a>
          </div>
          <div className='md:w-1/4 mb-20 px-20 sm:px-12 md:px-6'>
            <a href='https://pillarproject.io'>
              <img src={PillarLogo} className='mx-auto hover:opacity-80 trans trans-fast' />
            </a>
          </div>
          <div className='md:w-1/4 mb-20 px-20 sm:px-12 md:px-6'>
            <a href='https://groundhog.network'>
              <img src={GroundhogLogo} className='mx-auto hover:opacity-80 trans trans-fast' />
            </a>
          </div>
          <div className='md:w-1/4 mb-20 px-20 sm:px-12 md:px-6'>
            <a href='https://ethereum.foundation/'>
              <img src={EFLogo} className='mx-auto hover:opacity-80 trans trans-fast' />
            </a>
          </div>
          <div className='md:w-1/4 mb-20 px-20 sm:px-12 md:px-6 md:-mt-1'>
            <a href='https://www.metacartel.org'>
              <img
                srcSet='/static/metacartel-logo.png 1x, /static/metacartel-logo@2x.png 2x'
                src='/static/metacartel-logo.png'
                alt='MetaCartel logo'
                className='mx-auto hover:opacity-80 trans trans-fast'
              />
            </a>
          </div>
          <div className='md:w-1/4 mb-20 px-20 sm:px-12 md:px-6 -mt-6'>
            <a href='https://github.com/austintgriffith/burner-wallet'>
              <img
                srcSet='/static/burnerwallet-logo.png 1x, /static/burnerwallet-logo@2x.png 2x'
                src='/static/burnerwallet-logo.png'
                alt='burner wallet logo'
                className='mx-auto hover:opacity-80 trans trans-fast'
              />
            </a>
          </div>
        </div>

        <p className='text-sm text-center mb-10'>
          Spun up from the Metacartel organization. The GSN Alliance was formed to develop, deploy and maintain the system.
        </p>

      </div>
    </div>
  )
}
