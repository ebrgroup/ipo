import "./sidebar.css";
import ipoImg from "../../../assets/Icons/IPO_Img.png";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../../assets/states/actions/user-action';
import { registerIPHelp } from "../../../assets/states/actions/Helpdesk-Content";

function Sidebar() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleLogout = () => {
        navigate("/signin");
    };

    const toggle_Sidebar = useSelector(state => state.toggleReducer?.val);

    const handleRegerterIP = () => {
        navigate("/registeripo")
    }
    return (
        <div className={`sidebar ${!toggle_Sidebar ? 'close' : 'open'}`}>
            <div className='upper-menu-container'>
                <div className='sidebar-header'>
                    <img
                        loading="eager"
                        alt="IPO Pakistan"
                        src={ipoImg}
                    />
                    <b>Intellectual Property Organization</b>
                </div>
                <div className='menu-heading'>Menu</div>
                <hr className='hr-element' />
                <div className='menu-items-container'>
                    <div className="menu-item-active menu-item" onClick={() => navigate("/dashboard")}>
                        <i className="fa-sharp fa-light fa-gauge"></i>
                        <p className="title">Dashboard</p>
                    </div>
                    <div className="menu-item" onClick={handleRegerterIP}>
                        <i className="fa-sharp fa-light fa-grid-2"></i>
                        <p className="title">Register IP</p>
                    </div>
                    <div className="menu-item" onClick={() => navigate("/searchip")}>
                        <i className="fa-sharp fa-light fa-grid-2"></i>
                        <p className="title">Search IP</p>
                    </div>
                    <div className="menu-item" onClick={() => navigate("/trackip")}>
                        <i className="fa-sharp fa-light fa-grid-2"></i>
                        <p className="title">Track My IP Status</p>
                    </div>
                </div>
            </div>
            <div className='lower-menu-container'>
                <hr className='hr-element' />
                <div className='lower-item2'>
                    <span className='lower-item' onClick={() => navigate("/profile")}>
                        <span className="settingsSpan">
                            <box-icon name="user-circle" color="white" size="1.2rem" />
                        </span>
                        <p>Profile</p>
                    </span>
                    <span className='lower-item' onClick={() => navigate("/changepassword")}>
                        <span className="settingsSpan">
                            <box-icon name="cog" color="white" size="1.2rem" />
                        </span>
                        <p>Change Password</p>
                    </span>
                    <span className='lower-item' onClick={handleLogout}>
                        <span className="logoutSpan">
                            <box-icon name="log-out" color="white" size="1.2rem" />
                        </span>
                        <p>Logout</p>
                    </span>
                </div>
            </div>
        </div>
    );
}

export default Sidebar;
