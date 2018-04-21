import { fromJS } from 'immutable';
import { LOGIN, REGISTER } from '../constants/dispatchFristTypes';


// 初始化state数据
const initialState = {
    userNameState: '',
    passWordState: ''
};

/**
 * ClickAdd reducer
 * @return
 */
export const ClickAddReducer = (state = initialState, action) => {
    switch (action.type) {
        // case INITIAL_STATE: // 初始化state数据
        //     return fromJS(state).merge({ loginInfo: [] }).toJS();
        case LOGIN:
            // if (state.userNameState === action.userName && state.passWordState === action.passWord){
            //     return fromJS(state).merge({ LoginState: "success"}).toJS();
            // }else{
            //     return state;
            // }
            // return fromJS(state).merge({ LoginState: "success"}).toJS();
            return state;
        default:
            return state;
    }
}

export const RegisterReducer = (state = initialState, action) => {
    switch (action.type) {
        case REGISTER:
            return fromJS(state).merge({ userNameState: action.register.userName, passWordState: action.register.passWord }).toJS();
        default:
            return state;
    }
}

// export default ClickAddReducer;