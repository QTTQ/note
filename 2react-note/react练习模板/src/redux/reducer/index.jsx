import { fromJS } from 'immutable';
import { FRIST } from '../constants/dispatchFristTypes';

import { ClickAddReducer as LoginApp, RegisterReducer} from './loginReducer'; // 登录界面
import ClickAdd from './ClickReducer'; 
import SwitchContent from './SwitchContentReducer'; 

// 初始化state数据
const initialState = {
    Common_frist: 0
};

/**
 * 公共reducer
 * @return
 */
const Common = (state = initialState, action) => {
    switch (action.type) {
        // case LOADING: // 用于页面和区块的加载中状态
        //     return fromJS(state).merge({ loading: action.loading }).toJS();
        default:
            return state;
    }
}

export { Common, ClickAdd, LoginApp, SwitchContent, RegisterReducer};