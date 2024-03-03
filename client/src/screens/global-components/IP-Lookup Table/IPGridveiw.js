import React, { useEffect, useState } from 'react';
import { Buffer } from "buffer";
import ipologo from '../../../assets/Icons/ipo.png'
import './IPGridview.css';

const IPGridView = ({ rows }) => {
    const [logos, setLogos] = useState([]);

    useEffect(() => {
        const fetchLogos = async () => {
            const logoData = [];
            for (let i = 0; i < rows.length; i++) {
                const imageName = rows[i].logoDetails.logoFile;
                logoData.push(imageName);
            }
            setLogos(logoData);
        };

        if (rows && rows.length > 0) {
            fetchLogos();
        }
    }, [rows]);

    return (
        <div className='table'>
            {rows ? (
                <table>
                    <thead id='table-header'>
                        <tr>
                            <td> TRADEMARK ID</td>
                            <td>TRADEMARK NAME
                                <i className="fa-solid fa-sort"></i>
                            </td>
                            <td>FILE DATE
                                <i className="fa-solid fa-sort"></i>
                            </td>
                            <td>TRADEMARK CLASS
                                <i className="fa-solid fa-sort"></i>
                            </td>
                            <td> STATUS
                                <i className="fa-solid fa-sort"></i>
                            </td>
                            <td>TRADEMARK LOGO
                                <i className="fa-solid fa-sort"></i>
                            </td>
                        </tr>
                    </thead>
                    <tbody id='table-body'>

                        {rows.map((data, index) => (
                            <tr key={index}>
                                <td>{data.trademarkId}</td>
                                <td>{data.logoDetails.markDesc}</td>
                                <td>{data.fileDate}</td>
                                <td>{data.classificationClass}</td>
                                <td className={
                                    data.status === 'Pending'
                                        ? 'pending'
                                        : data.status === 'Register'
                                            ? 'register'
                                            : 'decline'
                                }
                                >{data.status}</td>
                                <td>
                                    {logos.length > 0 && logos[index] ? (
                                        <img src={logos[index]} alt={`Logo ${index}`} />
                                    ) : (
                                        "Loading..."
                                    )}
                                </td>
                            </tr>
                        ))}

                    </tbody >
                </table >
            ) : (
                <div className="ipo_img">
                    <img src={ipologo} />
                </div>
            )}
        </div >
    );
};

export default IPGridView;