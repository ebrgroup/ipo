import React, { useEffect, useRef, useState } from 'react'
import './logoDetails.css'
import Bhivetxt from '../../../assets/Icons/Bhivetxt.png'
import BhiveImg from '../../../assets/Icons/Bhiveimg.png'
import BhiveImgtxt from '../../../assets/Icons/BhiveimgText.png'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { logoDetail } from '../../../assets/states/actions/Trademark registration/Trademark-action'

const LogoDetails = ({ Progress }) => {

    const [activeCard, setActiveCard] = useState('')
    const [cardsBorder, setCardsBorder] = useState('rgba(0, 0, 0, 0.1)')
    const [logoDetails, setLogoDetails] = useState({
        markDesc: "",
        domainName: "",
        colorClaimed: "",
        markSeries: "",
        logoFile: "",
        markType: "",
        imageURL: ""
    });
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const selectRadioCard = (cardIdx) => {
        let markType = "";
        if (cardIdx == 1) {
            setActiveCard('card-1')
            markType = "Word Mark";
        }
        else if (cardIdx == 2) {
            setActiveCard('card-2')
            markType = "Design Mark";
        }
        else if (cardIdx == 3) {
            setActiveCard('card-3')
            markType = "Word & Design Mark";
        }

        setLogoDetails((prevData) => ({
            ...prevData,
            markType
        }));

        setCardsBorder('rgba(0, 0, 0, 0.1)')
    }

    const handleChange = (e) => {
        if (e.target.name === "logoFile") {
            setLogoDetails((prevDetails) => ({
                ...prevDetails,
                [e.target.name]: e.target.files[0],
                imageURL: URL.createObjectURL(e.target.files[0])
            }));
        } else {
            setLogoDetails((prevDetails) => ({
                ...prevDetails,
                [e.target.name]: e.target.value
            }));
        }
    }

    const handleDataAndNavigation = () => {
        if (areRequiredFieldsEmpty()) {
            dispatch(logoDetail({
                logoDetails
            }));
            navigate("/reviewApplication")
        } else {
            handleToastDisplay("Required fields (*) are empty!", "error");
            if (!activeCard) {
                setCardsBorder('red')
            }
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

    const areLogoDetailsEmpty = () => {
        for (const key in logoDetails) {
            if (logoDetails.hasOwnProperty(key) && logoDetails[key] === "") {
                return false;
            }
        }
        return true;
    };

    const areRequiredFieldsEmpty = () => {
        if (activeCard === "" || areLogoDetailsEmpty() === false) {
            return false;
        }
        return true;
    }

    // Logic for previous data
    //When back button is press
    // The previous data is kept safe
    const data = useSelector(state => state.trademarkRegistrationReducer?.logodetail.logoDetails)
    useEffect(() => {
        Progress(30)
        if (data) {
            setLogoDetails({
                markDesc: data.markDesc,
                domainName: data.domainName,
                colorClaimed: data.colorClaimed,
                markSeries: data.markSeries,
                logoFile: data.logoFile,
                markType: data.markType
            }
            )
            if (data.markType === 'Word Mark') {
                setActiveCard('card-1')
            } else if (data.markType === 'Design Mark') {
                setActiveCard('card-2')
            } else {
                setActiveCard('card-3')
            }
        }
        else {
            Progress(100)
        }
    }, [])

    return (
        <main className="logoDetails-container">
            <section id='cards-section'>
                <h4 style={{ padding: "0", margin: "0", marginBottom: "1rem" }}>Which of the following best describes the trademark?</h4>
                <div id="radio-cards-container">
                    <div className={`radio-card radio-card-1 ${activeCard == 'card-1' ? 'selected' : ''}`} style={{ border: `2px solid ${cardsBorder}` }} onClick={() => selectRadioCard(1)}>
                        <div className="radio-card-check">
                            <i class="fa-regular fa-circle" style={{ color: ` ${cardsBorder}` }}></i>
                            <i className="fa-solid fa-check-circle"></i>
                        </div>
                        <div className="text-center">
                            <div className="radio-card-label-description">
                                It consists of only words, letters or numbers
                            </div>
                            <div className="radio-card-icon">
                                <img src={Bhivetxt} />
                            </div>
                        </div>
                    </div>
                    <div className={`radio-card radio-card-2 ${activeCard == 'card-2' ? 'selected' : ''}`} style={{ border: `2px solid ${cardsBorder}` }} onClick={() => selectRadioCard(2)}>
                        <div className="radio-card-check">
                            <i class="fa-regular fa-circle" style={{ color: `${cardsBorder}` }}></i>

                            <i className="fa-solid fa-check-circle"></i>
                        </div>
                        <div className="text-center">

                            <div className="radio-card-label-description">
                                It is a picture without words, letters or numbers
                            </div>
                            <div className="radio-card-icon">
                                <img src={BhiveImg} />
                            </div>
                        </div>
                    </div>
                    <div className={`radio-card radio-card-3 ${activeCard == 'card-3' ? 'selected' : ''}`} style={{ border: `2px solid ${cardsBorder}` }} onClick={() => selectRadioCard(3)}>
                        <div className="radio-card-check">
                            <i class="fa-regular fa-circle" style={{ color: `${cardsBorder}` }}></i>

                            <i className="fa-solid fa-check-circle"></i>
                        </div>
                        <div className="text-center">

                            <div className="radio-card-label-description">
                                It consists of words, letters or numbers in a particular picture
                            </div>
                            <div className="radio-card-icon">
                                <img src={BhiveImgtxt} />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section id="logoDetail-section">
                {/* <div className="representativeFields"> */}

                {/* <div className='input-container'> */}
                <div className="input">
                    <label htmlFor="">Mark Description<strong>*</strong> (e.g: coca-cola)</label>
                    <input type="text"
                        onChange={handleChange}
                        value={logoDetails.markDesc}
                        name="markDesc" />

                </div>

                <div className="input">
                    <label htmlFor="">Domain Name (Indicate Whether it is in respect of goods or services)<strong>*</strong></label>
                    <input type="text"
                        onChange={handleChange}
                        value={logoDetails.domainName}

                        name="domainName" />
                </div>
                {/* </div> */}


                <div className="input">
                    <label htmlFor="">Color Claimed (Indicate here and state the colors) <strong>*</strong></label>
                    <input type="text" onChange={handleChange} name="colorClaimed"
                        value={logoDetails.colorClaimed}
                    />

                </div>
                <div className="input">
                    <label htmlFor="">Marks in series (Write in numbers) <strong>*</strong></label>
                    <input type="number" onChange={handleChange} name="markSeries"
                        value={logoDetails.markSeries}
                    />
                </div>

                <div className="input">
                    <label htmlFor="">Upload copy of trademark <strong>*</strong></label>
                    <input type="file"
                        // value={'logoDetails.logoFile'}
                        onChange={handleChange}
                        name="logoFile" />
                </div>
                {/* </div> */}
            </section>

            <div className="btns">
                <button className='backBtn' onClick={() => navigate(-1)} >Back</button>
                <button className='continueBtn' onClick={handleDataAndNavigation} >Continue</button>
            </div>
        </main>
    )
}

export default LogoDetails
