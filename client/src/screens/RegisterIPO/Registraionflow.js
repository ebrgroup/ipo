import React from 'react'
import Registrationsteps from '../global-components/Registration Steps/Registrationsteps'
import './registrationflow.css'

const Registraionflow = ({ screen }) => {
    return (

        <main className="Registration-Flow">
            <aside>
                <Registrationsteps />
            </aside>
            <section>
                {screen}
            </section>
        </main>

    )
}

export default Registraionflow
