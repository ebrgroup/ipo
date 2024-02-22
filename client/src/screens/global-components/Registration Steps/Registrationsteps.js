import React from 'react'
import './registrationSteps.css'

const Registrationsteps = () => {
    return (
        <div id='FlowSteps-container'>
            <div id='flow-title'>
                <i class="fa-solid fa-circle-check"></i>
                <h5>Application Status</h5>
            </div>
            <div className="Steps-section">
                <div className='step-btn'>
                    <span>1.</span>
                    <span>Classification</span>
                </div>
                <div className='step-btn'>
                    <span>2.</span>
                    <span>Owner Details</span>
                </div>
                <div className='step-btn active'>
                    <span>3.</span>
                    <span>Logo Details</span>
                </div>
                <div className='step-btn'>
                    <span>4.</span>
                    <span>Review</span>
                </div>
                <div className='step-btn'>
                    <span>5.</span>
                    <span>Fee submission</span>
                </div>
            </div>
        </div>
    )
}

export default Registrationsteps
