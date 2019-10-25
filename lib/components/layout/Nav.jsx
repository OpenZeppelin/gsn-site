import React, { Component } from 'react'
import classnames from 'classnames'
import Link from 'next/link'

import { NavLink } from './NavLink'

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
        <nav className='flex items-center justify-between flex-wrap bg-white py-2'>
          <div className='text-blue-900 mr-6'>
            <Link href='/'>
              <a
                className='flex text-indigo-500 hover:text-indigo-200 mr-4 my-3 lg:my-2 lg:mt-3'
                title='Home'
              >
                <span className='font-silkaBlack text-4xl leading-none text-indigo-500 mr-4'>G<span className='text-blue-300'>S</span><span className='text-teal-200'>N</span></span>
                <span className='font-silkaSemiBold text-lg text-blue-900 nav-title hidden sm:block'>Gas Station Network</span>
              </a>
            </Link>
          </div>
          <div className='block md:hidden text-right'>
            <button
              onClick={this.toggleMenu}
              className='burger flex bg-white border-gray-100 items-center px-3 py-2 border-4 rounded text-gray-400'
            >
              <svg className='fill-current' height="32px" width="32px"><path d="M4,10h24c1.104,0,2-0.896,2-2s-0.896-2-2-2H4C2.896,6,2,6.896,2,8S2.896,10,4,10z M28,14H4c-1.104,0-2,0.896-2,2  s0.896,2,2,2h24c1.104,0,2-0.896,2-2S29.104,14,28,14z M28,22H4c-1.104,0-2,0.896-2,2s0.896,2,2,2h24c1.104,0,2-0.896,2-2  S29.104,22,28,22z" /></svg>
            </button>
          </div>
          <div
            className={classnames(
              'w-full flex-grow md:items-center md:w-auto md:flex trans trans-slow',
              {
                'animate-height-0': !this.state.menuOpen,
                'animate-height-40': this.state.menuOpen,
              }
            )}
          >
            <div className='text-sm md:flex-grow'></div>
            <div>
              <NavLink href='/recipients'>
                Dapp Tool
              </NavLink>
              <NavLink href='/relays'>
                Relayer Tool
              </NavLink>
              <NavLink target="_blank" href='https://explore.duneanalytics.com/dashboard/gsn-gas-station-network'>
                Network Stats
              </NavLink>
            </div>
          </div>
        </nav>
      </div>
    )
  }
}
