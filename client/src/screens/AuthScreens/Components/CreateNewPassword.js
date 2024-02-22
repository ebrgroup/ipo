import "../AuthHome.css";
import { useNavigate, useParams } from 'react-router-dom';
import axios from "axios";
import { toast } from 'react-toastify';
import React, { useState, useEffect } from 'react';

const CreateNewPassword = (props) => {

    const { userToken } = useParams();
    const navigate = useNavigate();
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [token, setToken] = useState("");
    const [formData, setFormData] = useState({
        newPassword: '',
        confirmPassword: '',
        showNewPasswordError: false,
        showConfirmPasswordError: false,
    });

    useEffect(() => {
        props.Progress(100);
    }, [])

    const handleInputChange = (e) => {
        setFormData((prevFormData) => ({
            ...prevFormData,
            [e.target.name]: e.target.value,
        }));
    };

    useEffect(() => {
        setToken(userToken);
    }, [userToken]);

    const handleSubmit = async (e) => {
        props.Progress(50);
        e.preventDefault();

        if (!areRequiredFieldsEmpty()) {
            if (formData.newPassword !== formData.confirmPassword) {
                handleToastDisplay("Passwords do not match!", "error");
                return;
            }
            const passwordRegex = /^(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\-])(?=.*\d)(?=.*[A-Z]).{8,}$/;
            if (!passwordRegex.test(formData.newPassword)) {
                handleToastDisplay("Password must have atleast eight characters with atleast one special character, uppercase letter, and number.", "error");
                return;
            }

            await axios.put(`/ipo/users/resetPassword/${ token }`, {
                newPassword: formData.newPassword
            })
            .then(response => {
                handleToastDisplay("You have successfully updated your password!", "success");
                navigate("/signin");
            }).catch(error => {
                if(error.response !== undefined){
                    if (error.response.data) {
                        handleToastDisplay(`${error.response.data.error}`, "error");
                    } else {
                        handleToastDisplay(`${error.response.status}, ${error.response.statusText}`, "error")
                    }
                } else {
                    handleToastDisplay("Error inserting data", "error");
                }
            });
        }
        else {
            handleToastDisplay("Required fields must not be left empty.", "error");
            setFormData((prevFormData) => ({
                ...prevFormData,
                showNewPasswordError: true,
                showConfirmPasswordError: true
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
            formData.newPassword && formData.confirmPassword
        );
    };

    return (
        <div className="forgotPasswordDiv">
            <h2 className="formTypeHeading">
                Create new password
            </h2>
            <p className="forgotPasswordText">
                Please create a new password that you don't use on any other site.
            </p>
            <form className="createAccountForm" onSubmit={handleSubmit}>
                <div className="inputDiv">
                    <input
                        className="inputField passwordField"
                        placeholder="New password"
                        type={showNewPassword ? "text" : "password"}
                        name="newPassword"
                        value={formData.newPassword}
                        onChange={handleInputChange}
                        onBlur={() => setFormData({ ...formData, showNewPasswordError: true })}
                        onFocus={() => setFormData({ ...formData, showNewPasswordError: false })}
                    />
                    <span className="passwordIcon" onClick={() => setShowNewPassword(!showNewPassword)}>
                        <box-icon name={showNewPassword ? "hide" : "show"} color="grey" size="sm" />
                    </span>
                    <div className={`line ${formData.showNewPasswordError && formData.newPassword.length == 0 ? "redLine" : ""}`} />
                    <span className="errorText">
                        {formData.showNewPasswordError ? 
                        (formData.newPassword.length === 0 ? 
                        "This field is required." : (formData.newPassword.length < 8 ?
                            "Password should atleast have eight characters." : (!/^(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\-])(?=.*\d)(?=.*[A-Z]).{8,}$/.test(formData.newPassword) ? 
                            "Password requires a special character, a number, and an uppercase letter." : ""))) : ""}
                    </span>
                </div>
                <div className="inputDiv">
                    <input
                        className="inputField passwordField"
                        placeholder="Confirm new password"
                        type={showConfirmPassword ? "text" : "password"}
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleInputChange}
                        onBlur={() => setFormData({ ...formData, showConfirmPasswordError: true })}
                        onFocus={() => setFormData({ ...formData, showConfirmPasswordError: false })}
                    />
                    <span className="passwordIcon" onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                        <box-icon name={showConfirmPassword ? "hide" : "show"} color="grey" size="sm" />
                    </span>
                    <div className={`line ${formData.showConfirmPasswordError && formData.confirmPassword.length == 0 ? "redLine" : ""}`} />
                    <span className="errorText">
                        {formData.showConfirmPasswordError ? 
                        (formData.confirmPassword.length === 0 ? 
                        "This field is required." : (!(formData.newPassword === formData.confirmPassword) ? 
                        "Passwords do not match" : "")) : ""}
                    </span>
                </div>
                <button
                    className="submitButton sendRecoveryEmailButton"
                    type="Submit"
                >
                    Change password
                </button>
            </form>
        </div>
    );
};

export default CreateNewPassword;