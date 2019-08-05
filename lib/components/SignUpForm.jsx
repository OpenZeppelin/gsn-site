import React from 'react'

export const SignUpForm = function() {
  return (
    <div className='pt-10 pb-20 bg-gray-100 mb-0'>
      <div className='container'>
        <div className='flex justify-center items-center flex-row mb-1'>
          <form class='text-center' name="contact" method="POST" data-netlify="true">
            <h3 class='font-bold'> More GSN Tools are coming soon! </h3>
            <input class="large mb-4" type="email" name="email" placeholder="Enter your email..." />
            <button type="submit">Sign up</button>
          </form>
        </div>
      </div>
    </div>
  )
}
