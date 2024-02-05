import React, { useState, useEffect } from 'react'
import '../components/UserProfileStyle.css'
import userIcon from '../Icons/image@2x.png'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { updateUser } from '../states/middlewares/update-user'
import { toast } from 'react-toastify';
import Combobox from './Combobox/Combobox'
import CitySearchComboBox from './SearchComboBox/CitySearchComboBox'

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

    const toggleMenu = (menuType) => {
        console.log(user_profile)
        if(menuType === "serviceProvider")
        {
            setUser_profile(prevuser_profile => ({
                ...prevuser_profile,
                isProviderMenuActive: !user_profile.isProviderMenuActive,
                isProvinceMenuActive: false,
                isCityMenuActive: false
            }));
        }
        else if(menuType === "province")
        {
            setUser_profile(prevuser_profile => ({
                ...prevuser_profile,
                isProvinceMenuActive: !user_profile.isProvinceMenuActive,
                isProviderMenuActive: false,
                isCityMenuActive: false
            }));
        }
        else if(menuType == "city")
        {
            if(user_profile.province === 'Province')
                return;
            else
            {
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
        if(menuType === "province")
        {
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

        if(user_profile.cnic.length !== 13) {
            handleToastDisplay("CNIC should be 13 digits long.", "error");
            return;
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if(!emailRegex.test(user_profile.email))
        {
            handleToastDisplay("Invalid email format!", "error");
            return;
        }
        if(user_profile.phone.length !== 11) {
            handleToastDisplay("Phone no. should be 11 digits long.", "error");
            return;
        }
        if(user_profile.landlineNum.length !== 0 && user_profile.landlineNum.length < 7) {
            handleToastDisplay("Landline no. should be 7-11 digits long.", "error");
            return;
        }
        if(user_profile.faxNum.length !== 0 && user_profile.faxNum.length < 7) {
            handleToastDisplay("Fax no. should be 7-11 digits long.", "error");
            return;
        }

        dispatch(updateUser(userID, user_profile)).then(() => {
            navigate('/dashboard');
            handleToastDisplay("You have successfully updated your profile.", "success")
        }).catch((error) => {
            if(error.response.data) {
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

    return (
        <div className='profile-container'>
            <section className="profile-image">
                <div className='profile-image-container'>
                    <h2>{`${user_profile.firstName} ${user_profile.lastName}`}</h2>
                    <div className='profile-image-span'>
                    <img src={userIcon} alt="" />
                    <div className="input-div">
                        <input className='file-input' name="file" type="file" id="file-input" />
                        <label htmlFor="file-input">
                            <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" stroke-linejoin="round" 
                                stroke-linecap="round" viewBox="0 0 24 24" stroke-width="2" fill="none" stroke="currentColor" className="icon">
                                <polyline points="16 16 12 12 8 16"></polyline>
                                <line y2="21" x2="12" y1="12" x1="12"></line>
                                <path d="M20.39 18.39A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.3"></path>
                                <polyline points="16 16 12 12 8 16"></polyline>
                            </svg>
                        </label>
                    </div>
                    </div>
                </div>
            </section>
            <section className="profile-info">
                <h2>Edit Profile</h2>
                <form className='form' onSubmit={handleSubmit}>
                    <div className='flex'>
                        <div class="coolinput">
                            <label for="input" class="text">First Name:</label>
                            <input type="text" placeholder="Write here..." name="firstName" class="input"
                                onChange={handleChange} value={user_profile.firstName} />
                        </div>
                        <div class="coolinput">
                            <label for="input" class="text">Last Name:</label>
                            <input type="text" placeholder="Write here..." name="lastName" class="input"
                                onChange={handleChange} value={user_profile.lastName} />
                        </div>
                    </div>
                    <div className='flex'>
                        <div class="coolinput">
                            <label for="input" class="text">@Email:</label>
                            <input type="text" placeholder="Write here..." name="email" class="input"
                                onChange={handleChange} value={user_profile.email} />
                        </div>
                        <div class="coolinput">
                            <label for="input" class="text">#CNIC:</label>
                            <input type="text" placeholder="Write here..." name="cnic" class="input" 
                                onChange={handleChange} value={user_profile.cnic} />
                        </div>
                    </div>
                    <div className='flex'>
                    <div class="coolinput">
                        <label for="input" class="text">#Phone Number:</label>
                        <input type="text" placeholder="Write here..." name="phone" class="input" 
                            onChange={handleChange} value={user_profile.phone} />
                    </div>
                    <span className='gender-container'>
                        <p className="genderUpdateLabel">Gender: </p>
                        <div class="mydict">
                            <div>
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
                        </span>
                    </div>
                    <div className='flex'>
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
                    <div class="coolinput addressDiv">
                        <label for="input" class="text">Address:</label>
                        <input type="text" placeholder="Write here..." name="address" class="input"
                            onChange={handleChange} value={user_profile.address} />
                    </div>
                    <div className='flex'>
                        <div class="coolinput">
                            <label for="input" class="text">#Landline:</label>
                            <input type="text" placeholder="Write here..." name="landlineNum" class="input"
                                onChange={handleChange} value={user_profile.landlineNum} />
                        </div>
                        <div class="coolinput">
                        <label for="input" class="text">#Fax:</label>
                        <input type="text" placeholder="Write here..." name="faxNum" class="input" 
                            onChange={handleChange} value={user_profile.faxNum} />
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
                            <div class="svg-wrapper-1">
                                <div class="svg-wrapper">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    width="30"
                                    height="30"
                                    class="icon"
                                >
                                    <path
                                    d="M22,15.04C22,17.23 20.24,19 18.07,19H5.93C3.76,19 2,17.23 2,15.04C2,13.07 3.43,11.44 5.31,11.14C5.28,11 5.27,10.86 5.27,10.71C5.27,9.33 6.38,8.2 7.76,8.2C8.37,8.2 8.94,8.43 9.37,8.8C10.14,7.05 11.13,5.44 13.91,5.44C17.28,5.44 18.87,8.06 18.87,10.83C18.87,10.94 18.87,11.06 18.86,11.17C20.65,11.54 22,13.13 22,15.04Z"
                                    ></path>
                                </svg>
                                </div>
                            </div>
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
