import React from 'react'
import Link from 'next/link'

export const Card = ({ img, text, url, large }) => {

  const horizontalPadding = large ? 'px-6 sm:px-10 lg:px-16' : 'px-6 sm:px-10'
  const verticalPadding = large ? 'py-6 sm:py-8 lg:pt-10 lg:pb-24' : 'py-6 sm:py-8'

  return (
    <a href={url} target='_blank' rel='noreferrer' className='relative flex-grow bg-white overflow-hidden shadow-md hover:shadow-lg trans trans-fast lg:pb-10'>
      <div className='text-center flex justify-center p-6 lg:p-12 h-30 border-solid border-b border-gray-400'>
        {img}
      </div>

      <div className={`${horizontalPadding} ${verticalPadding} lg-card-description-padding-override`}>
        {text}
      </div>


      <div className='text-center flex justify-center'>
        <Link
          href={url}
        >
          <a
            className='uppercase font-silkaMedium flex-shrink-0 text-xs bg-white border-solid border border-blue-900 hover:bg-black focus:outline-none focus:border-blue-400 text-blue-900 hover:text-white font-bold py-2 px-4 rounded-lg cursor-pointer tracking-wider'
            title={'See More'}
          >
            See More
          </a>
        </Link>
      </div>
    </a>
  )
}
