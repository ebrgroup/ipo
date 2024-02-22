import "./inputs.css";

const Inputs = (props) => {

    return(
        <>
            <div className="owner-input-container">
                {props.inputData.map((data) => (
                    <>
                        <label>{ data.label }</label>
                        <input placeholder={ data.placeholder } type="text" />
                    </>
                ))}
            </div>
        </>
    );
}

export default Inputs;