import { useState } from "react";
import "./ConfirmProfile.css";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const ConfirmProfile = (props) => {

    const [isAnimation, setIsAnimation] = useState(false);
    const navigate = useNavigate();
    let user = useSelector(state => state.userReducer?.userData); //Complete user details in {User} object

    const {
        cnic,
        email,
        firstName,
        lastName,
        phone,
        province,
        city,
        address
    } = user
    return (

        <div className="profileBox">
            <div className="profileBoxHeader">
                <h2>Profile</h2>
                <span className="editProfileButton" style={{ animation: isAnimation ? `popAnimation 0.5s ease-out` : `none` }}>
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
                        value={cnic}
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
                        value={email}
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
                            value={firstName}
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
                            value={lastName}
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
                        value={phone}
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
                            value={province}
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
                            value={city}
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
                            value={address}
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
            </div>
            <div className="btns">
                <button className='backBtn' onClick={() => navigate(-1)} >Back</button>
                <button
                    className="continueBtn"
                    onClick={() => navigate("/selfshowcase")}>
                    Continue
                </button>        
            </div>

        </div>

    );
};

export default ConfirmProfile;