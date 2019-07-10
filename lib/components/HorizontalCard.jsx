import React from 'react'
import Link from 'next/link'

export const HorizontalCard = ({ title, img, text, btnText, btnUrl }) => {

  return (
    <div class="card-custom-height w-full lg:flex">
      <div class="bg-white flex flex-wrap shadow-md hover:shadow-lg rounded flex flex-col justify-between trans trans-fast">
        <div class="px-10 py-12 w-26">
          {img}
        </div>
        
        <div class="w-auto pt-8 pr-48 mb-8">
          <div class="text-gray-900 font-silkaMedium text-xl mb-4">
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

          <p className='text-sm h-32 leading-relaxed'>
            {text}
          </p>

          <Link
            href={btnUrl}
          >
            <a
              className='uppercase font-silkaMedium flex-shrink-0 text-xs bg-white border-solid border border-blue-900 hover:bg-black focus:outline-none focus:shadow-outline text-blue-900 hover:text-white font-bold py-2 px-4 rounded-lg cursor-pointer tracking-wider'
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