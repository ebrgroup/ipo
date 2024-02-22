import React, { useState,useEffect } from 'react';
import './ChangePassStyle.css';
import IPO_icon from '../../assets/Icons/rectangle-8@2x.png';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

function ChangePass(props) {
    const User_ID = useSelector(state => state.userReducer.userData?._id);
    const navigate = useNavigate();


    const [password, setPassword] = useState({
        Old_Pass: '',
        Confirm_Pass: '',
        New_Pass: '',
        showOldPassword: false,
        showConfirmPassword: false,
        showNewPassword: false
    })

    const isEmpty = (str) => str.trim().length === 0; //Check any field IsEmpty

    const clearFields = () => {
        setPassword(prevState => ({
            ...prevState,
            Old_Pass: '',
            Confirm_Pass: '',
            New_Pass: ''
        }));
    }

    
    useEffect( () => {
        props.Progress(100);
    },[])


    const handleSubmit = async (e) => {
        e.preventDefault();
        props.Progress(20);

        if(password.New_Pass !== password.Confirm_Pass) {
            clearFields();
            handleToastDisplay("Passwords do not match!", "error");
            return;
        }
        props.Progress(40);

        const passwordRegex = /^(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\-])(?=.*\d)(?=.*[A-Z]).{8,}$/;
        if(!passwordRegex.test(password.New_Pass))
        {
            clearFields();
            handleToastDisplay("Password must have atleast eight characters with atleast one special character, uppercase letter, and number.", "error");
            return;
        }
        props.Progress(60);


        await axios.put(`/ipo/users/changePassword/${User_ID}`, {
            password: password.Old_Pass,
            newPassword: password.New_Pass
        }).then(() => {
            props.Progress(100);

            clearFields();
            navigate("/dashboard");
            handleToastDisplay("You have successfully changed your password!", "success");
        }).catch(error => {
            clearFields();
            if (error.response.data.message) {
                handleToastDisplay(`${error.response.data.message}`, "error");
            } else if(error.response.data.error) {
                handleToastDisplay(`${error.response.data.error}`, "error");
            } else {
                handleToastDisplay(`${error.response.status}, ${error.response.statusText}`, "error")
            }
        });
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setPassword(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const areRequiredFieldsEmpty = () => {
        return !(
            password.Old_Pass && password.New_Pass && password.Confirm_Pass
        );
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

    return (
        <div className="container-holder">
            <div className='container'>
                <div className="changePasswordHeader">
                    <img src={IPO_icon} alt="" />
                    <div className="header-content">
                        <h2 className="changePasswordHeading">Change Password</h2>
                        <p>Please create a new password that you don’t use on any other site.</p>
                    </div>
                </div>
                <form className='form' onSubmit={handleSubmit}>
                    <div className="change-password-container">
                        <input placeholder="Old Password" className="input-field" name="Old_Pass" onChange={handleChange}
                            value={password.Old_Pass} type={password.showPassword ? "text" : "password"} />
                        <span className="changePasswordIcon" onClick={() => setPassword(prevState => ({...prevState, showPassword: !password.showPassword}))}>
                            <box-icon name={password.showPassword ? "hide" : "show"} color="grey" size="sm" />
                        </span>
                    </div>
                    <div className="change-password-container">
                        <input placeholder="New Password" className="input-field" name="New_Pass" onChange={handleChange}  
                            value={password.New_Pass} type={password.showNewPassword ? "text" : "password"} />
                        <span className="changePasswordIcon" onClick={() => setPassword(prevState => ({...prevState, showNewPassword: !password.showNewPassword}))}>
                            <box-icon name={password.showNewPassword ? "hide" : "show"} color="grey" size="sm" />
                        </span>
                    </div>
                    <div className="change-password-container">
                        <input placeholder="Confirm New Password" className="input-field" name="Confirm_Pass" onChange={handleChange} 
                            value={password.Confirm_Pass} type={password.showConfirmPassword ? "text" : "password"} />
                        <span className="changePasswordIcon" onClick={() => setPassword(prevState => ({...prevState, showConfirmPassword: !password.showConfirmPassword}))}>
                            <box-icon name={password.showConfirmPassword ? "hide" : "show"} color="grey" size="sm" />
                        </span>
                    </div>
                    <button 
                        className="submitButton sendRecoveryEmailButton" 
                        type="Submit" 
                        disabled={areRequiredFieldsEmpty()}
                        title={areRequiredFieldsEmpty() ? 
                            "You cannot change your password until all the required fields are filled." : ""} 
                    >
                        Change password
                    </button>
                </form>
            </div>
        </div>
    )
}

export default ChangePass;
