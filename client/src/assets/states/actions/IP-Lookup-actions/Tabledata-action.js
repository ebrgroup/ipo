export const searchIp = (data) => ({
    type: "SEARCH-IP",
    payload: data
})
export const trackIp = (data) => ({
    type: "TRACK-IP",
    payload: data
})
export const resetIpStates = () => ({
    type: "RESET-STATES"
})