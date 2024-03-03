import React, { useState } from 'react';
import "./FeeSubmission.css";
import { Player } from "@lottiefiles/react-lottie-player";
import PaymentModal from '../Payment-modal/PaymentModal';
import { useNavigate } from 'react-router-dom';
import { toast } from "react-toastify";

const FeeSubmission = (props) => {

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [checkedIndex, setCheckedIndex] = useState(-1);
    const navigate = useNavigate();

    const openModal = (e) => {
        e.stopPropagation();
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const handleCheckboxChange = (index) => {
        setCheckedIndex(index);
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
        <>
            <div className="fee-screen-main">
                <h4 className="fee-main-heading">Payment Method</h4>
                <div className="fee-content-parent">
                    <div className="fee-content-heading">
                        <Player src={require("../../../../assets/Icons/fee-lottie.json")} autoplay loop
                            className="fee-lottie" />
                        <p>Select your payment method!</p>
                    </div>
                    <div className="fee-logo-container">
                        {[require("../../../../assets/Icons/easypaisa.png"), require("../../../../assets/Icons/jazzcash.png"), require("../../../../assets/Icons/credit-card.png")].map((src, index) => (
                            <div key={index} class="checkbox-wrapper-16">
                                <label class="checkbox-wrapper">
                                    <input
                                        class="checkbox-input"
                                        type="checkbox"
                                        checked={checkedIndex === index}
                                        onChange={() => handleCheckboxChange(index)}
                                    />
                                    <span class="checkbox-tile">
                                        <img src={src} className="fee-logo" />
                                    </span>
                                </label>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="btns">
                    <button className='backBtn' onClick={() => navigate(-1)} >Back</button>
                    <button className="continueBtn" onClick={checkedIndex !== -1 ? openModal :
                        () => handleToastDisplay("Please select any one payment option!", "error")}>Continue</button>
                </div>

                <PaymentModal isOpen={isModalOpen} closeModal={closeModal} Progress={props.Progress} />
            </div>
        </>
    );
}

export default FeeSubmission;
