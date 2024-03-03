import React, { useEffect, useState } from 'react'
import './Successpayment.css'
import success from "../../../assets/Icons/success.gif";
import { useNavigate, useParams } from 'react-router-dom';
const Successpayment = () => {
    const navigate = useNavigate(null);
    const [id, setId] = useState('')

    const { trackId } = useParams();
    useEffect(() => {
        setId(trackId)
    }, [trackId])
    return (
        <div className='Success-container'>
            <img src={success} alt="" />
            <h3>Submit Successfully!</h3>
            <p>Your application has been successfully  submitted.
                <br />Your  <b>Track ID #{id}</b></p>
            <button className='trackBtn' onClick={() => navigate('/trackip')}>
                Track Trademark
            </button>
        </div>
    )
}

export default Successpayment


