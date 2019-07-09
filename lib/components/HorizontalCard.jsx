import React from 'react'
import Link from 'next/link'

export const HorizontalCard = ({ title, img, text, btnText, btnUrl }) => {

  return (
    <div class="max-w-lg w-full lg:flex">
      {img}

      <div class="border-r border-b border-l border-gray-400 lg:border-l-0 lg:border-t lg:border-gray-400 bg-white rounded-b lg:rounded-b-none lg:rounded-r p-4 flex flex-col justify-between leading-normal">
        <div class="mb-8">
          <div class="text-gray-900 font-silkaMedium text-xl mb-2">
            {title}
          </div>

          <p class="text-gray-700 text-base">
            {text}
          </p>
        </div>
        
        <div class="flex items-center">
          <Link
            href={btnUrl}
          >
            <a
              className='uppercase font-silkaMedium flex-shrink-0 text-xs bg-white border-solid border border-blue-900 hover:bg-black focus:outline-none focus:shadow-outline text-blue-900 hover:text-white font-bold py-2 px-4 rounded-lg cursor-pointer'
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