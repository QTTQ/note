import * as actions from '../actions/';
function mapDispatchToProps(dispatch) {
    return bindActionCreators(
        Object.assign({}, ...Object.keys(actions).map(key => ({ [key]: actions[key] }))),
        dispatch
    );
}