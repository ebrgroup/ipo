import "./confirmationScreen.css";
import { useNavigate } from "react-router-dom";
import { Player } from "@lottiefiles/react-lottie-player";

const ConfirmationScreen = () => {

    const navigate = useNavigate(null);
    return (
        <div className="confirmation-parent-container">
            <div className="confirmation-child-container">
                <div className="heading-content">
                    <Player src={require("../../../../assets/Icons/confirmation-lottie.json")}
                        autoplay loop className="confirmation-lottie" />
                    <p className="sure-text">
                        Are you sure you are ready to apply?
                    </p>
                    <h6>
                        Before continuing to apply, you should check if you are eligible for applying.
                    </h6>
                </div>
                <div className="confirmation-text-container">
                    <h6>
                        You should check the following:
                    </h6>
                    <h6 className="confirmation-questions" onClick={() => navigate('/searchIp')}>
                        1. <span>If anyone has already registered a trademark similar to yours.</span>
                    </h6>
                    <h6 className="confirmation-questions">
                        2. <span>If your trademark is against assessment criteria.</span>
                    </h6>
                </div>

            </div>
            <div className="btns">
                <button className='backBtn' onClick={() => navigate(-1)} >Back</button>
                <button className="continueBtn" onClick={() => navigate("/confirmprofile")}>Continue</button>
            </div>
        </div>
    );
}

export default ConfirmationScreen;