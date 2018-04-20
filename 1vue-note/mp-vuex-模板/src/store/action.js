import {
    INDEX,
    INDEX1
} from './mutation-types.js'
const getData=()=>{
    return Math.random()+10
}
const getOtherData = (e) => {
    return e
}
export default {
    async indexAction({ commit }) {
        commit(INDEX, await getData())
    },
    async indexAction1({ dispatch, commit }, e) {
        await dispatch('indexAction') // 等待 actionA 完成
        commit(INDEX1, await getOtherData(e))
    }
}
