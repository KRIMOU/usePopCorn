import React from 'react'
import Search from '../Search'
import Logo from '../Logo'
import SearchResults from '../SearchResults'

export default function Navbar({ children }) {
  return (
    <nav className="nav-bar">
      <Logo />
      {children}
    </nav>
  )
}
