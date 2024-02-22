import React from "react";
import Helpdesk from "../global-components/HelpAndSupport/Helpdesk";
import './registeripo.css'

const RegisterIPO = ({ screen }) => {

    return (
        <>
            <main className="IP-Registration">
                <section>
                    {screen}
                </section>
                <aside>
                    <Helpdesk />
                </aside>
            </main>

        </>
    )
}

export default RegisterIPO;