
export const registerdTrademark = (count) => ({
    type: "REGISTERED_TRADEMARK",
    payload: count
})
export const appliedTrademark = (count) => ({
    type: "APPLIED_TRADEMARK",
    payload: count
})
export const resetcount = () => ({
    type: "RESET_COUNT"
})