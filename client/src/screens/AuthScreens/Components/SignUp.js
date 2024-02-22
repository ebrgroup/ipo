import "../AuthHome.css";
import { useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import axios from "axios";
import { toast } from 'react-toastify';
import Combobox from "../../global-components/Combobox/Combobox";

const SignUp = (props) => {

    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        cnic: '',
        email: '',
        serviceProvider: 'Service Provider',
        phone: '',
        password: '',
        confirmPassword: '',
        agreeTerms: false,
        showPassword: false,
        showConfirmPassword: false,
        isProviderMenuActive: false,
        providerMenuOptions: [ "Mobilink", "Telenor", "Ufone", "Warid", "Zong" ],
        showCnicError: false,
        showEmailError: false,
        showPhoneError: false,
        showPasswordError: false,
        showConfirmPasswordError: false,
        showServiceProviderError: false,
        showAgreeTermsError: false
    });
    const [validatedUser, setValidatedUser] = useState(false);

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        const getNumericValue = (input) => input.replace(/\D/g, '');
        let processedValue = value;

        switch (name) {
            case 'cnic':
                processedValue = getNumericValue(value).slice(0, 13);
                break;
            case 'phone':
            case 'landlineNum':
            case 'faxNum':
                processedValue = getNumericValue(value).slice(0, 11);
                break;
            default:
                break;
        }

        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: type === 'checkbox' ? checked : processedValue,
        }));
    };

    useEffect(() => {
        props.Progress(100);
    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault();
        if(!areRequiredFieldsEmpty())
        {
            props.Progress(10);

            if (formData.password !== formData.confirmPassword) {
                handleToastDisplay("Passwords do not match!", "error");
                props.Progress(0);
                return;
            }
            if (formData.cnic.length !== 13) {
                handleToastDisplay("CNIC should be 13 digits long.", "error");
                props.Progress(0);
                return;
            }
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            props.Progress(20);

            if (!emailRegex.test(formData.email)) {
                handleToastDisplay("Invalid email format!", "error");
                props.Progress(0);
                return;
            }
            if (formData.phone.length !== 11) {
                handleToastDisplay("Phone no. should be 11 digits long.", "error");
                props.Progress(0);
                return;
            }
            const passwordRegex = /^(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\-])(?=.*\d)(?=.*[A-Z]).{8,}$/;
            props.Progress(30);

            if (!passwordRegex.test(formData.password)) {
                handleToastDisplay("Password must have atleast eight characters with atleast one special character, uppercase letter, and number.", "error");
                props.Progress(0);
                return;
            }
            props.Progress(40);

            await axios.post(`/ipo/users/validate`, formData)
            .then(response => {
                props.Progress(50);
                setValidatedUser(true);
            }).catch(error => {
                setValidatedUser(false);
                handleApiError(error);
            });
        }
        else {
            handleToastDisplay("Required fields must not be left empty.", "error");
            setFormData((prevFormData) => ({
                ...prevFormData,
                showCnicError: true,
                showEmailError: true,
                showPhoneError: true,
                showPasswordError: true,
                showConfirmPasswordError: true,
                showServiceProviderError: true,
                showAgreeTermsError: true
            }));
        }
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
        if (validatedUser) {
            (async () => {
                await axios.post("/ipo/email/sendEmail", { email: formData.email, isOTPEmail: true })
                .then(response => {
                    props.Progress(100);
                    handleToastDisplay("OTP has been sent to your email", "success");
                    navigate("/verification", { state: { newAccount: formData } });
                }).catch(error => {
                    props.Progress(100);
                    setValidatedUser(false);
                    handleApiError(error);
                    return false;
                })
            })();
        }
    }, [validatedUser]);
    

    const areRequiredFieldsEmpty = () => {
        return !(Object.entries(formData).every(([key, value]) => {
            if (['showPassword', 'showConfirmPassword', 'isProviderMenuActive', 'showCnicError', 'showEmailError', 
            'showPhoneError', 'showPasswordError', 'showConfirmPasswordError', 'showAgreeTermsError'].includes(key)) {
                return true;
            } else if (key === 'serviceProvider' && value === "Service Provider") {
                return false;
            }
            return value; 
        }));
    };

    const handleAgreeTermsChange = () => {
        setFormData((prevFormData) => ({
            ...prevFormData,
            agreeTerms: !prevFormData.agreeTerms,
            showAgreeTermsError: true
        }));
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

    const toggleMenu = (menuType) => {
        if(menuType === "serviceProvider")
        {
            setFormData(prevFormData => ({
                ...prevFormData,
                isProviderMenuActive: !formData.isProviderMenuActive,
            }));
        }
    };

    const handleOptionClick = (optionText, menuType) => {
        toggleMenu(menuType);

        setFormData((prevFormData) => ({
            ...prevFormData,
            [menuType]: optionText
        }));
    };

    return (
        <div className="forgotPasswordDiv">
            <h2 className="formTypeHeading">
                Create a new account
            </h2>
            <p className="newUserText">Already have an account? <span className="newAccountText" onClick={() => navigate("/signin")}>Sign In</span></p>
            <form className="createAccountForm" onSubmit={handleSubmit}>
                <div className="inputDiv signUpInputDiv">
                    <input
                        className="inputField"
                        placeholder="CNIC"
                        type="text"
                        name="cnic"
                        value={formData.cnic}
                        onChange={handleInputChange}
                        onBlur={() => setFormData({ ...formData, showCnicError: true })}
                        onF
                        onFocus={() => setFormData({ ...formData, showCnicError: false })}
                    />
                    <div className={`line ${formData.showCnicError && formData.cnic.length < 13 ? "redLine" : ""}`} />
                    <span className="errorText">
                        {formData.showCnicError ? 
                        (formData.cnic.length === 0 ? 
                        "This field is required." : (formData.cnic.length < 13 ? 
                        "CNIC should have 13 digits." : "")) : ""}
                    </span>
                </div>
                <div className="inputDiv signUpInputDiv">
                    <input
                        className="inputField"
                        placeholder="Email address"
                        type="text"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        onBlur={() => setFormData({ ...formData, showEmailError: true })}
                        onFocus={() => setFormData({ ...formData, showEmailError: false })}
                    />
                    <div className={`line ${formData.showEmailError && formData.email.length == 0 ? "redLine" : ""}`} />
                    <span className="errorText">
                        {formData.showEmailError ? 
                        (formData.email.length === 0 ? 
                        "This field is required." : (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email) ? 
                        "Email address should be of valid format." : "")) : ""}
                    </span>
                </div>
                <div className="twoInputFieldsDiv serviceProviderDivMargin">
                    <span>
                        <Combobox
                            selectedItem={formData.serviceProvider}
                            menuType="serviceProvider"
                            isMenuActive={formData.isProviderMenuActive}
                            toggleMenu={toggleMenu}
                            options={formData.providerMenuOptions}
                            handleOptionClick={handleOptionClick}
                            width="12.1vw"
                            isRedShadow={formData.showServiceProviderError && formData.serviceProvider === "Service Provider"}
                        />
                        <span className="errorText comboboxErrorMargin">
                            {formData.showServiceProviderError && formData.serviceProvider === "Service Provider"
                            ? "This field is required." : ""}
                        </span>
                    </span>
                    <div className="inputDiv signUpInputDiv">
                        <input
                            className="inputField phoneNumberField"
                            placeholder="Phone number"
                            type="text"
                            name="phone"
                            value={formData.phone}
                            onChange={handleInputChange}
                            onBlur={() => setFormData({ ...formData, showPhoneError: true })}
                            onFocus={() => setFormData({ ...formData, showPhoneError: false })}
                        />
                        <div className={`line ${formData.showPhoneError && formData.phone.length < 11 ? "redLine" : ""}`} />
                        <span className="errorText">
                            {formData.showPhoneError ? 
                            (formData.phone.length === 0 ? 
                            "This field is required." : (formData.phone.length < 11 ? 
                            "Phone number should have 11 digits." : "")) : ""}
                        </span>
                    </div>
                </div>
                <div className="inputDiv signUpInputDiv passwordDiv">
                    <input
                        className="inputField passwordField"
                        placeholder="Password"
                        type={formData.showPassword ? "text" : "password"}
                        name="password"
                        value={formData.password}
                        onChange={handleInputChange}
                        onBlur={() => setFormData({ ...formData, showPasswordError: true })}
                        onFocus={() => setFormData({ ...formData, showPasswordError: false })}
                    />
                    <span className="passwordIcon" onClick={() => setFormData((prevFormData) => ({...prevFormData, showPassword: !formData.showPassword}))}>
                        <box-icon name={formData.showPassword ? "hide" : "show"} color="grey" size="sm" />
                    </span>
                    <div className={`line ${formData.showPasswordError && formData.password.length == 0 ? "redLine" : ""}`} />
                    <span className="errorText">
                        {formData.showPasswordError ? 
                        (formData.password.length === 0 ? 
                        "This field is required." : (formData.password.length < 8 ?
                            "Password should atleast have eight characters." : (!/^(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\-])(?=.*\d)(?=.*[A-Z]).{8,}$/.test(formData.password) ? 
                            "Password requires a special character, a number, and an uppercase letter." : ""))) : ""}
                    </span>
                </div>
                <div className="inputDiv signUpInputDiv">
                    <input
                        className="inputField passwordField"
                        placeholder="Confirm password"
                        type={formData.showConfirmPassword ? "text" : "password"}
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleInputChange}
                        onBlur={() => setFormData({ ...formData, showConfirmPasswordError: true })}
                        onFocus={() => setFormData({ ...formData, showConfirmPasswordError: false })}
                    />
                    <span className="passwordIcon" onClick={() => setFormData((prevFormData) => ({...prevFormData, showConfirmPassword: !formData.showConfirmPassword}))}>
                        <box-icon name={formData.showConfirmPassword ? "hide" : "show"} color="grey" size="sm" />
                    </span>
                    <div className={`line ${formData.showConfirmPasswordError && formData.confirmPassword.length == 0 ? "redLine" : ""}`} />
                    <span className="errorText">
                        {formData.showConfirmPasswordError ? 
                        (formData.confirmPassword.length === 0 ? 
                        "This field is required." : (!(formData.password === formData.confirmPassword) ? 
                        "Passwords do not match" : "")) : ""}
                    </span>
                </div>
                <div className="twoInputFieldsDiv">
                    <input type="checkbox" className="agreeCheckBox" checked={formData.agreeTerms} onChange={handleAgreeTermsChange} />
                    <p className={formData.showAgreeTermsError && !formData.agreeTerms ? "redTermsText" : "termsText"}>
                        By clicking Create account, I agree that I have read and accepted the Terms of Use and Privacy Policy.
                    </p>
                </div>
                <button 
                    className="submitButton sendRecoveryEmailButton" 
                    type="Submit" 
                >
                    Sign Up
                </button>
            </form>
        </div>
    );
};

export default SignUp;