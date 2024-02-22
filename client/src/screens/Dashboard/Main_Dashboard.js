import Sidebar from '../global-components/Sidebar/Sidebar';
import './Main-Dashboard.css';
import { useNavigate } from 'react-router-dom';
import userIcon from '../../assets/Icons/image@2x.png';
import dashboardIcon from '../../assets/Icons/bars-sort.png';
import { useSelector, useDispatch } from 'react-redux';
import { toggleSidebar } from '../../assets/states/actions/Toggle-Sidebar';
import { useState } from 'react';
import ProfileDropdown from '../global-components/ProfileDropDown/ProfileDropdown';

function Main_Dashboard(props) {
  const navigate = useNavigate();
  const userFirstName = useSelector(state => state.userReducer.userData?.firstName);
  const [toggleBar, setToggleBar] = useState(false);
  const dispatch = useDispatch()

  const toggle = () => {
    setToggleBar(!toggleBar)
    dispatch(toggleSidebar(toggleBar));
  }

  const toggle_Sidebar = useSelector(state => state.toggleReducer?.val); //Complete user details in {User} object

  const [showProfileDropdown, setShowProfileDropdown] = useState(false);

  return (
    <main className="Dashboard-Section">
      <div className={`left-Subsection ${!toggle_Sidebar ? 'close' : 'open'}`} >
        <Sidebar />
      </div>
      <div className="right-Subsection">
        <div className="header">
          <div className="title">
            <img src={dashboardIcon} onClick={toggle} alt="" />
            <p>{props.title}</p>
          </div>
          <div className="profile">
            <span>
              <img
                src={userIcon}
                onClick={() => {
                  setShowProfileDropdown(!showProfileDropdown);
                }}
              />
            </span>
            <div className="user-profile">
              <p className='firstName' onClick={() => {
                setShowProfileDropdown(!showProfileDropdown);
              }}>{userFirstName}</p>
              <p>USER</p>
            </div>
          </div>
          {showProfileDropdown && <ProfileDropdown setShowProfileDropdown={setShowProfileDropdown} />}
        </div>
        <div className="screenContent">{props.screen}</div>
      </div>
    </main>
  );
}

export default Main_Dashboard;
