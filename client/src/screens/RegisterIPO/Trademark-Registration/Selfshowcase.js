import React, { useState, useEffect } from 'react';
import './selfShowcase.css';
import { useNavigate } from 'react-router-dom';
import { toast } from "react-toastify";
import { Player } from '@lottiefiles/react-lottie-player';
import { representative } from '../../../assets/states/actions/Trademark registration/Trademark-action';
import { useDispatch, useSelector } from 'react-redux';

const Selfshowcase = ({ Progress }) => {
  const navigate = useNavigate();
  const [selectedRole, setSelectedRole] = useState('self');
  const [representativeData, setRepresentativeData] = useState({
    lincenseNo: "",
    nameOfLawPractice: "",
    licenseFile: ""
  });
  const [licenseFileURL, setLicenseFileURL] = useState(null);
  const dispatch = useDispatch();

  const handleRepresentativeData = (e) => {
    if (e.target.name === "licenseFile") {
      setRepresentativeData((prevData) => ({
        ...prevData,
        [e.target.name]: e.target.files[0]
      }));
      setLicenseFileURL(URL.createObjectURL(e.target.files[0]));
    } else {
      setRepresentativeData((prevData) => ({
        ...prevData,
        [e.target.name]: e.target.value
      }));
    }
  }

  const handleChange = (event) => {
    setSelectedRole(event.target.value);
  };

  const isAnyAttributeEmpty = (data) => {
    for (const key in data) {
      if (data.hasOwnProperty(key) && data[key] === "") {
        return false;
      }
    }
    return true;
  };

  const handleDataAndNavigation = () => {
    let shouldDispatch = true;
    if(selectedRole === "representative") {
      shouldDispatch = isAnyAttributeEmpty(representativeData) && licenseFileURL !== null;
    }
    if(shouldDispatch) {
      dispatch(representative({
        ownerType: selectedRole,
        representativeData
      }));
      navigate("/classification");
    } else {
      handleToastDisplay("Required fields (*) are empty!", "error");
    }
  }

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

  const data = useSelector(state => state.trademarkRegistrationReducer?.representative);

  useEffect(() => {
    Progress(100);

    if (data && data.ownerType === 'representative') {
      const { ownerType } = data;
      const { lincenseNo, nameOfLawPractice, licenseFile } = data.representativeData;

      setRepresentativeData({
        lincenseNo: lincenseNo,
        nameOfLawPractice: nameOfLawPractice
      });
      setSelectedRole(ownerType)
      setLicenseFileURL(licenseFile ? URL.createObjectURL(licenseFile) : null);
    }
    
    return () => {
      if (licenseFileURL) {
        URL.revokeObjectURL(licenseFileURL);
      }
    }
  }, []);

  return (
    <section className='selfShowcaseContainer'>
      <div className="animation" style={{ display: selectedRole == 'representative' ? 'none' : 'block' }}>
        <Player src={require("../../../assets/Icons/self-showcase.json")} autoplay loop className='self-lottie' />
      </div>
      <div className="radioBtns">
        <h4>Who is completing this application?</h4>

        <div className="input">
          <input type="radio" name="role" id="self" value="self" onChange={handleChange} checked={selectedRole === 'self'} />
          <label htmlFor="self">Trademark owner or authorized person</label>
        </div>

        <div className="input">
          <input type="radio" name="role" id="representative" value="representative" onChange={handleChange} checked={selectedRole === 'representative'} />
          <label htmlFor="representative">Representative</label>
        </div>
      </div>

      {selectedRole === 'representative' && (
        <div className="representativeFields">

          <div className="input">
            <label htmlFor="">License No <strong>*</strong></label>
            <input type="text" name="lincenseNo" value={representativeData.lincenseNo} onChange={handleRepresentativeData} />
          </div>

          <div className="input">
            <label htmlFor="">Name of Law Practice <strong>*</strong></label>
            <input type="text" name="nameOfLawPractice" value={representativeData.nameOfLawPractice} onChange={handleRepresentativeData} />
          </div>

          <div className="input">
            <label htmlFor="">Upload License Scanned File <strong>*</strong></label>
            <input type="file" name="licenseFile" onChange={handleRepresentativeData} />
          </div>
          <div className=" input selected-logo">
            <img src={licenseFileURL} alt="No License file selected yet!" width="210px" />
          </div>

        </div>
      )}

      <div className="btns">
        <button className='backBtn' onClick={() => navigate(-1)} >Back</button>
        <button className='continueBtn' onClick={handleDataAndNavigation} >Continue</button>
      </div>
    </section>
  );
};

export default Selfshowcase;
