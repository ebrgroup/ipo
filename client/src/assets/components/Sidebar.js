import React from 'react';
import "../components/sidebar.css";
import ipoImg from '../Icons/IPO_Img.png';
import settingIcon from '../Icons/settingIcon.png';
import logoutIcon from '../Icons/user-logout.png';
import menuIcon from '../Icons/menu-bar.png';
import { Link, useNavigate } from "react-router-dom";

import { logout } from '../states/actions/user-action';
import { useDispatch } from 'react-redux';

function Sidebar() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const handleLogout = () => {
        dispatch(logout())
        navigate("/signin")
    }

    return (
        <div className="sidebar">
           <div className='upper-menu-container'>
                <div className='sidebar-header'>
                    <img
                        loading="eager"
                        alt="IPO Pakistan"
                        src={ipoImg}
                    />
                    <b>Intellectual Property</b>
                </div>
                <div className='menu-heading'>Menu</div>
                <div className='menu-items-container'>
                <div className="menu-item-dashboard" onClick={() => navigate("/dashboard")}>
                            <div className="menu-icon">
                                <img src={menuIcon} alt="" />
                            </div>
                            <div className="title">
                                <Link to="/dashboard">Dashboard</Link>
                            </div>
                        </div>
                        <div className="menu-item" onClick={() => navigate("/dashboard")}>
                            <div className="menu-icon">
                                <img src={menuIcon} alt="" />
                            </div>
                            <div className="title">Register IP</div>
                        </div>
                        <div className="menu-item" onClick={() => navigate("/dashboard")}>
                            <div className="menu-icon">
                                <img src={menuIcon} alt="" />
                            </div>
                            <div className="title">Search IP</div>
                        </div>
                        <div className="menu-item" onClick={() => navigate("/dashboard")}>
                            <div className="menu-icon">
                                <img src={menuIcon} alt="" />
                            </div>
                            <div className="title" onClick={() => navigate("/dashboard")}>
                                Track IP Status
                            </div>
                        </div>
                </div>
            </div> 
            <div className='lower-menu-container'>
                <hr className='hr-element'></hr>
                    <div className='lower-item'>
                        <Link to="/changepassword">
                            <div>
                                <img src={settingIcon} alt="" />
                                <p>Change Password</p>
                            </div>
                        </Link>
                    </div>
                    <div className='lower-item2' onClick={handleLogout}>
                        <img className='logout-icon' src={logoutIcon} alt="" />
                        <p>Logout</p>
                    </div>
            </div>
        </div>
    );
}

export default Sidebar;