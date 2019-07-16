import React from 'react'
import Link from 'next/link'

export const HorizontalCard = ({ title, img, text, btnText, btnUrl }) => {

  return (
    <div className="card-custom-height w-full lg:flex">
      <div className="bg-white flex flex-wrap shadow-md hover:shadow-lg rounded flex flex-col justify-between trans trans-fast">
        <div className="px-8 py-6 lg:px-10 lg:py-12 lg:w-26 m-auto sm:m-0">
          {img}
        </div>
        
        <div className="w-auto px-4 sm:px-8 py-2 lg:pt-8 lg:pr-48 mb-8">
          <div className="text-gray-900 font-silkaMedium text-base sm:text-xl mb-4">
            <Link
              href={btnUrl}
            >
              <a
                className='text-blue-900'
                title={btnText}
              >
                {title}
              </a>
            </Link>
          </div>

          <p className='text-sm pb-6 lg:pb-0 lg:h-32 leading-relaxed'>
            {text}
          </p>

          <Link
            href={btnUrl}
          >
            <a
              className='uppercase font-silkaMedium flex-shrink-0 text-xs bg-white border-solid border border-blue-900 hover:bg-black focus:outline-none focus:border-blue-400 text-blue-900 hover:text-white font-bold py-2 px-4 rounded-lg cursor-pointer tracking-wider'
              title={btnText}
            >
              {btnText}
            </a>
          </Link>
        </div>
        
        
      </div>
    </div>
  )
}