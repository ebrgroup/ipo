import "../AuthHome.css";
import { useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import axios from "axios";
import { toast } from 'react-toastify';
import Combobox from "../../../assets/components/Combobox/Combobox";
import CitySearchComboBox from "../../../assets/components/SearchComboBox/CitySearchComboBox";

const SignUp = (props) => {

    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        cnic: '',
        email: '',
        gender: '',
        firstName: '',
        lastName: '',
        serviceProvider: 'Service Provider',
        phone: '',
        landlineNum: '',
        faxNum: '',
        province: 'Province',
        city: 'City',
        address: '',
        password: '',
        confirmPassword: '',
        agreeTerms: false,
        showPassword: false,
        showConfirmPassword: false,
        isProviderMenuActive: false,
        isProvinceMenuActive: false,
        isCityMenuActive: false,
        providerMenuOptions: [ "Mobilink", "Telenor", "Ufone", "Warid", "Zong" ],
        provinceMenuOptions: [ 
            "Azad Jammu & Kashmir", "Balochistan", "FATA", "Gilgit Baltistan", "Islamabad Capital", "KPK", "Punjab", "Sindh"
        ]
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
        props.Progress(10);

        if (formData.password !== formData.confirmPassword) {
            handleToastDisplay("Passwords do not match!", "error");
            return;
        }
        if (formData.cnic.length !== 13) {
            handleToastDisplay("CNIC should be 13 digits long.", "error");
            return;
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        props.Progress(20);

        if (!emailRegex.test(formData.email)) {
            handleToastDisplay("Invalid email format!", "error");
            return;
        }
        if (formData.phone.length !== 11) {
            handleToastDisplay("Phone no. should be 11 digits long.", "error");
            return;
        }
        if (formData.landlineNum.length !== 0 && formData.landlineNum.length < 7) {
            handleToastDisplay("Landline no. should be 7-11 digits long.", "error");
            return;
        }
        if (formData.faxNum.length !== 0 && formData.faxNum.length < 7) {
            handleToastDisplay("Fax no. should be 7-11 digits long.", "error");
            return;
        }
        const passwordRegex = /^(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\-])(?=.*\d)(?=.*[A-Z]).{8,}$/;
        props.Progress(30);

        if (!passwordRegex.test(formData.password)) {
            handleToastDisplay("Password must have atleast eight characters with atleast one special character, uppercase letter, and number.", "error");
            return;
        }
        props.Progress(40);

        await axios.post(`/ipo/users/validate`, formData)
        .then(response => {
            props.Progress(50);
            setValidatedUser(true);
        }).catch(error => {
            props.Progress(100);
            setValidatedUser(false);
            handleApiError(error);
        });
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
            if (['landlineNum', 'faxNum', 'showPassword', 'showConfirmPassword', 'isProviderMenuActive', 'isProvinceMenuActive', 
                'isCityMenuActive'].includes(key)) {
                return true;
            } else if (key === 'serviceProvider' && value === "Service Provider") {
                return false;
            }
            else if (key === 'province' && value === "Province") {
                return false;
            }
            else if (key === 'city' && value === "City") {
                return false;
            }
            return value; 
        }));
    };

    const handleAgreeTermsChange = () => {
        setFormData((prevFormData) => ({
            ...prevFormData,
            agreeTerms: !prevFormData.agreeTerms,
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
                isProvinceMenuActive: false,
                isCityMenuActive: false
            }));
        }
        else if(menuType === "province")
        {
            setFormData(prevFormData => ({
                ...prevFormData,
                isProvinceMenuActive: !formData.isProvinceMenuActive,
                isProviderMenuActive: false,
                isCityMenuActive: false
            }));
        }
        else if(menuType == "city")
        {
            if(formData.province === 'Province')
                return;
            else
            {
                setFormData(prevFormData => ({
                    ...prevFormData,
                    isCityMenuActive: !formData.isCityMenuActive,
                    isProviderMenuActive: false,
                    isProvinceMenuActive: false,
                }));
            }
        }
    };

    const handleOptionClick = (optionText, menuType) => {
        if(menuType === "province")
        {
            setFormData((prevFormData) => ({
                ...prevFormData,
                city: prevFormData.province === optionText ? prevFormData.city : "City"
            }));
        }
        
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
                    />
                    <div className="line" />
                </div>
                <div className="inputDiv signUpInputDiv">
                    <input
                        className="inputField"
                        placeholder="Email address"
                        type="text"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                    />
                    <div className="line" />
                </div>
                <div className="genderDiv">
                    <p className="genderLabel">Gender</p>
                    <label>
                        <input
                            type="radio"
                            name="gender"
                            value="male"
                            checked={formData.gender === 'male'}
                            onChange={handleInputChange}
                        />
                        <span>Male</span>
                    </label>
                    <label>
                        <input
                            type="radio"
                            name="gender"
                            value="female"
                            checked={formData.gender === 'female'}
                            onChange={handleInputChange}
                        />
                        <span>Female</span>
                    </label>
                    <label>
                        <input
                            type="radio"
                            name="gender"
                            value="other"
                            checked={formData.gender === 'other'}
                            onChange={handleInputChange}
                        />
                        <span>Other</span>
                    </label>
                </div>
                <div className="twoInputFieldsDiv">
                    <div className="inputDiv signUpInputDiv">
                        <input
                            className="inputField halfInputField"
                            placeholder="First name"
                            type="text"
                            name="firstName"
                            value={formData.firstName}
                            onChange={handleInputChange}
                        />
                        <div className="line" />
                    </div>
                    <div className="inputDiv signUpInputDiv">
                        <input
                            className="inputField halfInputField"
                            placeholder="Last name"
                            type="text"
                            name="lastName"
                            value={formData.lastName}
                            onChange={handleInputChange}
                        />
                        <div className="line" />
                    </div>
                </div>
                <div className="twoInputFieldsDiv">
                    <Combobox
                        selectedItem={formData.serviceProvider}
                        menuType="serviceProvider"
                        isMenuActive={formData.isProviderMenuActive}
                        toggleMenu={toggleMenu}
                        options={formData.providerMenuOptions}
                        handleOptionClick={handleOptionClick}
                        width="12.1vw"
                    />
                    <div className="inputDiv signUpInputDiv">
                        <input
                            className="inputField phoneNumberField"
                            placeholder="Phone number"
                            type="text"
                            name="phone"
                            value={formData.phone}
                            onChange={handleInputChange}
                        />
                        <div className="line" />
                    </div>
                </div>
                <div className="twoInputFieldsDiv">
                    <div className="inputDiv signUpInputDiv">
                        <input
                            className="inputField halfInputField"
                            placeholder="Landline No."
                            type="text"
                            name="landlineNum"
                            value={formData.landlineNum}
                            onChange={handleInputChange}
                        />
                        <div className="line" />
                    </div>
                    <div className="inputDiv signUpInputDiv">
                        <input
                            className="inputField halfInputField"
                            placeholder="Fax No."
                            type="text"
                            name="faxNum"
                            value={formData.faxNum}
                            onChange={handleInputChange}
                        />
                        <div className="line" />
                    </div>
                </div>
                <div className="twoInputFieldsDiv twoDropdownsDiv">
                    <Combobox
                        selectedItem={formData.province}
                        menuType="province"
                        isMenuActive={formData.isProvinceMenuActive}
                        toggleMenu={toggleMenu}
                        options={formData.provinceMenuOptions}
                        handleOptionClick={handleOptionClick}
                        width="14vw"
                    />
                    <CitySearchComboBox 
                        selectedItem={formData.city}
                        province={formData.province}
                        menuType="city"
                        isMenuActive={formData.isCityMenuActive}
                        toggleMenu={toggleMenu}
                        handleOptionClick={handleOptionClick}
                        width="14vw"
                    />
                </div>
                <div className="inputDiv signUpInputDiv">
                    <input
                        className="inputField"
                        placeholder="Address"
                        type="text"
                        name="address"
                        value={formData.address}
                        onChange={handleInputChange}
                    />
                    <div className="line" />
                </div>
                <div className="inputDiv signUpInputDiv">
                    <input
                        className="inputField passwordField"
                        placeholder="Password"
                        type={formData.showPassword ? "text" : "password"}
                        name="password"
                        value={formData.password}
                        onChange={handleInputChange}
                    />
                    <span className="passwordIcon" onClick={() => setFormData((prevFormData) => ({...prevFormData, showPassword: !formData.showPassword}))}>
                        <box-icon name={formData.showPassword ? "hide" : "show"} color="grey" size="sm" />
                    </span>
                    <div className="line" />
                </div>
                <div className="inputDiv signUpInputDiv">
                    <input
                        className="inputField passwordField"
                        placeholder="Confirm password"
                        type={formData.showConfirmPassword ? "text" : "password"}
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleInputChange}
                    />
                    <span className="passwordIcon" onClick={() => setFormData((prevFormData) => ({...prevFormData, showConfirmPassword: !formData.showConfirmPassword}))}>
                        <box-icon name={formData.showConfirmPassword ? "hide" : "show"} color="grey" size="sm" />
                    </span>
                    <div className="line" />
                </div>
                <div className="twoInputFieldsDiv">
                    <div>
                        <input type="checkbox" className="agreeCheckBox" checked={formData.agreeTerms} onChange={handleAgreeTermsChange} />
                    </div>
                    <p className="termsText">
                        By clicking Create account, I agree that I have read and accepted the Terms of Use and Privacy Policy.
                    </p>
                </div>
                <button 
                    className="submitButton sendRecoveryEmailButton" 
                    title={areRequiredFieldsEmpty() ? 
                        "You cannot sign up until all the required fields are filled except Landline and Fax." : ""} 
                    type="Submit" 
                    disabled={areRequiredFieldsEmpty()}
                >
                    Sign Up
                </button>
            </form>
        </div>
    );
};

export default SignUp;