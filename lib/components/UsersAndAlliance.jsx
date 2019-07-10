import React from 'react'

export const UsersAndAlliance = function() {
  return (
    <div className='pt-64 pb-64 bg-blue-900 -mb-64'>
      <div className='container'>
        <div className='text-center mb-1'>
          <h2 className='font-silkaSemiBold opacity-100 text-3xl text-white mb-16'>
            Users &amp; Alliance
          </h2>

          <div className='w-2/3 mx-auto mb-24'>
            <blockquote className='font-silkaMedium text-white text-xl'>
              “Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in dolor eget est blandit”
            </blockquote>
            <p className='text-white my-8'>
              <img
                srcSet='/static/eich.png 1x, /static/eich@2x.png 2x'
                src='/static/eich.png'
                alt='Brendan Eich photo'
                className='inline-block mr-4'
              />
              <strong className='font-helveticaNeueBold'>Brendan Eich</strong> | Founder of Mozilla and Brave, Javascript creator.
            </p>
          </div>

          <div className='w-2/3 mx-auto mb-24'>
            <blockquote className='font-silkaMedium text-white text-xl'>
              “Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in dolor eget est blandit”
            </blockquote>
            <p className='text-white my-8'>
              <img
                srcSet='/static/eich.png 1x, /static/eich@2x.png 2x'
                src='/static/eich.png'
                alt='Brendan Eich photo'
                className='inline-block mr-4'
              />
              <strong className='font-helveticaNeueBold'>Brendan Eich</strong> | Founder of Mozilla and Brave, Javascript creator.
            </p>
          </div>
        </div>
      </div>
    </div>    
  )
}