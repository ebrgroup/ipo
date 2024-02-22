import { useEffect, useRef, useState } from "react";
import "./ownerdetails.css";
import Inputs from "./components/Inputs";
import { useNavigate } from "react-router-dom";

const OwnerDetails = (props) => {

    const soleProprieterShip = [
        { label: "Trading As (Business Name)", placeholder: "Business Name" },
        { label: "Business Adress", placeholder: "Business Adress" },
        { label: "Province", placeholder: "Province" },
        { label: "City", placeholder: "City" },
    ]

    const partnershipFirm = [
        { label: "Trading As (Business Name)", placeholder: "Business Name" },
        { label: "Business Adress", placeholder: "Business Adress" }
    ]

    const singleMemberCompany = [
        { label: "Company Name", placeholder: "Company Name" },
        { label: "Trading As (Business Name)", placeholder: "Business Name" },
        { label: "Business Adress", placeholder: "Business Adress" },
    ]

    const other = [
        { label: "Other (Business Type Description)", placeholder: "Description" },
        { label: "Company Name", placeholder: "Company Name" },
        { label: "Trading As (Business Name)", placeholder: "Business Name" },
        { label: "Business Adress", placeholder: "Business Adress" },
    ]

    const [selectedOption, setSelectedOption] = useState({
        name: "soleProprieterShip",
        array: soleProprieterShip
    });

    const [partnersData, setPartnersData] = useState([
    ]);

    const [isPartnershipFirm, setPartnershipFirm] = useState(false);
    const navigate = useNavigate(null);

    const fullNameRef = useRef(null);
    const nationalityRef = useRef(null);
    const cnicRef = useRef(null);

    const handleAddClick = () => {
        setPartnersData([
            ...partnersData,
            { 
                fullName: fullNameRef.current.value,
                nationality: nationalityRef.current.value,
                cnic: cnicRef.current.value
            }
        ]);
    }

    const handleChange = (e) => {
        let selectedItem = null;
        if(e.target.name === "singleMemberCompany" || e.target.name === "privateLimitedCompany"
            || e.target.name === "publicLimitedCompany") {
            selectedItem = singleMemberCompany;
            setPartnershipFirm(false);
        } else if(e.target.name === "partnershipFirm") {
            selectedItem = partnershipFirm;
            setPartnershipFirm(true);
            setPartnersData([]);
        } else {
            selectedItem = eval(e.target.name);
            setPartnershipFirm(false);
        }
        setSelectedOption({
            name: e.target.name,
            array: selectedItem
        });
    }

    useEffect(() => {
        props.Progress(100);
    }, []);

    return(
        <div className="owner-screen-background">
            <h4 className="owner-main-heading">Application for registration of trademark</h4>
            <div className="owner-screen-parent">
                <div className="owner-heading">
                    <img src={require("../../../../assets/Icons/owner-icon.png")} className="owner-icon" />
                    <h4>Owner and Business Details</h4>
                </div>
                <div class="radio-inputs">
                    <label class="radio">
                        <input type="radio" name="soleProprieterShip" 
                            checked = { selectedOption.name === "soleProprieterShip" } onChange={ handleChange } />
                        <span class="name">Sole Proprietorship</span>
                    </label>
                    <label class="radio">
                        <input type="radio" name="partnershipFirm" 
                            checked = { selectedOption.name === "partnershipFirm" } onChange={ handleChange } />
                        <span class="name">Parntership Firm</span>
                    </label>
                    <label class="radio">
                        <input type="radio" name="singleMemberCompany" 
                            checked = { selectedOption.name === "singleMemberCompany" }  onChange={ handleChange } />
                        <span class="name">Single Member Company</span>
                    </label>
                    <label class="radio">
                        <input type="radio" name="privateLimitedCompany" 
                            checked = { selectedOption.name === "privateLimitedCompany" }  onChange={ handleChange } />
                        <span class="name">Private Limited Company</span>
                    </label>
                    <label class="radio">
                        <input type="radio" name="publicLimitedCompany"
                            checked = { selectedOption.name === "publicLimitedCompany" }  onChange={ handleChange } />
                        <span class="name">Public Limited Company</span>
                    </label>
                    <label class="radio">
                        <input type="radio" name="other" 
                            checked = { selectedOption.name === "other" }  onChange={ handleChange } />
                        <span class="name">Other</span>
                    </label>
                </div>
                {isPartnershipFirm ? (
                    <>
                        <div className="partnership-parent-container">
                            <div className="partnership-input-container">
                                <label>Name of partner</label>
                                <input placeholder="Name" type="text" ref={ fullNameRef } />
                            </div>
                            <div className="partnership-input-container">
                                <label>Nationality</label>
                                <input placeholder="Nationality" type="text" ref={ nationalityRef } />
                            </div>
                            <div className="partnership-input-container">
                                <label>CNIC Number</label>
                                <input placeholder="CNIC" type="text" ref={ cnicRef } />
                            </div>
                            <button className="partnership-add-button" onClick={ handleAddClick }>Add</button>
                        </div>
                        <div className="owner-dataGrid">
                            <table className="owner-dataTable">
                                <thead>
                                    <tr>
                                        <th className="firstHeader">Full name</th>
                                        <th>Nationality</th>
                                        <th>CNIC</th>
                                        <th className="lastHeader">Operations</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {partnersData.length === 0 ? (
                                        <>
                                            <tr>
                                                <td>-</td>
                                                <td>-</td>
                                                <td>-</td>
                                                <td>-</td>
                                            </tr>
                                        </>
                                    ) :
                                    <>
                                         {partnersData.map((data) => {
                                            return (
                                                <tr>
                                                    <td>{data.fullName}</td>
                                                    <td>{data.nationality}</td>
                                                    <td>{data.cnic}</td>
                                                    <td>-</td>
                                                </tr>
                                            );
                                         })}
                                    </>
                                    }
                                </tbody>
                            </table>
                        </div>
                    </>
                ) : null}
                <div className="owner-screen-inputs">
                    <Inputs inputData = { selectedOption.array } />
                </div>
            </div>
            <div className="button-div">
                <button id='continueBtn' onClick={() => navigate("/logodetails")}>Continue</button>
            </div>
        </div>
    );
}

export default OwnerDetails;