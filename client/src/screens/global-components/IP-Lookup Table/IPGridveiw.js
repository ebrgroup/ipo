import React from 'react'
import './IPGridview.css'
import logo from '../../../assets/Icons/coca-cola.png'

const IPGridveiw = () => {
    return (
        <div className='table'>
            <table>
                <thead id='table-header'>
                    <tr  >
                        <td> TRADEMARK ID</td>
                        <td>TRADEMARK NAME
                            <i class="fa-solid fa-sort"></i>
                        </td>
                        <td>FILE DATE
                            <i class="fa-solid fa-sort"></i>
                        </td>
                        <td>TRADEMARK CLASS
                            <i class="fa-solid fa-sort"></i>
                        </td>
                        <td> STATUS
                            <i class="fa-solid fa-sort"></i>
                        </td>
                        <td>TRADEMARK LOGO
                            <i class="fa-solid fa-sort"></i>
                        </td>
                    </tr>
                </thead>
                <tbody id='table-body'>
                    <tr>
                        <td>#75Y25OP</td>
                        <td>Coca Cola</td>
                        <td>29-8-23</td>
                        <td>3</td>
                        <td>Registered</td>
                        <td>
                            <img src={logo} alt="Logo" />
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}

export default IPGridveiw
