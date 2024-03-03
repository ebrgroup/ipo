import React, { useEffect } from 'react'
import Navbar from '../global-components/IP-Lookup Navbar/Navbar'
import './searchIP.css'
import IPGridveiw from '../global-components/IP-Lookup Table/IPGridveiw.js'
import { useSelector } from 'react-redux'

const SearchIP = ({ Progress }) => {

  const data = useSelector(state => state.IpLookup?.registeredIp?.response)
  useEffect(() => {
    Progress(100);
  }, [])
  return (
    <>
      <section id='SearchIP-container'>
        <Navbar searchTitle='Search IP...' />
        <div>
          <IPGridveiw rows={data} />
        </div>
      </section>
    </>
  )
}

export default SearchIP
