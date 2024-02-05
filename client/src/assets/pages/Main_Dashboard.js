import React, { useEffect, useState } from 'react';
import Sidebar from '../components/Sidebar';
import '../pages/Main-Dashboard.css';
import { useNavigate } from 'react-router-dom';
import userIcon from '../Icons/image@2x.png';
import dashboardIcon from '../Icons/bars-sort.png';
import { useSelector } from 'react-redux';

function Main_Dashboard(props) {
  const navigate = useNavigate();
  const userFirstName = useSelector(state => state.userReducer.userData?.firstName);

  return (
    <main className="Dashboard-Section">
      <div className="left-Subsection">
        <Sidebar />
      </div>
      <div className="right-Subsection">
        <div className="header">
          <div className="title">
            <img src={dashboardIcon} alt="" />
            <p>{props.title}</p>
          </div>
          <div className="profile">
            <span>
              <img
                src={userIcon}
                onClick={() => {
                  navigate('/profile');
                }}
              />
            </span>
            <div className="user-profile">
              <p>{userFirstName}</p>
              <p>USER</p>
            </div>
          </div>
        </div>
        <div className="screenContent">{props.screen}</div>
      </div>
    </main>
  );
}

export default Main_Dashboard;
