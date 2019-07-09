import React from 'react'

import { Card } from 'lib/components/Card'

export const BuildSeamlessApps = function() {
  return (
    <div
      className='pt-20 pb-20 bg-gray-100'
    >
      <div className='container'>
        <div className='w-9/12 mx-auto'>
          <div className='text-center'>
            <h2 className='font-silkaSemiBold text-3xl'>
              Build a seamless application with GSN
            </h2>
            <p>
              Use the following SDKs to easily integrate your application with the Gas Station Network. Although you can do it by yourself, the following partners give you plug-play solutions to solve your onboarding needs.
            </p>
          </div>
        </div>

        <div className='flex flex-wrap -mx-24'>
          <div className='w-1/3 mt-20 mb-4 px-6'>
            <Card
              img='asdf'
              text='Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in dolor eget est blandit tincidunt. Vestibulum venenatis quam et libero vulputate pharetra. Proin non euismod risus. Maecenas vel arcu eu nunc egestas scelerisque quis viverra orci.'
              url='https://google.ca'
            />
          </div>

          <div className='w-1/3 mt-10 mb-4 px-6'>
            <Card
              img='asdf'
              text='Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in dolor eget est blandit tincidunt. Vestibulum venenatis quam et libero vulputate pharetra. Proin non euismod risus. Maecenas vel arcu eu nunc egestas scelerisque quis viverra orci.'
              url='https://google.ca'
              large
            />
          </div>

          <div className='w-1/3 mt-20 mb-4 px-6'>
            <Card
              img='asdf'
              text='Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in dolor eget est blandit tincidunt. Vestibulum venenatis quam et libero vulputate pharetra. Proin non euismod risus. Maecenas vel arcu eu nunc egestas scelerisque quis viverra orci.'
              url='https://google.ca'
            />
          </div>
        </div>
      </div>
    </div>    
  )
}