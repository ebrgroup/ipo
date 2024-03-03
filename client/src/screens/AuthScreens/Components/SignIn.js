import "../AuthHome.css";
import { useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import axios from "axios";
import { toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { useDispatch } from 'react-redux';
import { loginSuccess } from "../../../assets/states/actions/user-action";
import "boxicons";
import { countTrademark } from "../../../assets/states/middlewares/count-ip";

const SignIn = (props) => {

    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        showEmailError: false,
        showPasswordError: false,
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value,
        }));
    };

    const clearFields = () => {
        setFormData({
            email: '',
            password: ''
        });
    }

    useEffect(() => {
        props.Progress(100);
    }, [])

    //dispatch for calling actions in redux-store
    const dispatch = useDispatch();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (isFormValid()) {
            props.Progress(10);
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(formData.email)) {
                handleToastDisplay("Invalid email format!", "error");
                return;
            }
            try {
                props.Progress(40);
                const response = await axios.post(`/ipo/login`, formData)
                props.Progress(70);
                dispatch(loginSuccess(response.data.user));  //Store user data into redux store
                props.Progress(100);
                // console.log(response.data.user._id);
                dispatch(countTrademark(response.data.user._id))
                navigate("/dashboard");
                handleToastDisplay("You have successfully logged in!", "success");
            } catch (error) {
                props.Progress(100);
                clearFields();
                if (error.response !== undefined) {
                    if (error.response.data) {
                        handleToastDisplay(`${error.response.data.message}`, "error");
                    }
                } else {
                    handleToastDisplay("Error signing in!", "error");
                    console.error(error);
                }
            }
        }
        else {
            handleToastDisplay("Required fields must not be left empty.", "error");
            setFormData((prevFormData) => ({
                ...prevFormData,
                showEmailError: true,
                showPasswordError: true
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
        }
    };

    const isFormValid = () => {
        return (
            formData.email && formData.password
        );
    }

    return (
        <div className="signUpDiv">
            <h2 className="formTypeHeading">
                Sign in
            </h2>
            <form className="createAccountForm" onSubmit={handleSubmit}>
                <div className="inputDiv">
                    <input
                        className="inputField"
                        placeholder="Email"
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
                <div className="inputDiv">
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
                    <span className="passwordIcon" onClick={() => setFormData((prevFormData) => ({ ...prevFormData, showPassword: !formData.showPassword }))}>
                        <box-icon name={formData.showPassword ? "hide" : "show"} color="grey" size="sm" />
                    </span>
                    <div className={`line ${formData.showPasswordError && formData.password.length == 0 ? "redLine" : ""}`} />
                    <span className="errorText">
                        {formData.showPasswordError ?
                            (formData.password.length === 0 ?
                                "This field is required." : (formData.password.length < 8 ?
                                    "Password should atleast have eight characters." : "")) : ""}
                    </span>
                </div>
                <div className="buttonDiv">
                    <div className="cantSignIn" onClick={() => navigate("/forgotpassword")}>
                        Can’t sign in?
                    </div>
                    <button
                        className="submitButton"
                        type="Submit"
                    >
                        Sign In
                    </button>
                </div>
                <p className="newUserText">New user? <span className="newAccountText" onClick={() => navigate("/signup")}>Create an account</span></p>
            </form>
        </div>
    );
};

export default SignIn;