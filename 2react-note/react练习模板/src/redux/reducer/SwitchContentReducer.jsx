import { fromJS } from 'immutable';
import { SWITCHCONTENTACTION } from '../constants/dispatchFristTypes';
const initialState = {
    SwitchcontentState: 1
};

const SwitchcontentReducer = (state = initialState, action) => {
    switch (action.type) {
        case SWITCHCONTENTACTION: 
            return fromJS(state).merge({ SwitchcontentState: action.SwitchcontentActionState }).toJS();
        default:
            return state;
    }
}

export default SwitchcontentReducer;