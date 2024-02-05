import "./SearchComboBox.css";

function SearchComboBox(props) {
    return (
        <div style={{ width: props.width, cursor: (props.province && props.province !== 'Province') ? "pointer" : "default" }} 
            className={`wrapper ${props.isMenuActive ? 'active' : ''}`}
        >
            <div className="searchSelect-btn" onClick={() => {
                    props.toggleMenu(props.menuType);
                    props.setSearchText("");
                }}>
                <span className={props.province && props.province !== "Province" ? "" : "greyText"}>{props.selectedItem}</span>
                <box-icon name={props.isMenuActive ? 'chevron-up' : 'chevron-down'} color={props.province && props.province !== 'Province' ? 'black' : 'grey'} size="sm" />
            </div>
            <div className="searchDropdownContent">
                <div className="search">
                <input
                    spellCheck="false"
                    type="text"
                    placeholder={`Search for a ${props.menuType}..`}
                    value={props.searchText}
                    onChange={props.handleSearch}
                />
                </div>
                <ul className="searchDropdownOptions">
                {props.filteredOptions.map((item, index) => (
                    <li key={index} onClick={() => {
                        props.setSearchText("");
                        props.handleOptionClick(item, props.menuType)
                    }}>
                    {item}
                    </li>
                ))}
                </ul>
            </div>
        </div>
    );
}

export default SearchComboBox;