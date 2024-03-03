export const representative = (data) => ({
    type: "REPRESENTATIVE-DATA",
    payload: data
})
export const classification = (data) => ({
    type: "CLASSIFICATION-DATA",
    payload: data
})
export const ownerDetail = (data) => ({
    type: "OWNER_DETAILS-DATA",
    payload: data
})
export const logoDetail = (data) => ({
    type: "LOGO_DETAILS-DATA",
    payload: data
})
export const resetDetails = () => ({
    type: "RESET_DETAILS"
})

