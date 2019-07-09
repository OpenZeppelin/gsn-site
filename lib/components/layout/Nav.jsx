import React, { Component } from 'react'
import classnames from 'classnames'
import Link from 'next/link'

export const Nav = class _Nav extends Component {
  state = {
    menuOpen: false
  }

  toggleMenu = () => {
    this.setState({ menuOpen: !this.state.menuOpen })
  }
  
  render () {
    return (
      <div className='container'>
        <nav className='flex items-center justify-between flex-wrap bg-white py-4'>
          <div className='flex items-center flex-shrink-0 text-blue-900 mr-6'>
            <Link href='/'>
              <a
                className='flex mt-4 lg:mt-0 text-indigo-500 hover:text-indigo-200 mr-4'
                title='Home'
              >
                <span className='font-silkaBlack text-4xl leading-none text-indigo-500 mr-4'>G<span className='text-blue-300'>S</span><span className='text-teal-200'>N</span></span>
                <span className='font-silkaSemiBold text-lg text-blue-900 nav-title'>Gas Station Network</span>
              </a>
            </Link>
          </div>
          <div className='block lg:hidden'>
            <button
              onClick={this.toggleMenu}
              className='flex items-center px-3 py-2 border rounded text-indigo-500 border-indigo-300 hover:text-indigo-300'
            >
              <svg className='fill-current h-3 w-3' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'><title>Menu</title><path d='M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z' /></svg>
            </button>
          </div>
          <div
            className={classnames(
              'w-full sm:flex flex-grow lg:items-center lg:w-auto',
              {
                hidden: !this.state.menuOpen,
                block: this.state.menuOpen,
              }
            )}
          >
            <div className='text-sm lg:flex-grow'>
              

            </div>
            <div>
              <a href='#' className='inline-block font-silkaMedium text-bold text-sm px-4 py-2 leading-none border rounded text-black border-white hover:text-indigo-500 mt-4 lg:mt-0'>
                Section 1
              </a>
            </div>
          </div>
      </nav>
        </div>
        
    )
  }
}
