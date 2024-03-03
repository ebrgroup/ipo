import './IPO-Dashboard.css';
import trademarkIcon from '../../../assets/Icons/icons8trademark641-1@2x.png'
import patentIcon from '../../../assets/Icons/icons8patent64-1@2x.png'
import designIcon from '../../../assets/Icons/icons8design64-1@2x.png'
import copyrightIcon from '../../../assets/Icons/icons8copyright64-1@2x.png'
import { useEffect } from 'react'
import { useSelector } from 'react-redux';


function IPO_Dashboard(props) {
    const {
        register,
        applied
    } = useSelector(state => state.countTrademark)
    useEffect(() => {
        props.Progress(100);
    }, [])
    return (

        <div className='dashboard'>
            <div className='registeredDiv'>
                <div className="Registered-IP">
                    <div className="dashboardHeadingDiv">
                        <p>Registered</p>
                    </div>
                    <div className="IPMenus">
                        <div className='Trademark menu'>
                            <p>{register}</p>
                            <p className="IP-title">TRADEMARK</p>
                            <img src={trademarkIcon} alt="" />
                        </div>

                        <div className='Copyright menu'>
                            <p>0</p>
                            <p className="IP-title">COPYRIGHT</p>
                            <img src={copyrightIcon} alt="" />
                        </div>

                        <div className='Patent menu'>
                            <p>0</p>
                            <p className="IP-title">PATENT</p>
                            <img src={patentIcon} alt="" />
                        </div>

                        <div className='Design menu'>
                            <p>0</p>
                            <p className="IP-title">DESIGN</p>
                            <img src={designIcon} alt="" />
                        </div>

                    </div>
                </div>
            </div>
            <div className='registeredDiv'>
                <div className="Applied-IP">
                    <div className="dashboardHeadingDiv">
                        <p>Applied</p>
                    </div>
                    <div className="IPMenus">
                        <div className='Trademark menu'>
                            <p>{applied}</p>
                            <p className="IP-title">TRADEMARK</p>
                            <img src={trademarkIcon} alt="" />
                        </div>

                        <div className='Copyright menu'>
                            <p>0</p>
                            <p className="IP-title">COPYRIGHT</p>
                            <img src={copyrightIcon} alt="" />
                        </div>

                        <div className='Patent menu'>
                            <p>0</p>
                            <p className="IP-title">PATENT</p>
                            <img src={patentIcon} alt="" />
                        </div>

                        <div className='Design menu'>
                            <p>0</p>
                            <p className="IP-title">DESIGN</p>
                            <img src={designIcon} alt="" />
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default IPO_Dashboard;
