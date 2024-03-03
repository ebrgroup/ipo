const IPHelpContent = {
    link1: { text: 'IP Introduction', link: './link1' },
    link2: { text: 'How to register IP?', link: './link2' },
    link3: { text: 'IP Classification', link: './link3' },
    link4: { text: 'IP fee and forms guidlines', link: './link4' },
    link5: { text: 'Video tutorial', link: './link3' },
    link6: { text: 'Filling guidelines', link: './link4' }
}
const TrademarkHelpContent = {
    link1: { text: 'Trademark Introduction', link: './link1' },
    link2: { text: 'How to register Trademark?', link: './link2' },
    link3: { text: 'Trademark Classification', link: './link3' },
    link4: { text: 'Trademark fee and forms guidlines', link: './link4' },
    link5: { text: 'Video tutorial', link: './link3' },
    link6: { text: 'Filling guidelines', link: './link4' }
}
const PatentHelpContent = {
    link1: { text: 'Patent Introduction', link: './link1' },
    link2: { text: 'How to register Patent?', link: './link2' },
    link3: { text: 'Patent Classification', link: './link3' },
    link4: { text: 'Patent fee and forms guidlines', link: './link4' },
    link5: { text: 'Video tutorial', link: './link3' },
    link6: { text: 'Filling guidelines', link: './link4' }
}
const DesignHelpContent = {
    link1: { text: 'Design Introduction', link: './link1' },
    link2: { text: 'How to register Design?', link: './link2' },
    link3: { text: 'Design Classification', link: './link3' },
    link4: { text: 'Design fee and forms guidlines', link: './link4' },
    link5: { text: 'Video tutorial', link: './link3' },
    link6: { text: 'Filling guidelines', link: './link4' }
}
const CopyrightHelpContent = {
    link1: { text: 'Copyright Introduction', link: './link1' },
    link2: { text: 'How to register Copyright?', link: './link2' },
    link3: { text: 'Copyright Classification', link: './link3' },
    link4: { text: 'Copyright fee and forms guidlines', link: './link4' },
    link5: { text: 'Video tutorial', link: './link3' },
    link6: { text: 'Filling guidelines', link: './link4' }
}


export const registerIPHelp = () => ({
    type: "REGISTERIP-HELP",
    payload: IPHelpContent
})
export const registerTrademarkHelp = () => ({
    type: "REGISTERTRADEMARK-HELP",
    payload: TrademarkHelpContent
})
export const registerPatentHelp = () => ({
    type: "REGISTERPATENT-HELP",
    payload: PatentHelpContent
})
export const registerDesignHelp = () => ({
    type: "REGISTERDESIGN-HELP",
    payload: DesignHelpContent
})
export const registerCopyrightHelp = () => ({
    type: "REGISTERCOPYRIGHT-HELP",
    payload: CopyrightHelpContent
})

