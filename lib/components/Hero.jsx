import React from 'react'

export const Hero = function() {
  return (
    <div className='pt-20 pb-12 bg-gray-100'>
      <div className='container'>
        <div className='w-9/12 mx-auto'>
          <div className='text-center'>
            <h1 className='font-silkaSemiBold text-4xl'>
              GSN is the final onboarding solution for Ethereum applications
            </h1>
            <h2 className='text-md opacity-80 subpixel-antialiased tracking-wide mt-2 mb-4 py-4'>
              Turn your dapps into apps. Free your users. No more Metamask. No more gas.
            </h2>

            <a
              href='#'
              className='font-silkaSemiBold shadow uppercase rounded tracking-wider bg-indigo-500 hover:bg-indigo-600 text-white p-2 px-4 inline-block trans trans-slow'
            >
              Use GSN in your application
            </a>
            <p className='font-light text-sm tracking-wide'>
              Check out the <a href='https://github.com/tabookey/tabookey-gasless'>GitHub Repo</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}