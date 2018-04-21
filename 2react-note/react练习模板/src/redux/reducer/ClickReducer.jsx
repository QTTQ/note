import { fromJS } from 'immutable';
import { CLICKADD } from '../constants/dispatchFristTypes';

// 初始化state数据
const initialState = {
    textState: 0
};

/**
 * ClickAdd reducer
 * @return
 */
const ClickAddReducer = (state = initialState, action) => {
    switch (action.type) {
        // case INITIAL_STATE: // 初始化state数据
        //     return fromJS(state).merge({ loginInfo: [] }).toJS();
        case CLICKADD: // 登录成功
            return fromJS(state).merge({ textState: state.textState + 1 }).toJS();
        default:
            return state;
    }
}

export default ClickAddReducer;