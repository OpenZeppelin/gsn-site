import React from 'react'

export const Card = ({ img, text, url, large }) => {

  const horizontalPadding = large ? 'px-16' : 'px-10'
  const verticalPadding = large ? 'pt-10 pb-24' : 'py-8'

  return (
    <div className='bg-white overflow-hidden shadow-md hover:shadow-lg trans trans-fast'>
      <div className='text-center flex justify-center p-12 h-30 border-solid border-b border-gray-400'>
        {img}
      </div>

      <div className={`${horizontalPadding} ${verticalPadding}`}>
        <p className='text-sm'>
          {text}
        </p>
      </div>
      <div className={`${horizontalPadding} pt-6 pb-12`}>
        <a className='font-silkaMedium uppercase text-sm' href={url}>Go To Link &gt;</a>
      </div>
    </div>
  )
}