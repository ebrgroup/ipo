import React, { useEffect } from 'react'
import Navbar from '../global-components/IP-Lookup Navbar/Navbar'
import IPGridveiw from '../global-components/IP-Lookup Table/IPGridveiw';
import './trackIP.css'
const TrackIIP = ({ Progress }) => {
  useEffect(() => {
    Progress(100);
  }, [])
  return (
    <>
      <section id='TrackIP-container'>
        <Navbar searchTitle='Enter IP number to track status....' />
        <div>
          <IPGridveiw />
        </div>
      </section>
    </>
  )
}

export default TrackIIP
