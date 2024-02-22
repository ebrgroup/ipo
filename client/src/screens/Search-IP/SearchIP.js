import React, { useEffect } from 'react'
import Navbar from '../global-components/IP-Lookup Navbar/Navbar'
import './searchIP.css'
import IPGridveiw from '../global-components/IP-Lookup Table/IPGridveiw.js'

const SearchIP = ({ Progress }) => {

  useEffect(() => {
    Progress(100);
  }, [])
  return (
    <>
      <section id='SearchIP-container'>
        <Navbar searchTitle = 'Search IP...' />
        <div>
          <IPGridveiw  />
        </div>
      </section>
    </>
  )
}

export default SearchIP
