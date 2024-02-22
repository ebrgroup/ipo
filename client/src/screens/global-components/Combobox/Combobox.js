import "./Combobox.css";

function Combobox(props) {
    return (
        <div  className={`select-menu ${props.isMenuActive ? 'active' : ''}`}>
            <div className="select-btn" onClick={() => props.toggleMenu(props.menuType)}>
                <span className="sBtn-text">{props.selectedItem}</span>
                <box-icon name={props.isMenuActive ? "chevron-up" : "chevron-down"} color="black" size="sm" />
            </div>
            <ul className="options optWidth">
                {props.options && props.options.map((option, index) => (
                    <li key={index} className="option" onClick={() => props.handleOptionClick(option, props.menuType)}>
                        <span className="option-text">{option}</span>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Combobox;