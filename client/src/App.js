import { useEffect, useState } from 'react';

import './App.css'
import ChangePass from './screens/ChangePassword/ChangePass';
import UserProfile from './screens/User-Profile/UserProfile';
import IPO_Dashboard from './screens/Dashboard/components/IPO_Dashboard';
import Main_Dashboard from './screens/Dashboard/Main_Dashboard';
import AuthHome from './screens/AuthScreens/AuthHome';
import SignUp from "./screens/AuthScreens/Components/SignUp";
import SignIn from "./screens/AuthScreens/Components/SignIn";
import ForgotPassword from "./screens/AuthScreens/Components/ForgotPassword";
import CreateNewPassword from "./screens/AuthScreens/Components/CreateNewPassword";
import Verification from "./screens/AuthScreens/Components/Verification";
import { Route, Routes, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import NotFoundPage from './screens/Notfound-Page/NotFoundPage';
import LoadingBar from 'react-top-loading-bar'
import { ToastContainer } from "react-toastify";
import RegisterIPO from './screens/RegisterIPO/RegisterIPO';
import ConfirmProfile from './screens/RegisterIPO/Trademark/ConfirmProfile/ConfirmProfile';
import ReviewApplication from './screens/RegisterIPO/Trademark/ReviewApplication/ReviewApplication';
import Classification from './screens/RegisterIPO/Trademark/Classification/Classification';
import IPMenus from './screens/RegisterIPO/Trademark-Registration/IPMenus';
import Selfshowcase from './screens/RegisterIPO/Trademark-Registration/Selfshowcase';
import Registraionflow from './screens/RegisterIPO/Registraionflow';
import LogoDetails from './screens/RegisterIPO/Trademark-Registration/LogoDetails';
import SearchIP from './screens/Search-IP/SearchIP';
import TrackIIP from './screens/Track-IP/TrackIIP';
import ConfirmationScreen from './screens/RegisterIPO/components/Confirmation-for-continuation/ConfirmationScreen';
import OwnerDetails from './screens/RegisterIPO/components/Owner-details/OwnerDetails';
import FeeSubmission from './screens/RegisterIPO/components/FeeSubmission/FeeSubmission';
import { resetIpStates } from './assets/states/actions/IP-Lookup-actions/Tabledata-action';
import Successpayment from './screens/global-components/Success payment component/Successpayment';
import { registerIPHelp } from './assets/states/actions/Helpdesk-Content';
import { logout } from './assets/states/actions/user-action';
import { resetDetails } from './assets/states/actions/Trademark registration/Trademark-action';
import { resetcount } from './assets/states/actions/Count IP actions/countTrademark_action';
import { resetSidebar } from './assets/states/actions/Toggle-Sidebar';


function App() {

  const path = document.location.pathname;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isLogin = useSelector(state => state.userReducer?.isLoggedIn);

  const authRoutes = ["/signin", "/signup", "/forgotpassword",]
  const verifiRoutes = ["/verification", "/createnewpassword"]

  const [progress, setProgress] = useState(0);
  const [title, setTitle] = useState("");

  const loadingProgress = (progress) => {
    setProgress(progress)
  }

  useEffect(() => {

    if (path === "/")
      navigate("/signin");

    if (path === "/*") {
      navigate("*")
    }
    else if (!isLogin && (!authRoutes.includes(path) || verifiRoutes.includes(path))) {
      navigate("/signin");
    }
    else if (isLogin && authRoutes.includes(path)) {
      navigate("/dashboard");
    }

    if (path != '/searchip' && path != '/trackip') {

      dispatch(resetIpStates())
    }

    if (path === '/registeripo') {
      dispatch(registerIPHelp())
    }

    if (path === "/signin") {
      document.title = "Sign In - IPO";

      //Reset all redux states
      dispatch(resetIpStates())
      dispatch(logout());
      dispatch(resetDetails())
      dispatch(resetcount())
      dispatch(resetSidebar())

    }
    else if (path === "/signup")
      document.title = "Sign Up - IPO";
    else if (path === "/forgotpassword")
      document.title = "Forgot Password - IPO";
    else if (path === "/createpassword")
      document.title = "Create Password - IPO";
    else if (path === "/verification")
      document.title = "Verification - IPO";
    else if (path === "/dashboard")
      document.title = "Dashboard - IPO";
    else if (path === "/registeripo")
      document.title = "Register - IPO"
    else if (path === "/profile")
      document.title = "Profile - IPO";
    else if (path === "/changepassword")
      document.title = "Change Password - IPO";
    else if (path == "/registerip")
      document.title = "Register IP - IPO";
    else if (path == "/confirmationScreen")
      document.title = "Confirmation Screen - IPO";
    else if (path == "/selfshowcase")
      document.title = "Self Showcase - IPO";
    else if (path == "/classification")
      document.title = "Trademark Classification - IPO";
    else if (path == "/ownerDetails")
      document.title = "Owner and Business Details - IPO"
    else if (path == "/logodetails")
      document.title = "Logo Details - IPO"
    else if (path == "/feesubmission")
      document.title = "Fee Submission - IPO"
    else if (path == "/successpayment/:*")
      document.title = "Payment Success - IPO"
    else if (path == "/reviewapplication")
      document.title = "Review Application - IPO";
    else if (path == "/searchip")
      document.title = "Search IP - IPO"
    else if (path == "/trackip")
      document.title = "Track My IP - IPO"
    setTitle(document.title.replace(" - IPO", ""));
  }, [path]);

  return (
    <div className="App">
      < LoadingBar
        color='#f11946'
        progress={progress}
        loaderSpeed={500}
        height={2}
      />
      <Routes>
        <Route path='/dashboard' element={<Main_Dashboard screen={<IPO_Dashboard Progress={loadingProgress} />} title={title} />} />
        <Route path='/searchip' element={<Main_Dashboard screen={<SearchIP Progress={loadingProgress} />} title={title} />} />
        <Route path='/trackip' element={<Main_Dashboard screen={<TrackIIP Progress={loadingProgress} />} title={title} />} />
        <Route path='/registeripo' element={<Main_Dashboard screen={<RegisterIPO screen={<IPMenus Progress={loadingProgress} />} />} title={title} />} />
        <Route path='/confirmationScreen' element={<Main_Dashboard screen={<RegisterIPO screen={<ConfirmationScreen />} Progress={loadingProgress} />} title={title} />} />
        <Route path='/confirmprofile' element={<Main_Dashboard screen={<RegisterIPO screen={<ConfirmProfile Progress={loadingProgress} />} />} title={title} />} />
        <Route path='/selfshowcase' element={<Main_Dashboard screen={<RegisterIPO screen={<Selfshowcase Progress={loadingProgress} />} />} title={title} />} />
        <Route path='/classification' element={<Main_Dashboard screen={<Registraionflow screen={<Classification Progress={loadingProgress} />} />} title={title} />} />
        <Route path='/ownerDetails' element={<Main_Dashboard screen={<Registraionflow screen={<OwnerDetails Progress={loadingProgress} />} />} title={title} />} />
        <Route path='/logodetails' element={<Main_Dashboard screen={<Registraionflow screen={<LogoDetails Progress={loadingProgress} />} />} title={title} />} />
        <Route path='/reviewapplication' element={<Main_Dashboard screen={<Registraionflow screen={<ReviewApplication Progress={loadingProgress} />} />} title={title} />} />
        <Route path='/feesubmission' element={<Main_Dashboard screen={<Registraionflow screen={<FeeSubmission Progress={loadingProgress} />} />} title={title} />} />
        <Route path='/successpayment/:trackId' element={<Main_Dashboard screen={<Successpayment Progress={loadingProgress} />} title={title} />} />
        <Route path='/changepassword' element={<Main_Dashboard screen={<ChangePass Progress={loadingProgress} />} title={title} />} />
        <Route path='/profile' element={<Main_Dashboard screen={<UserProfile Progress={loadingProgress} />} title={title} />} />
        <Route path="/signin" element={<AuthHome screen={<SignIn Progress={loadingProgress} />} />} />
        <Route path="/signup" element={<AuthHome screen={<SignUp Progress={loadingProgress} />} />} />
        <Route path="/forgotpassword" element={<AuthHome screen={<ForgotPassword Progress={loadingProgress} />} />} />
        <Route path="/verification" element={<AuthHome screen={<Verification Progress={loadingProgress} />} />} />
        <Route path="/createnewpassword" element={<AuthHome screen={<CreateNewPassword Progress={loadingProgress} />} />} />
        <Route path="/createnewpassword/:userToken" element={<AuthHome screen={<CreateNewPassword Progress={loadingProgress} />} />} />
        <Route path='*' element={<NotFoundPage Progress={loadingProgress} />} />
      </Routes>
      <ToastContainer
        position="top-center"
        autoClose={4000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        style={{ marginTop: "5vh" }}
      />
    </div >
  );
}

export default App;
