import React, { useState } from 'react'
import './Navbar.css'
import patent from '../../../assets/Icons/icons8-patent-32.png'
import design from '../../../assets/Icons/icons8-design-50.png'
import { useDispatch } from 'react-redux'
import { searchByName, trackById } from '../../../assets/states/middlewares/ipTable-data.js'
import { useLocation } from 'react-router-dom'


const Navbar = ({ searchTitle }) => {
    const [display, setDisplay] = useState(false)
    const [search, setSearch] = useState('')
    const dispatch = useDispatch();
    const location = useLocation()
    const handleChange = (e) => {
        let input = e.target.value
        input = input.replace('#', '')
        setSearch(input);  //Get Search_IP from SearchBox

    }

    const showTypes = () => {
        setDisplay(!display);  //Toggle display
    }

    const handleSearch = () => {
        if (search) {
            if (location.pathname == '/searchip') {
                dispatch(searchByName(search))
            }
            else if (location.pathname == '/trackip') {
                dispatch(trackById(search))
            }
        }
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
                <button className='search btn' onClick={handleSearch} >Search</button>
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
