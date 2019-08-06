import React from 'react'

export const Hero = function() {
  return (
    <div className='pt-10 md:pt-20 pb-12 bg-gray-100'>
      <div className='container'>
        <div className='lg:w-9/12 mx-auto text-center'>
          <h1 className='font-silkaSemiBold text-xl md:text-4xl'>
            GSN is the ultimate onboarding solution for Ethereum applications
          </h1>
          <h2 className='text-sm md:text-md opacity-80 subpixel-antialiased tracking-wide mt-2 mb-4 py-4'>
            Turn your dapps into apps. Free your users. No more Metamask. No more gas.
          </h2>

          <a
            href='https://github.com/OpenZeppelin/openzeppelin-gsn-provider'
            className='font-silkaSemiBold shadow uppercase rounded tracking-wider bg-indigo-500 hover:bg-indigo-600 text-white hover:text-white p-2 px-4 inline-block trans trans-slow'
          >
            Use GSN in your application
          </a>
          <p className='font-light text-sm tracking-wide'>
            Check out the <a href='https://github.com/tabookey/tabookey-gasless'>GitHub Repo</a>
          </p>
        </div>
      </div>
    </div>
  )
}