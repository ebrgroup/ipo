import "../AuthHome.css";
import { useNavigate, useLocation } from 'react-router-dom';
import axios from "axios";
import { toast } from 'react-toastify';
import React, { useState,useEffect } from 'react';

const Verification = (props) => {

    const navigate = useNavigate();
    const { state } = useLocation();
    const newAccount = state && state.newAccount;
    const [formData, setFormData] = useState({
        emailCode: '',
        mobileCode: '',
        showEmailCodeError: false,
        showMobileCodeError: false
    });
    const [otpVerified, setOtpVerified] = useState(false);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        const getNumericValue = (input) => input.replace(/\D/g, '');
        let processedValue = getNumericValue(value).slice(0, 6);

        setFormData((prevFormData) => ({
          ...prevFormData,
          [name]: processedValue,
        }));
    };
    useEffect( () => {
        props.Progress(100);
    },[])

    const handleSubmit = async (e) => {
        props.Progress(40);
        e.preventDefault();

        if (!areRequiredFieldsEmpty()) {
            if(formData.mobileCode.length !== 6 || formData.emailCode.length !== 6) {
                handleToastDisplay("OTP should be of 6 digits!", "error");
                return;
            }
            if(formData.mobileCode !== "111111") {
                handleToastDisplay("Invalid OTP code!", "error");
                return;
            }

            await axios.post("/ipo/email/otpVerification", {
                enteredOTP: formData.emailCode
            }).then(response => {
                setOtpVerified(true);
            }).catch(error => {
                setOtpVerified(false);
                handleApiError(error);
            });
        }
        else {
            handleToastDisplay("Required fields must not be left empty.", "error");
            setFormData((prevFormData) => ({
                ...prevFormData,
                showEmailCodeError: true,
                showMobileCodeError: true
            }));
        }
    };

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

    const areRequiredFieldsEmpty = () => {
        return !(
            formData.emailCode && formData.mobileCode
        );
    };

    const handleApiError = (error) => {
        if (error.response !== undefined) {
            if (error.response.data) {
                handleToastDisplay(`${error.response.data.error}`, "error");
            } else {
                handleToastDisplay(`${error.response.status}, ${error.response.statusText}`, "error")
            }
        } else {
            handleToastDisplay("An unknown error occured. We are sorry for the inconvinience", "error");
        }
    };

    useEffect(() => {
        (async () => {
            if(otpVerified) {
                await axios.post(`/ipo/users`, newAccount)
                .then(response => {
                    props.Progress(100);
                    handleToastDisplay("You have successfully created your account!", "success");
                    navigate("/signin");
                }).catch(error => {
                    props.Progress(100);
                    setOtpVerified(false);
                    handleApiError(error);
                });
            }
        })();
    }, [otpVerified]);

    return (
        <div className="forgotPasswordDiv">
            <h2 className="formTypeHeading">
                Verification
            </h2>
            <p className="forgotPasswordText">
                You must have received an OTP code on your phone number and email, please enter the OTP codes to proceed.
            </p>
            <form className="createAccountForm" onSubmit={handleSubmit}>
                <div className="inputDiv">
                    <input
                        className="inputField"
                        placeholder="Mobile Verification Code"
                        type="text"
                        name="mobileCode"
                        value={formData.mobileCode}
                        onChange={handleInputChange}
                        onBlur={() => setFormData({ ...formData, showMobileCodeError: true })}
                        onFocus={() => setFormData({ ...formData, showMobileCodeError: false })}
                    />
                    <div className={`line ${formData.showMobileCodeError && formData.mobileCode.length < 6 ? "redLine" : ""}`} />
                    <span className="errorText">
                        {formData.showMobileCodeError ? 
                        (formData.mobileCode.length === 0 ? 
                        "This field is required." : (formData.mobileCode.length < 6 ? 
                        "Mobile code should have 6 digits." : "")) : ""}
                    </span>
                </div>
                <div className="inputDiv">
                    <input
                        className="inputField"
                        placeholder="Email Verification Code"
                        type="text"
                        name="emailCode"
                        value={formData.emailCode}
                        onChange={handleInputChange}
                        onBlur={() => setFormData({ ...formData, showEmailCodeError: true })}
                        onFocus={() => setFormData({ ...formData, showEmailCodeError: false })}
                    />
                    <div className={`line ${formData.showEmailCodeError && formData.emailCode.length < 11 ? "redLine" : ""}`} />
                    <span className="errorText">
                        {formData.showEmailCodeError ? 
                        (formData.emailCode.length === 0 ? 
                        "This field is required." : (formData.emailCode.length < 6 ? 
                        "Email code should have 6 digits." : "")) : ""}
                    </span>
                </div>
                <button 
                    className="submitButton sendRecoveryEmailButton" 
                    type="Submit" 
                >
                    Proceed
                </button>
            </form>
        </div>
    );
};

export default Verification;