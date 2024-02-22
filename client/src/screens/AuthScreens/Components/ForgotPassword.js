import "../AuthHome.css";
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import { toast } from 'react-toastify';
import React, { useEffect, useState } from 'react';

const ForgotPassword = (props) => {

    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [showEmailError, setShowEmailError] = useState(false);

    const handleInputChange = (e) => {
        setEmail(e.target.value);
    };

    useEffect(() => {
        props.Progress(100);
    }, []);

    const handleSubmit = async (e) => {
        props.Progress(40);
        e.preventDefault();

        if (email !== "") {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                setEmail("");
                handleToastDisplay("Invalid email format!", "error");
                return;
            }

        await axios.post("/ipo/email/sendEmail", { email, isOTPEmail: false })
        .then(response => {
            props.Progress(80);
            handleToastDisplay("Password recovery link has been sent to your email!", "success");
            props.Progress(100);
        }).catch(error => {
                setEmail("");
                props.Progress(100);
                if (error.response !== undefined) {
                    if (error.response.data) {
                        handleToastDisplay(`${error.response.data.error}`, "error");
                    } else {
                        handleToastDisplay(`${error.response.status}, ${error.response.statusText}`, "error")
                    }
                } else {
                    handleToastDisplay("An unknown error occured. We are sorry for the inconvinience", "error");
                }
            });
        }
        else {
            handleToastDisplay("Required email field must not be left empty.", "error");
            setShowEmailError(true);
        }
    }

    const handleToastDisplay = (message, type) => {
        const toastConfig = {
            position: "top-right",
            autoClose: 4000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
        };

        switch (type) {
            case "success":
                toast.success(message, toastConfig);
                break;
            case "error":
                toast.error(message, toastConfig);
                break;
            default:
                toast(message, toastConfig);
                break;
        }
    };

    return (
        <div className="forgotPasswordDiv">
            <h2 className="formTypeHeading">
                Forgot Password?
            </h2>
            <p className="forgotPasswordText">
                No worries! Just enter your email and we’ll send you a reset password link.
            </p>
            <form className="createAccountForm" onSubmit={handleSubmit}>
                <div className="inputDiv">
                    <input
                        className="inputField"
                        placeholder="Email Address"
                        type="text"
                        name="email"
                        value={email}
                        onChange={handleInputChange}
                        onBlur={() => setShowEmailError(true)}
                        onFocus={() => setShowEmailError(false)}
                    />
                    <div className={`line ${showEmailError && email.length == 0 ? "redLine" : ""}`} />
                    <span className="errorText">
                        {showEmailError ? 
                        (email.length === 0 ? 
                        "This field is required." : (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ? 
                        "Email address should be of valid format." : "")) : ""}
                    </span>
                </div>
                <button 
                    className="submitButton sendRecoveryEmailButton" 
                    type="submit"
                >
                    Send Recovery Email
                </button>
            </form>
            <p className="newUserText justRememberedText">Just remembered? <span className="newAccountText" onClick={() => navigate("/signin")} >Sign in</span></p>
        </div>
    );
}

export default ForgotPassword;