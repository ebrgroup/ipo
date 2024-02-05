import "./AuthHome.css";
import ipoLogo from "../../assets/Icons/ipologo.png";

const AuthHome = (props) => {

    return (
        <main className="authHome">
            <div className="formHolderDiv">
                <div className="formHolderDivContent">
                    <img src={ipoLogo} alt="IPO Logo" className="ipoLogoImg" />
                    {props.screen}
                </div>
            </div>
            <div className="sideContentDiv">
                <div className="authContentDiv">
                    <h1 className="authHeading">
                        Intellectual Property Excellence
                    </h1>
                    <p className="ipoDescText">
                        We are the forefront guardians of intellectual property rights. Committed to excellence, we provide tailored 
                        solutions for individuals and businesses.
                    </p>
                    <p className="joinedUsText">
                        3k+ people joined us, now it’s your turn
                    </p>
                </div>
            </div>
        </main>
    );
};

export default AuthHome;