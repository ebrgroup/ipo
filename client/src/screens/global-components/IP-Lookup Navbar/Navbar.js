import React, { useState } from 'react'
import './Navbar.css'
import patent from '../../../assets/Icons/icons8-patent-32.png'
import design from '../../../assets/Icons/icons8-design-50.png'


const Navbar = ({ searchTitle }) => {
    const [display, setDisplay] = useState(false)

    //Get Search_IP from SearchBox
    const handleChange = (e) => {
        let Search_IP = e.target.value;

    }
    const showTypes = () => {
        //Toggle display
        setDisplay(!display);
    }
    return (
        <nav id='Navbar'>
            <div id='Search-Box'>
                <i class="fa-light fa-magnifying-glass"></i>
                <input
                    type="text"
                    placeholder={searchTitle}
                    onChange={handleChange} />
            </div>
            <div className="navbarButtons">
                <button className='type btn' onClick={showTypes}>
                    Select IP Type
                    <i class="fa-sharp fa-light fa-angle-down"></i>
                </button>
                <button className='search btn' >Search</button>
            </div>
            <div className='IPtypes' style={{ 'display': display ? 'block' : 'none' }}>
                <div>
                    <i class="fa-regular fa-trademark"></i>
                    Trademark
                </div>
                <div>
                    <i class="fa-regular fa-copyright"></i>
                    Copyright
                </div>
                <div>
                    <img src={design} />
                    Design
                </div>
                <div>
                    <img src={patent} />
                    Patent
                </div>

            </div>
        </nav>
    )
}

export default Navbar
