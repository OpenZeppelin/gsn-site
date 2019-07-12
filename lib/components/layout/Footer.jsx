import React from 'react'
import Link from 'next/link'

import DeltaCampWhiteLogo from '~/images/delta-camp-white-logo3.svg'
import OpenZeppelinWhiteLogo from '~/images/open-zeppelin-white-logo.svg'

export default () => (
  <footer className='bg-blue-900 text-white'>
    <div className='container pt-16 pb-6'>

      <nav className='md:flex items-center justify-between flex-wrap py-4'>
        <div
          className='w-full sm:flex flex-grow lg:items-center lg:w-auto'
        >
          <div className='text-sm lg:flex-grow'></div>

          <a href='https://github.com/tabookey/tabookey-gasless' className='block md:inline-block font-silkaMedium text-bold text-sm text-white pr-6 lg:pr-0 lg:pl-16 pt-1 leading-none mt-4 lg:mt-0'>
            GitHub
          </a>
          <a href='#' className='block md:inline-block font-silkaMedium text-bold text-sm text-white pr-6 lg:pr-0 lg:pl-16 pt-1 leading-none mt-4 lg:mt-0'>
            Products
          </a>
          <Link href='/recipients'>
            <a href='#' className='block md:inline-block font-silkaMedium text-bold text-sm text-white pr-6 lg:pr-0 lg:pl-16 pt-1 leading-none mt-4 lg:mt-0'>
              Dapp Tool
            </a>
          </Link>

          <Link href='/relay-hubs'>
            <a href='#' className='block md:inline-block font-silkaMedium text-bold text-sm text-white pr-6 lg:pr-0 lg:pl-16 pt-1 leading-none mt-4 lg:mt-0'>
              Relayer Tool
            </a>
          </Link>
        </div>
      </nav>

      <p className='text-xxs text-white pt-6 opacity-100'>
        Website developed by <a href='https://delta.camp' target='_blank' rel='noreferrer'><DeltaCampWhiteLogo height='16' className='inline-block -my-2' /></a>
      </p>
      <p className='text-xxs text-white'>
        &copy; {new Date().getFullYear()}. All rights reserved.&nbsp; |&nbsp; Privacy&nbsp; |&nbsp; Terms of Service
      </p>
    </div>
  </footer>
)