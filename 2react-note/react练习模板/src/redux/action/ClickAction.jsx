
export const Click = (n) => {
    if (n == 2) {
        alert("呵呵哒")
    }
    return dispatch => {
        // 都可以
        // return dispatch(Click1())
        return dispatch((function name(params) {
            return {
                type: 'CLICKADD',
            }
        })())
    }
}
const Click1 = () => {
    return {
        type: 'CLICKADD',
    }
}