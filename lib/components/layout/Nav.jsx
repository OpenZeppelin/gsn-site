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
      <nav className="flex items-center justify-between flex-wrap bg-white p-6">
        <div className="flex items-center flex-shrink-0 text-blue-900 mr-6">
          <svg className="fill-indigo h-8 w-8 mr-2" width="54" height="54" viewBox="0 0 54 54" xmlns="http://www.w3.org/2000/svg"><path d="M13.5 22.1c1.8-7.2 6.3-10.8 13.5-10.8 10.8 0 12.15 8.1 17.55 9.45 3.6.9 6.75-.45 9.45-4.05-1.8 7.2-6.3 10.8-13.5 10.8-10.8 0-12.15-8.1-17.55-9.45-3.6-.9-6.75.45-9.45 4.05zM0 38.3c1.8-7.2 6.3-10.8 13.5-10.8 10.8 0 12.15 8.1 17.55 9.45 3.6.9 6.75-.45 9.45-4.05-1.8 7.2-6.3 10.8-13.5 10.8-10.8 0-12.15-8.1-17.55-9.45-3.6-.9-6.75.45-9.45 4.05z" /></svg>
          <span className="font-semibold text-xl tracking-tight">Gas Station Network</span>
        </div>
        <div className="block lg:hidden">
          <button
            onClick={this.toggleMenu}
            className="flex items-center px-3 py-2 border rounded text-indigo-500 border-indigo-300 hover:text-indigo-300"
          >
            <svg className="fill-current h-3 w-3" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Menu</title><path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" /></svg>
          </button>
        </div>
        <div
          className={classnames(
            'w-full block flex-grow lg:flex lg:items-center lg:w-auto',
            {
              hidden: !this.state.menuOpen,
              block: this.state.menuOpen,
            }
          )}
        >
          <div className="text-sm lg:flex-grow">
            <Link href='/'><a
              className='block mt-4 lg:inline-block lg:mt-0 text-indigo-500 hover:text-indigo-200 mr-4'
              title='Home'>Home</a>
            </Link>

          </div>
          <div>
            <a href="#" className="inline-block text-sm px-4 py-2 leading-none border rounded text-indigo-500 border-indigo-500 hover:border-indigo-300 hover:text-indigo-300 mt-4 lg:mt-0">
              Download
            </a>
          </div>
        </div>
      </nav>
    )
  }
}
