import React from 'react'

import { HorizontalCard } from 'lib/components/HorizontalCard'

import ParticipateStar from '~/images/participate-star.svg'
import ManageStar from '~/images/manage-star.svg'

export const GSNTools = function() {
  return (
    <div className='pt-10 pb-20 bg-gray-100 -mb-64'>
      <div className='container'>
        <div className='text-center mb-1'>
          <h2 className='font-silkaMedium tracking-wider uppercase text-sm'>
            GSN Tools
          </h2>
        </div>

        <div className='flex flex-wrap lg:-mx-32'>
          <div className='lg:max-w-1/2 mt-4 sm:mt-16 mb-4 lg:px-6'>
            <HorizontalCard
              img={<ManageStar />}
              title='Manage your application &gt;'
              text='In order to pay the gas for the transactions on behalf of your users, you need to maintain an ETH balance. Use this tool to add your application and top up your balance.'
              btnUrl='/recipients'
              btnText='See Dapp Tool'
            />
          </div>

          <div className='lg:max-w-1/2 mt-16 mb-4 lg:px-6'>
            <HorizontalCard
              img={<ParticipateStar />}
              title='Participate in the network &gt;'
              text='Spin up your own relayer and earn fees for every transaction you put on the blockchain. Use this tool to add new relayers and edit their settings.'
              btnUrl='/relays'
              btnText='See Relayer Tool'
            />
          </div>
        </div>
      </div>
    </div>    
  )
}