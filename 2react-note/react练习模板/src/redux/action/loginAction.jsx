import {reqAjax} from '../../utils/fetch'

export const login = (login) => {
    return {
        type: 'LOGIN',
    }
}

export const registerAjax = (url,body) => {
    return {
        type: 'REGISTER',
        // register: reqAjax(url, body)
        register:body
    }
}