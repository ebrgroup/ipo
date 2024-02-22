import { useState } from "react";
import "./ConfirmProfile.css";
import { useNavigate } from "react-router-dom";

const ConfirmProfile = (props) => {

    const [isAnimation, setIsAnimation] = useState(false);
    const navigate = useNavigate();

    return (
        // <div className="confirmProfilePage">
            // <div className="profileDetailsDiv">
                <div className="profileBox">
                    <div className="profileBoxHeader">
                        <h2>Profile</h2>
                        <span className="editProfileButton" style={{ animation: isAnimation ? `popAnimation 0.5s ease-out` : `none`}}>
                            <span>
                                <box-icon name="edit-alt" color="#0652DD" size="0.85rem" />
                            </span>
                            <p onClick={() => navigate("/profile")}>
                                Edit Profile
                            </p>
                        </span>
                    </div>
                    <div className="profileBoxBody">
                        <div className="profileInfoInputDiv">
                            <p className="profileLabel">
                                CNIC
                            </p>
                            <input
                                className="profileInfoInputField"
                                type="text"
                                name="cnic"
                                value="3740583307771"
                                onFocus={(e) => {
                                    setIsAnimation(true); 
                                    setTimeout(() => {
                                        e.target.blur();
                                    }, 400);
                                }}
                                onBlur={() => setIsAnimation(false)}
                            />
                            <div className="profileInfoLine" />
                        </div>
                        <div className="profileInfoInputDiv">
                            <p className="profileLabel">
                                Email
                            </p>
                            <input
                                className="profileInfoInputField longerProfileInputField"
                                type="text"
                                name="email"
                                value="abdulwali.nadeem21@gmail.com"
                                onFocus={(e) => {
                                    setIsAnimation(true); 
                                    setTimeout(() => {
                                        e.target.blur();
                                    }, 400);
                                }}
                                onBlur={() => setIsAnimation(false)}
                            />
                            <div className="profileInfoLine" />
                        </div>
                        <div className="profileInfoNamesDiv">
                            <div className="profileInfoInputDiv">
                                <p className="profileLabel">
                                    First Name
                                </p>
                                <input
                                    className="profileInfoInputField"
                                    type="text"
                                    name="firstName"
                                    value="Abdul Wali"
                                    onFocus={(e) => {
                                        setIsAnimation(true); 
                                        setTimeout(() => {
                                            e.target.blur();
                                        }, 400);
                                    }}
                                    onBlur={() => setIsAnimation(false)}
                                />
                                <div className="profileInfoLine" />
                            </div>
                            <div className="profileInfoInputDiv">
                                <p className="profileLabel">
                                    Last Name
                                </p>
                                <input
                                    className="profileInfoInputField"
                                    type="text"
                                    name="lastName"
                                    value="Nadim"
                                    onFocus={(e) => {
                                        setIsAnimation(true); 
                                        setTimeout(() => {
                                            e.target.blur();
                                        }, 400);
                                    }}
                                    onBlur={() => setIsAnimation(false)}
                                />
                                <div className="profileInfoLine" />
                            </div>
                        </div>
                        <div className="profileInfoInputDiv">
                            <p className="profileLabel">
                                Phone Number
                            </p>
                            <input
                                className="profileInfoInputField"
                                type="text"
                                name="phone"
                                value="03481000629"
                                onFocus={(e) => {
                                    setIsAnimation(true); 
                                    setTimeout(() => {
                                        e.target.blur();
                                    }, 400);
                                }}
                                onBlur={() => setIsAnimation(false)}
                            />
                            <div className="profileInfoLine" />
                        </div>
                        <div className="profileInfoNamesDiv">
                            <div className="profileInfoInputDiv">
                                <p className="profileLabel">
                                    Province
                                </p>
                                <input
                                    className="profileInfoInputField"
                                    type="text"
                                    name="province"
                                    value="Punjab"
                                    onFocus={(e) => {
                                        setIsAnimation(true); 
                                        setTimeout(() => {
                                            e.target.blur();
                                        }, 400);
                                    }}
                                    onBlur={() => setIsAnimation(false)}
                                />
                                <div className="profileInfoLine" />
                            </div>
                            <div className="profileInfoInputDiv">
                                <p className="profileLabel">
                                    City
                                </p>
                                <input
                                    className="profileInfoInputField"
                                    type="text"
                                    name="city"
                                    value="Rawalpindi"
                                    onFocus={(e) => {
                                        setIsAnimation(true); 
                                        setTimeout(() => {
                                            e.target.blur();
                                        }, 400);
                                    }}
                                    onBlur={() => setIsAnimation(false)}
                                />
                                <div className="profileInfoLine" />
                            </div>
                        </div>
                        <div className="profileBoxFooter">
                            <div className="profileInfoInputDiv">
                                <p className="profileLabel">
                                    Address
                                </p>
                                <input
                                    className="profileInfoInputField longerProfileInputField"
                                    type="text"
                                    name="address"
                                    value="House no. 7/c, Lane 3, GC"
                                    onFocus={(e) => {
                                        setIsAnimation(true); 
                                        setTimeout(() => {
                                            e.target.blur();
                                        }, 400);
                                    }}
                                    onBlur={() => setIsAnimation(false)}
                                    />
                                <div className="profileInfoLine" />
                            </div>
                            <button 
                                className="continueButton"
                                onClick={ () => navigate("/selfshowcase") }
                            >
                                Continue
                            </button>
                        </div>
                    </div>
                </div>
        //     </div>
        //     <div className="helpAndSupportDiv">

        //     </div>
        // </div>
    );
};

export default ConfirmProfile;