import React, { useState, useEffect } from 'react'
import '../components/UserProfileStyle.css'
import userIcon from '../Icons/image@2x.png'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { updateUser } from '../states/middlewares/update-user'

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
        city: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser_profile(prevState => ({
            ...prevState,
            ...(name === "male" || name === "female" || name === "other" ? { gender: name } : { [name]: value })
        }));
    };    

    useEffect(() => {
        const keysToRemove = ['_id', '__v', 'password'];
        User = removeObjectEntries(User, keysToRemove);         //Remove extra entry from data object
        setUser_profile(
            User
        );
    }, [User]);

    const handleCancelbtn = (e) => {
        e.preventDefault();
        navigate('/dashboard')
    }

    const handleSavebtn = (e) => {
        e.preventDefault();
        dispatch(updateUser(userID, user_profile))
    }
    return (
        <div className='profile-container'>
            <section className="profile-image">
                <div className='profile-image-container'>
                    <h2>Haider Ali</h2>
                    <div className='profile-image-span'>
                    <img src={userIcon} alt="" />
                    </div>
                </div>
            </section>
            <section className="profile-info">
                <h2>Edit Profile</h2>
                <form className='form' action="">
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
                    <div class="coolinput">
                        <label for="input" class="text">@Email</label>
                        <input type="text" placeholder="Write here..." name="email" class="input"
                            onChange={handleChange} value={user_profile.email} />
                    </div>
                    <div className='flex'>
                    <div class="coolinput">
                        <label for="input" class="text">#Phone Number:</label>
                        <input type="text" placeholder="Write here..." name="phone" class="input" 
                            onChange={handleChange} value={user_profile.phone} />
                    </div>
                    <span className='gender-container'>
                        <b>Gender: </b>
                        <div class="mydict">
                            <div>
                                <label>
                                    <input type="radio" name="male" onChange={handleChange} checked={user_profile.gender === "male"} />
                                    <span>Male</span>
                                </label>
                                <label>
                                    <input type="radio" name="female" onChange={handleChange}  checked={user_profile.gender === "female"} />
                                    <span>Female</span>
                                </label>
                                <label>
                                    <input type="radio" name="other"  onChange={handleChange}  checked={user_profile.gender === "other"} />
                                    <span>Other</span>
                                </label>
                            </div>
                        </div>
                        </span>
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
                    <div className='flex'>
                    <div class="coolinput">
                        <label for="input" class="text">Province:</label>
                        <input type="text" placeholder="Write here..." name="province" class="input"
                            onChange={handleChange} value={user_profile.province} />
                    </div>
                    <div class="coolinput">
                        <label for="input" class="text">City:</label>
                        <input type="text" placeholder="Write here..." name="city" class="input"
                            onChange={handleChange} value={user_profile.city} />
                    </div>
                    </div>
                    <div class="coolinput">
                        <label for="input" class="text">Address:</label>
                        <input type="text" placeholder="Write here..." name="address" class="input"
                            onChange={handleChange} value={user_profile.address} />
                    </div>
                    <div className="buttons">
                        <button className='save-button'  onClick={handleSavebtn}>
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
