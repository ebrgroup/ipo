import { useEffect, useState } from "react";
import "./inputs.css";

const Inputs = (props) => {

    const soleProprieterShip = [
        { label: "Trading As (Business Name)", placeholder: "Business Name", name: "businessName" },
        { label: "Business Adress", placeholder: "Business Adress", name: "businessAddress" },
        { label: "Province", placeholder: "Province", name: "province" },
        { label: "City", placeholder: "City", name: "city" },
    ]

    const partnershipFirm = [
        { label: "Trading As (Business Name)", placeholder: "Business Name", name: "businessName" },
        { label: "Business Adress", placeholder: "Business Adress", name: "businessAddress" }
    ]

    const singleMemberCompany = [
        { label: "Company Name", placeholder: "Company Name", name: "companyName" },
        { label: "Trading As (Business Name)", placeholder: "Business Name", name: "businessName" },
        { label: "Business Adress", placeholder: "Business Adress", name: "businessAddress" },
    ]

    const other = [
        { label: "Other (Business Type Description)", placeholder: "Description", name: "otherBusinessDescription" },
        { label: "Company Name", placeholder: "Company Name", name: "companyName" },
        { label: "Trading As (Business Name)", placeholder: "Business Name", name: "businessName" },
        { label: "Business Adress", placeholder: "Business Adress", name: "businessAddress" },
    ]

    const [selectedArray, setSelectedArray] = useState(soleProprieterShip);

    const handleChange = (e) => {
        props.setOwnerDetails((prevData) => ({
            ...prevData,
            [e.target.name]: e.target.value
        }));
    }

    useEffect(() => {
        let selectedItem = null;
        if (props.inputData === "singleMemberCompany" || props.inputData === "privateLimitedCompany"
            || props.inputData === "publicLimitedCompany") {
            selectedItem = singleMemberCompany;
            props.setPartnershipFirm(false);
        } else if (props.inputData === "partnershipFirm") {
            selectedItem = partnershipFirm;
            props.setPartnershipFirm(true);
            props.setPartnersData([]);
        } else {
            selectedItem = eval(props.inputData);
            props.setPartnershipFirm(false);
        }
        setSelectedArray(selectedItem);
    }, [props.inputData]);

    return (
        <>
            <div className="owner-input-container">
                {selectedArray.map((data) => (
                    <>
                        <label>{data.label} <strong>*</strong></label>
                        <input placeholder={data.placeholder} type="text" 
                            name={data.name} onChange={handleChange}
                            value={props.ownerDetails[`${data.name}`]} />
                    </>
                ))}
            </div>
        </>
    );
}

export default Inputs;