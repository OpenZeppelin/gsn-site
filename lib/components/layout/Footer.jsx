import React from 'react'
import Link from 'next/link'

import DeltaCampWhiteLogo from '~/images/delta-camp-white-logo.svg'
import OpenZeppelinWhiteLogo from '~/images/open-zeppelin-white-logo.svg'

export default () => (
  <footer className='bg-blue-900 text-white'>
    <div className='container pt-16 pb-6'>

      <nav className='flex items-center justify-between flex-wrap py-4'>
        <div className='flex items-center flex-shrink-0 text-blue-900 mr-6'>
          <a href='https://openzeppelin.org'><OpenZeppelinWhiteLogo /></a>
        </div>

        <div
          className='w-full sm:flex flex-grow lg:items-center lg:w-auto'
        >
          <div className='text-sm lg:flex-grow'></div>

          <a href='https://github.com/tabookey/tabookey-gasless' className='inline-block font-silkaMedium text-bold text-sm text-white pl-16 pt-1 leading-none mt-4 lg:mt-0'>
            GitHub
          </a>
          <a href='#' className='inline-block font-silkaMedium text-bold text-sm text-white pl-16 pt-1 leading-none mt-4 lg:mt-0'>
            Products
          </a>
          <Link href='/recipients'>
            <a href='#' className='inline-block font-silkaMedium text-bold text-sm text-white pl-16 pt-1 leading-none mt-4 lg:mt-0'>
              Dapp Tool
            </a>
          </Link>

          <Link href='/relay-hubs'>
            <a href='#' className='inline-block font-silkaMedium text-bold text-sm text-white pl-16 pt-1 leading-none mt-4 lg:mt-0'>
              Relayer Tool
            </a>
          </Link>
        </div>
      </nav>

      <p className='text-xxs text-white pt-6'>
        Developed by <a href='https://delta.camp'><DeltaCampWhiteLogo className='inline-block' /></a>
      </p>
      <p className='text-xxs text-white'>
        &copy; {new Date().getFullYear()}. All rights reserved.&nbsp; |&nbsp; Privacy&nbsp; |&nbsp; Terms of Service
      </p>
    </div>
  </footer>
)