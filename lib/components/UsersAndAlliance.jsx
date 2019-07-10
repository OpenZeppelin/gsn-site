import React from 'react'

export const UsersAndAlliance = function() {
  return (
    <div className='pt-64 pb-64 bg-blue-900 -mb-64'>
      <div className='container'>
        <div className='text-center mb-1'>
          <h2 className='font-silkaSemiBold opacity-100 text-3xl text-white mb-16'>
            Users &amp; Alliance
          </h2>

          <div className='lg:w-2/3 mx-auto mb-24'>
            <blockquote className='font-silkaMedium text-white text-base sm:text-lg leading-relaxed'>
              “Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in dolor eget est blandit”
            </blockquote>
            <p className='text-white my-8'>
              <img
                srcSet='/static/eich.png 1x, /static/eich@2x.png 2x'
                src='/static/eich.png'
                alt='Brendan Eich photo'
                className='inline-block mr-4'
              />
              <strong className='font-helveticaNeueBold block sm:inline mt-4 sm:mt-0'>Brendan Eich</strong> <span className='invisible sm:visible'>|</span> Founder of Mozilla and Brave, Javascript creator.
            </p>
          </div>

          <div className='lg:w-2/3 mx-auto mb-24'>
            <blockquote className='font-silkaMedium text-white text-base sm:text-lg leading-relaxed'>
              “The Burner Wallet is a quick web wallet used to move small amounts of crypto quickly. On page load an Ethereum keypair is automatically generated and used to sign transactions with an incredibly simple interface. Sending funds is as easy as a QR code scan.”
            </blockquote>
            <p className='text-white my-8'>
              <img
                src='/static/austin.png'
                alt='Austin Griffith photo'
                className='inline-block mr-4'
                width='49'
              />
              <strong className='font-helveticaNeueBold block sm:inline mt-4 sm:mt-0'>Austin Griffith</strong> <span className='invisible sm:visible'>|</span> Creator of the <a href='https://github.com/austintgriffith/burner-wallet' className='text-blue-300 hover:text-indigo-300'>Burner Wallet</a>.
            </p>
          </div>
        </div>
      </div>
    </div>    
  )
}