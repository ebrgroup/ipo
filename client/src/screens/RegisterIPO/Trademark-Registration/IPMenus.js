import React from 'react'
import trademarkIcon from '../../../assets/Icons/icons8trademark641-1@2x.png'
import patentIcon from '../../../assets/Icons/icons8patent64-1@2x.png'
import copyrightIcon from '../../../assets/Icons/icons8copyright64-1@2x.png'
import designIcon from '../../../assets/Icons/icons8design64-1@2x.png'
import './ipMenus.css'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { registerCopyrightHelp, registerDesignHelp, registerPatentHelp, registerTrademarkHelp }
    from '../../../assets/states/actions/Helpdesk-Content'
import { useEffect } from 'react'

const IPMenus = ({Progress}) => {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    useEffect(()=>{
        Progress(100);
    },[])

    const trademarkBtnClick = () => {
        dispatch(registerTrademarkHelp())
        navigate('/confirmationScreen')
    }
    const copyrightBtnClick = () => {
        dispatch(registerCopyrightHelp())
        navigate('/confirmationScreen')
    }
    const patentBtnClick = () => {
        dispatch(registerPatentHelp())
        navigate('/confirmationScreen')
    }
    const designBtnClick = () => {
        dispatch(registerDesignHelp())
        navigate('/confirmationScreen')
    }
    return (
        <div className="IP-Menus">
            <div className='Ip-btn ' onClick={trademarkBtnClick}>
                <span>+</span>
                <h4 className="title">Register Trademark</h4>
                <img src={trademarkIcon} />
            </div>
            <div className='Ip-btn ' onClick={copyrightBtnClick}>
                <span>+</span>
                <h4 className="title">Register Copyright</h4>
                <img src={copyrightIcon} />
            </div>
            <div className='Ip-btn ' onClick={patentBtnClick}>
                <span>+</span>
                <h4 className="title">Register Patent</h4>
                <img src={patentIcon} />
            </div>
            <div className='Ip-btn ' onClick={designBtnClick}>
                <span>+</span>
                <h4 className="title">Register Design</h4>
                <img src={designIcon} />
            </div>
        </div>
    )
}

export default IPMenus
