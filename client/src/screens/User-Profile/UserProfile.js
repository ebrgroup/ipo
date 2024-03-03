import React, { useState, useEffect } from 'react'
import './UserProfileStyle.css'
import userIcon from '../../assets/Icons/image@2x.png';
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { updateUser } from '../../assets/states/middlewares/update-user'
import { toast } from 'react-toastify';
import Combobox from '../global-components/Combobox/Combobox'
import CitySearchComboBox from '../global-components/SearchComboBox/CitySearchComboBox'


const ErrorMessage = (prop) => {
    return (
        <p className="FieldError">{prop.error}</p>
    );
};

function UserProfile() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    let User = useSelector(state => state.userReducer?.userData); //Complete user details in {User} object
    const userID = User._id;

    const removeObjectEntries = (object, keysToRemove) => {
        const newObj = { ...object };
        keysToRemove.forEach(key => delete newObj[key]);
        return newObj;
    };

    const [user_profile, setUser_profile] = useState({
        cnic: '',
        email: '',
        phone: '',
        password: '',
        firstName: '',
        lastName: '',
        gender: '',
        landlineNum: '',
        faxNum: '',
        address: '',
        province: '',
        city: '',
        isProvinceMenuActive: false,
        isCityMenuActive: false,
        provinceMenuOptions: [
            "Azad Jammu & Kashmir", "Balochistan", "FATA", "Gilgit Baltistan", "Islamabad Capital", "KPK", "Punjab", "Sindh"
        ]
    });

    const [errors, setErrors] = useState({
        cnicError: false,
        emailError: false,
        phoneError: false,
        passwordError: false,
        firstNameError: false,
        lastNameError: false,
        genderError: false,
        landlineNumError: false,
        faxNumError: false,
        addressError: false,
        provinceError: false,
        cityError: false,
    });

    const toggleMenu = (menuType) => {
        if (menuType === "serviceProvider") {
            setUser_profile(prevuser_profile => ({
                ...prevuser_profile,
                isProviderMenuActive: !user_profile.isProviderMenuActive,
                isProvinceMenuActive: false,
                isCityMenuActive: false
            }));
        }
        else if (menuType === "province") {
            setUser_profile(prevuser_profile => ({
                ...prevuser_profile,
                isProvinceMenuActive: !user_profile.isProvinceMenuActive,
                isProviderMenuActive: false,
                isCityMenuActive: false
            }));
        }
        else if (menuType == "city") {
            if (user_profile.province === 'Province')
                return;
            else {
                setUser_profile(prevuser_profile => ({
                    ...prevuser_profile,
                    isCityMenuActive: !user_profile.isCityMenuActive,
                    isProviderMenuActive: false,
                    isProvinceMenuActive: false,
                }));
            }
        }
    };

    const handleOptionClick = (optionText, menuType) => {
        if (menuType === "province") {
            setUser_profile((prevuser_profile) => ({
                ...prevuser_profile,
                city: prevuser_profile.province === optionText ? prevuser_profile.city : "City"
            }));
        }

        toggleMenu(menuType);

        setUser_profile((prevuser_profile) => ({
            ...prevuser_profile,
            [menuType]: optionText
        }));
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
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

        setUser_profile((prevState) => ({
            ...prevState,
            ...(name === "male" || name === "female" || name === "other" ? { gender: name } : { [name]: processedValue })
        }));
    };

    useEffect(() => {
        const keysToRemove = ['_id', '__v', 'password'];
        User = removeObjectEntries(User, keysToRemove);         //Remove extra entry from data object
        setUser_profile({
            ...User,
            isProvinceMenuActive: false,
            isCityMenuActive: false,
            provinceMenuOptions: [
                "Azad Jammu & Kashmir", "Balochistan", "FATA", "Gilgit Baltistan", "Islamabad Capital", "KPK", "Punjab", "Sindh"
            ]
        });
    }, [User]);

    const handleCancelbtn = (e) => {
        e.preventDefault();
        navigate('/dashboard');
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(updateUser(userID, user_profile)).then(() => {
            navigate('/dashboard');
            handleToastDisplay("You have successfully updated your profile.", "success")
        }).catch((error) => {
            if (error.response.data) {
                handleToastDisplay(error.response.data.error, "error")
            } else {
                handleToastDisplay(`${error.response.status}, ${error.response.statusText}`, "error")
            }
        });
    }

    const areRequiredFieldsEmpty = () => {
        return !(Object.entries(user_profile).every(([key, value]) => {
            if (['landlineNum', 'faxNum', 'isProviderMenuActive', 'isProvinceMenuActive',
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

    const validateEmail = () => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return !emailRegex.test(user_profile.email) ? true : false;
    };

    return (
        <div className='profile-container'>
            <section className="profile-info">
                <div className="editProfilePicDiv">
                    <h2>Edit Profile</h2>
                    <div>
                        <span>
                            <img src={userIcon} alt="" />
                        </span> 
                    </div>
                </div>
                <form className='form' onSubmit={handleSubmit}>
                    <div className='flex'>
                        <div className={`coolinput ${errors.firstNameError && user_profile.firstName === "" ? 'error' : ''}`}>
                            <label for="input" class="text">First Name:</label>
                            <input type="text" placeholder="Write here..." name="firstName" class="input"
                                onChange={handleChange} value={user_profile.firstName}
                                onBlur={user_profile.firstName === "" ? (e) => setErrors({ ...errors, firstNameError: true }) : null}
                                onFocus={(e) => setErrors({ ...errors, firstNameError: false })} />
                            {errors.firstNameError ? <ErrorMessage error="This field is required!" /> : null}
                        </div>
                        <div className={`coolinput ${errors.lastNameError && user_profile.lastName === "" ? 'error' : ''}`}>
                            <label for="input" class="text">Last Name:</label>
                            <input type="text" placeholder="Write here..." name="lastName" class="input"
                                onChange={handleChange} value={user_profile.lastName}
                                onBlur={user_profile.lastName === "" ? (e) => setErrors({ ...errors, lastNameError: true }) : null}
                                onFocus={(e) => setErrors({ ...errors, lastNameError: false })} />
                            {errors.lastNameError ? <ErrorMessage error="This field is required!" /> : null}
                        </div>
                    </div>
                    <div className='flex'>
                        <div className={`coolinput ${errors.emailError && (user_profile.email === "" || validateEmail()) ?
                            'error' : ''}`}>
                            <label for="input" class="text">@Email:</label>
                            <input type="text" placeholder="Write here..." name="email"
                                className="input"
                                onChange={handleChange} value={user_profile.email}
                                onBlur={() => setErrors({ ...errors, emailError: true })}
                                onFocus={(e) => setErrors({ ...errors, emailError: false })} />
                            {errors.emailError && user_profile.email === "" ? <ErrorMessage error="This field is required!" /> : null}
                            {errors.emailError && user_profile.email !== "" ? validateEmail() ?
                                <ErrorMessage error="Please enter valid email address! " /> : null : null}
                        </div>
                        <div className={`coolinput ${errors.cnicError && (user_profile.email === "" || user_profile.cnic.length < 13) ?
                            'error' : ''}`}>
                            <label for="input" class="text">#CNIC:</label>
                            <input type="text" placeholder="Write here..." name="cnic" class="input"
                                onChange={handleChange} value={user_profile.cnic}
                                onBlur={() => setErrors({ ...errors, cnicError: true })}
                                onFocus={(e) => setErrors({ ...errors, cnicError: false })} />
                            {errors.cnicError && user_profile.cnic === "" ? <ErrorMessage error="This field is required!" /> : null}
                            {errors.cnicError && user_profile.cnic !== "" && user_profile.cnic.length < 13 ?
                                <ErrorMessage error="Please enter valid cnic number! " /> : null}
                        </div>
                    </div>
                    <div className='flex'>
                        <div className={`coolinput ${errors.phoneError && (user_profile.phone === "" || user_profile.phone.length < 11) ?
                            'error' : ''}`}>
                            <label for="input" class="text">#Phone Number:</label>
                            <input type="text" placeholder="Write here..." name="phone" class="input"
                                onChange={handleChange} value={user_profile.phone}
                                onBlur={() => setErrors({ ...errors, phoneError: true })}
                                onFocus={(e) => setErrors({ ...errors, phoneError: false })} />
                            {errors.phoneError && user_profile.phone === "" ? <ErrorMessage error="This field is required!" /> : null}
                            {errors.phoneError && user_profile.phone !== "" && user_profile.phone.length < 11 ?
                                <ErrorMessage error="Please enter valid phone number! " /> : null}
                    </div>
                    <span className='gender-container'>
                        <p className="genderUpdateLabel">Gender: </p>
                        <div className='gender-child-container'>
                            <div className="genderOptionsDiv" 
                                onBlur={() => setErrors({ ...errors, genderError: true })}
                                onFocus={() => setErrors({ ...errors, genderError: false })}>
                                <label>
                                    <input type="radio" name="male" checked={user_profile.gender === "male"} onChange={handleChange}/>
                                    <span>Male</span>
                                </label>
                                <label>
                                    <input type="radio" name="female" checked={user_profile.gender === "female"} onChange={handleChange}/>
                                    <span>Female</span>
                                </label>
                                <label>
                                    <input type="radio" name="other" checked={user_profile.gender === "other"} onChange={handleChange}/>
                                    <span>Other</span>
                                </label>
                            </div>
                        </div>
                            {errors.genderError && user_profile.gender === "" ? <ErrorMessage error="This field is required!" /> : null}
                        </span>
                        </div>
                    <div className='flex'>
                        <div>
                            <span className='combobox-container'>
                                <p className="combobox-label">Province: </p>
                                <Combobox
                                    selectedItem={user_profile.province}
                                    menuType="province"
                                    isMenuActive={user_profile.isProvinceMenuActive}
                                    toggleMenu={toggleMenu}
                                    options={user_profile.provinceMenuOptions}
                                    handleOptionClick={handleOptionClick}
                                    width="18vw"
                                />
                            </span>
                        </div>
                        <span className='combobox-container'>
                            <p className="combobox-label">City: </p>
                            <CitySearchComboBox
                                selectedItem={user_profile.city}
                                province={user_profile.province}
                                menuType="city"
                                isMenuActive={user_profile.isCityMenuActive}
                                toggleMenu={toggleMenu}
                                handleOptionClick={handleOptionClick}
                                width="18vw"
                            />
                        </span>
                    </div>
                    <div className={`coolinput addressDiv ${errors.addressError ? 'error' : ''}`}>
                        <label for="input" class="text">Address:</label>
                        <input type="text" placeholder="Write here..." name="address" class="input"
                            onChange={handleChange} value={user_profile.address}
                            onBlur={user_profile.address === "" ? () => setErrors({ ...errors, addressError: true }) : null}
                            onFocus={(e) => setErrors({ ...errors, addressError: false })} />
                        {errors.addressError ? <ErrorMessage error="This field is required!" /> : null}
                    </div>
                    <div className='flex'>
                        <div className={`coolinput ${errors.landlineNumError ? 'error' : ''}`}>
                            <label for="input" class="text">#Landline:</label>
                            <input type="text" placeholder="Write here..." name="landlineNum" class="input"
                                onChange={handleChange} value={user_profile.landlineNum}
                                onBlur={user_profile.landlineNum.length < 7 ?
                                    () => setErrors({ ...errors, landlineNumError: true }) : null}
                                onFocus={(e) => setErrors({ ...errors, landlineNumError: false })} />
                            {errors.landlineNumError ? <ErrorMessage error="Please enter valid landline number! " /> : null}
                        </div>
                        <div className={`coolinput ${errors.faxNumError ? 'error' : ''}`}>
                            <label for="input" class="text">#Fax:</label>
                            <input type="text" placeholder="Write here..." name="faxNum" class="input"
                                onChange={handleChange} value={user_profile.faxNum}
                                onBlur={user_profile.faxNum.length < 7 ?
                                    () => setErrors({ ...errors, faxNumError: true }) : null}
                                onFocus={(e) => setErrors({ ...errors, faxNumError: false })} />
                            {errors.faxNumError ? <ErrorMessage error="Please enter valid landline number! " /> : null}
                        </div>
                    </div>
                    <div className="buttons">
                        <button
                            className='save-button'
                            type="Submit"
                            disabled={areRequiredFieldsEmpty()}
                            title={areRequiredFieldsEmpty() ?
                                "You cannot save until all the required fields are filled except Landline and Fax." : ""}
                        >
                            <span>Save</span>
                        </button>
                        <button className='cancelBtn' onClick={handleCancelbtn}>Cancel</button>
                    </div>
                </form>
            </section>
        </div>
    )
}

export default UserProfile
