import '../pages/IPO-Dashboard.css';
import trademarkIcon from '../Icons/icons8trademark641-1@2x.png'
import patentIcon from '../Icons/icons8patent64-1@2x.png'
import designIcon from '../Icons/icons8design64-1@2x.png'
import copyrightIcon from '../Icons/icons8copyright64-1@2x.png'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useEffect } from 'react'

function IPO_Dashboard(props) {

    const navigate = useNavigate();
    const userFirstName = useSelector(state => state.userReducer.userData?.firstName);

    useEffect(() => {
        props.Progress(50);
        props.Progress(100);


    }, [])
    return (

        <section className='dashboard'>
            <div className="IP-Section">
                <div className="Registered-IP">
                    <p className>Registered</p>
                    <div className="IPMenus">
                        <div className='Trademark menu'>
                            <p>8</p>
                            <p className="IP-title">TRADEMARK</p>
                            <img src={trademarkIcon} alt="" />
                        </div>

                        <div className='Copyright menu'>
                            <p>8</p>
                            <p className="IP-title">COPYRIGHT</p>
                            <img src={copyrightIcon} alt="" />
                        </div>

                        <div className='Patent menu'>
                            <p>8</p>
                            <p className="IP-title">PATENT</p>
                            <img src={patentIcon} alt="" />
                        </div>

                        <div className='Design menu'>
                            <p>8</p>
                            <p className="IP-title">DESIGN</p>
                            <img src={designIcon} alt="" />
                        </div>

                    </div>
                </div>

                <div className="Applied-IP">
                    <p className>Applied</p>
                    <div className="IPMenus">
                        <div className='Trademark menu'>
                            <p>8</p>
                            <p className="IP-title">TRADEMARK</p>
                            <img src={trademarkIcon} alt="" />
                        </div>

                        <div className='Copyright menu'>
                            <p>8</p>
                            <p className="IP-title">COPYRIGHT</p>
                            <img src={copyrightIcon} alt="" />
                        </div>

                        <div className='Patent menu'>
                            <p>8</p>
                            <p className="IP-title">PATENT</p>
                            <img src={patentIcon} alt="" />
                        </div>

                        <div className='Design menu'>
                            <p>8</p>
                            <p className="IP-title">DESIGN</p>
                            <img src={designIcon} alt="" />
                        </div>

                    </div>
                </div>
            </div>
        </section>
    )
}

export default IPO_Dashboard;
