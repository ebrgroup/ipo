import { useEffect, useRef, useState } from "react";
import "./paymentmodal.css";
import visaSvg from "../../../../assets/Icons/visa-svg.svg";
import paymentHeader from "../../../../assets/Icons/payment-header-svg-2.svg";
import Modal from '@mui/material/Modal';
import Combobox from "../../../global-components/Combobox/Combobox";

const PaymentModal = ({ isOpen, closeModal }) => {

    const [cardDetails, setCardDetails] = useState({
        cardNumber: "",
        name: "",
        cvv: "",
        month: "Choose Month",
        year: "Choose Year"
    });
    const [menuActivation, setMenuActivation] = useState({
        isMonthMenuActive: false,
        isYearMenuActive: false
    });

    const divRef = useRef(null);

    const monthMenuOptions = [
        "January", "February", "March", "April",  "May", "June", "July", "August", "September", 
        "October", "November", "December"
      ];

    const startYear = 1900;
    const endYear = new Date().getFullYear();
    const years = [];

    const toggleMenu = (menuType) => {
        if(menuType === "month") {
            setMenuActivation((prevMenu) => ({
                ...prevMenu,
                isMonthMenuActive: !menuActivation.isMonthMenuActive
            }));
        } else if(menuType === "year") {
            setMenuActivation((prevMenu) => ({
                ...prevMenu,
                isYearMenuActive: !menuActivation.isYearMenuActive
            }));
        }
    }

    const handleOptionClick = (optionText, menuType) => {
       setCardDetails((prevMenu) => ({
        ...prevMenu,
        [menuType]: optionText
       }));

       toggleMenu(menuType);
    }

    const handleChange = (e) => {
        setCardDetails({
            ...cardDetails,
            [e.target.name]: e.target.value
        });
    }

    const scrollDiv = () => {
        divRef.current.className = "payment-lower-parent-active";
    }

    for (let year = startYear; year <= endYear; year++) {
        years.push(year);
    }

    useEffect(() => {
        function handleModalClose() {
           closeModal();
        }

        window.addEventListener('click', handleModalClose);

        return () => window.removeEventListener('click', handleModalClose);
    }, []);

    return (
        <Modal
            open={isOpen}
            onClose={closeModal}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <div className="modal-overlay">
                <div className="modal">
                    <div className="payment-header-parent">
                        <div className="payment-header">
                        <div class="visa-card">
                            <div class="logoContainer">
                                <svg
                                xmlns="http://www.w3.org/2000/svg"
                                x="0px"
                                y="0px"
                                width="23"
                                height="23"
                                viewBox="0 0 48 48"
                                className="svgLogo"
                                >
                                <path
                                    fill="#ff9800"
                                    d="M32 10A14 14 0 1 0 32 38A14 14 0 1 0 32 10Z"
                                ></path>
                                <path
                                    fill="#d50000"
                                    d="M16 10A14 14 0 1 0 16 38A14 14 0 1 0 16 10Z"
                                ></path>
                                <path
                                    fill="#ff3d00"
                                    d="M18,24c0,4.755,2.376,8.95,6,11.48c3.624-2.53,6-6.725,6-11.48s-2.376-8.95-6-11.48 C20.376,15.05,18,19.245,18,24z"
                                ></path>
                                </svg>
                            </div>
                            <div className="number-container">
                                <label className="payment-input-label" for="cardNumber">CARD NUMBER</label>
                                <input
                                className="payment-input-style"
                                id="cardNumber"
                                placeholder="XXXX XXXX XXXX XXXX"
                                name="cardNumber"
                                type="text"
                                value={cardDetails.cardNumber}
                                disabled={true}
                                />
                            </div>
                            <div className="name-date-cvv-container">
                                <div className="name-wrapper">
                                <label className="payment-input-label" for="holderName">CARD HOLDER</label>
                                <input
                                    className="payment-input-style"
                                    id="holderName"
                                    placeholder="NAME"
                                    type="text"
                                    value={cardDetails.name}
                                    disabled={true}
                                />
                                </div>

                                <div className="expiry-wrapper">
                                <label className="payment-input-label" for="expiry" disabled={true}>VALID THRU</label>
                                <input className="payment-input-style" id="expiry"  disabled={true} placeholder="MM/YY" type="text" />
                                </div>
                                <div className="cvv-wrapper">
                                <label className="payment-input-label" for="cvv">CVV</label>
                                <input
                                    className="payment-input-style"
                                    placeholder="***"
                                    maxlength="3"
                                    id="cvv"
                                    type="password"
                                    value={cardDetails.cvv}
                                    disabled={true}
                                />
                                </div>
                            </div>
                        </div>
                        </div>
                        <hr className="payment-hr-element" />
                        <div className="payment-lower-parent"  ref={ divRef }>
                            <div className="payment-lower-header">
                                <img src={paymentHeader} className="payment-header-svg" />
                                <div>
                                    <p>Haider Ali</p>
                                    <h6>Order Id: 125689753556</h6>
                                </div>
                            </div>
                            <div className="payment-inputs-container">
                                    <div class="payment-group">
                                        <img src={visaSvg} className="svgIcon" />
                                <input className="payment-input" type="text" placeholder="Card Number"
                                 value={cardDetails.cardNumber} onChange={handleChange} name="cardNumber" />
                                </div>
                            </div>
                            <div className="payment-inputs-container">
                                    <div class="payment-group">
                                    <svg width="800px" height="800px" viewBox="0 0 1024 1024" class="icon"  version="1.1" 
                                        xmlns="http://www.w3.org/2000/svg"><path d="M691.573 338.89c-1.282 109.275-89.055 197.047-198.33 198.331-109.292 1.282-197.065-90.984-198.325-198.331-0.809-68.918-107.758-68.998-106.948 0 1.968 167.591 137.681 303.31 305.272 305.278C660.85 646.136 796.587 503.52 798.521 338.89c0.811-68.998-106.136-68.918-106.948 0z" 
                                        fill="#4A5699" /><path d="M294.918 325.158c1.283-109.272 89.051-197.047 198.325-198.33 109.292-1.283 197.068 90.983 198.33 198.33 0.812 68.919 107.759 68.998 106.948 0C796.555 157.567 660.839 21.842 493.243 19.88c-167.604-1.963-303.341 140.65-305.272 305.278-0.811 68.998 106.139 68.919 106.947 0z" 
                                        fill="#C45FA0" /><path d="M222.324 959.994c0.65-74.688 29.145-144.534 80.868-197.979 53.219-54.995 126.117-84.134 201.904-84.794 74.199-0.646 145.202 29.791 197.979 80.867 54.995 53.219 84.13 126.119 84.79 201.905 0.603 68.932 107.549 68.99 106.947 0-1.857-213.527-176.184-387.865-389.716-389.721-213.551-1.854-387.885 178.986-389.721 389.721-0.601 68.991 106.349 68.933 106.949 0.001z" fill="#E5594F" /></svg>
                                <input className="payment-input" type="text" placeholder="Card Holder"
                                 value={cardDetails.name} onChange={handleChange} name="name" />
                                </div>
                            </div>
                            <div className="payment-inputs-container">
                                    <div class="payment-group">
                                    <svg width="800px" height="800px" viewBox="0 0 1024 1024" class="icon"  version="1.1" 
                                        xmlns="http://www.w3.org/2000/svg"><path d="M691.573 338.89c-1.282 109.275-89.055 197.047-198.33 198.331-109.292 1.282-197.065-90.984-198.325-198.331-0.809-68.918-107.758-68.998-106.948 0 1.968 167.591 137.681 303.31 305.272 305.278C660.85 646.136 796.587 503.52 798.521 338.89c0.811-68.998-106.136-68.918-106.948 0z" 
                                        fill="#4A5699" /><path d="M294.918 325.158c1.283-109.272 89.051-197.047 198.325-198.33 109.292-1.283 197.068 90.983 198.33 198.33 0.812 68.919 107.759 68.998 106.948 0C796.555 157.567 660.839 21.842 493.243 19.88c-167.604-1.963-303.341 140.65-305.272 305.278-0.811 68.998 106.139 68.919 106.947 0z" 
                                        fill="#C45FA0" /><path d="M222.324 959.994c0.65-74.688 29.145-144.534 80.868-197.979 53.219-54.995 126.117-84.134 201.904-84.794 74.199-0.646 145.202 29.791 197.979 80.867 54.995 53.219 84.13 126.119 84.79 201.905 0.603 68.932 107.549 68.99 106.947 0-1.857-213.527-176.184-387.865-389.716-389.721-213.551-1.854-387.885 178.986-389.721 389.721-0.601 68.991 106.349 68.933 106.949 0.001z" fill="#E5594F" /></svg>
                                <input className="payment-input" type="text" placeholder="CVV"
                                 value={cardDetails.cvv} onChange={handleChange} name="cvv" />
                                </div>
                            </div>
                            <div className="payment-dates" onClick={ scrollDiv } >
                                <Combobox
                                    selectedItem = { cardDetails.month }
                                    menuType = "month"
                                    isMenuActive = { menuActivation.isMonthMenuActive } 
                                    toggleMenu = { toggleMenu }
                                    options = { monthMenuOptions }
                                    handleOptionClick = { handleOptionClick }
                                    width = "1vw"
                                />
                                <Combobox
                                    selectedItem = { cardDetails.year }
                                    menuType = "year"
                                    isMenuActive = { menuActivation.isYearMenuActive } 
                                    toggleMenu = { toggleMenu }
                                    options = { years }
                                    handleOptionClick = { handleOptionClick }
                                    width = "2vw"
                                />
                            </div>
                        </div>
                    </div>
                    <div className="pay-button-container">
                        <div> 
                            <svg viewBox="0 0 24 24" id="cart">
                                <path fill="#ffffff" d="M17,18A2,2 0 0,1 19,20A2,2 0 0,1 17,22C15.89,22 15,21.1 15,20C15,18.89 15.89,18 17,18M1,2H4.27L5.21,4H20A1,1 0 0,1 21,5C21,5.17 20.95,5.34 20.88,5.5L17.3,11.97C16.96,12.58 16.3,13 15.55,13H8.1L7.2,14.63L7.17,14.75A0.25,0.25 0 0,0 7.42,15H19V17H7C5.89,17 5,16.1 5,15C5,14.65 5.09,14.32 5.24,14.04L6.6,11.59L3,4H1V2M7,18A2,2 0 0,1 9,20A2,2 0 0,1 7,22C5.89,22 5,21.1 5,20C5,18.89 5.89,18 7,18M16,11L18.78,6H6.14L8.5,11H16Z" />
                            </svg>
                            <p>
                                PAY Rs. 1500
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </Modal>
    );
}

export default PaymentModal;
