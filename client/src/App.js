import { useEffect, useState } from 'react';
import ChangePass from './assets/components/ChangePass';
import UserProfile from './assets/components/UserProfile';
import IPO_Dashboard from './assets/pages/IPO_Dashboard';
import Main_Dashboard from './assets/pages/Main_Dashboard';
import AuthHome from './screens/AuthScreens/AuthHome';
import SignUp from "./screens/AuthScreens/Components/SignUp";
import SignIn from "./screens/AuthScreens/Components/SignIn";
import ForgotPassword from "./screens/AuthScreens/Components/ForgotPassword";
import CreateNewPassword from "./screens/AuthScreens/Components/CreateNewPassword";
import Verification from "./screens/AuthScreens/Components/Verification";
import { Route, Routes, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux';
import NotFoundPage from './assets/pages/NotFoundPage';
import LoadingBar from 'react-top-loading-bar'

import { ToastContainer } from "react-toastify";

function App() {

  const navigate = useNavigate();
  const isLogin = useSelector(state => state.userReducer?.isLoggedIn);
  const [progress, setProgress] = useState(0);

  const loadingProgress = (progress) => {
    setProgress(progress)
  }
  const [title, setTitle] = useState("");

  useEffect(() => {
    const path = document.location.pathname;

    if (path === "/")
      navigate("/signin");


    const protectedRoutes = ["/changepassword", "/dashboard", "/profile"];
    const autthRoutes = ["/sigin", "/signup", "/verification", "/forgotpassword", "/createnewpassword"]


    if (path === "/*") {
      navigate("*")
    }
    else if (!isLogin && protectedRoutes.includes(path)) {
      navigate("/signin");
    } else if (isLogin && autthRoutes.includes(path)) {
      navigate("/dashboard");
    }
    
    if (path === "/signin") 
      document.title = "Sign In - IPO";
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
    else if (path === "/profile")
      document.title = "Profile - IPO";
    else if (path === "/changepassword")
      document.title = "Change Password - IPO";
    setTitle(document.title.replace(" - IPO", ""));
  });

  return (
    <div className="App">
      < LoadingBar
        color='#f11946'
        progress={progress}
        loaderSpeed={500}
        height={2}
      />
      <Routes>
        <Route path='/dashboard' element={<Main_Dashboard screen={<IPO_Dashboard Progress={loadingProgress} />}   title={title} />} />
        <Route path='/changepassword' element={<Main_Dashboard screen={<ChangePass Progress={loadingProgress} />}  title={title} />} />
        <Route path='/profile' element={<Main_Dashboard screen={<UserProfile Progress={loadingProgress} />}  title={title} />} />
        <Route path="/signin" element={<AuthHome screen={<SignIn Progress={loadingProgress} />} />} />
        <Route path="/signup" element={<AuthHome screen={<SignUp Progress={loadingProgress} />} />} />
        <Route path="/forgotpassword" element={<AuthHome screen={<ForgotPassword Progress={loadingProgress} />} />} />
        <Route path="/verification" element={<AuthHome screen={<Verification Progress={loadingProgress} />} />} />
        <Route path="/createnewpassword" element={<AuthHome screen={<CreateNewPassword Progress={loadingProgress} />} />} />
        <Route path="/createnewpassword/:userToken" element={<AuthHome screen={<CreateNewPassword />} />} />
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
        style={{marginTop: "5vh"}}
      />
    </div >
  );
}

export default App;
