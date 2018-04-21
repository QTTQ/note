import React, { Component, PropTypes } from 'react'; // 引入了React和PropTypes。PropTypes是用于检查props参数类型，可有可无，最好是有
import { Click } from '../../redux/action/ClickAction'
import { BrowserRouter, Route, Link, withRouter } from 'react-router-dom'

//连接redux
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { is, fromJS } from 'immutable';

//工具组件-订阅者模式
import Bus from '../../utils/onfire'

import 'antd/dist/antd.css';
import { Button } from 'antd';

// import Config from '../../config/index';

class Header_Main extends Component {
    constructor(props) {
        super(props);
        this.state = { urlNum: '/Layout' }
    }
    shouldComponentUpdate(nextProps, nextState) {
        if (nextProps.location.pathname !== this.props.location.pathname) {
            return true;
        } else {
            return false
        }
        // return !is(fromJS(this.props), fromJS(nextProps)) || !is(fromJS(this.state), fromJS(nextState))
    }
    componentDidMount() {
        Bus.on("goBackUrl", (e) => {
            this.setState({ urlNum: e })
        })
    }
    componentWillUnmount() {
        Bus.clear()
    }
    _goBack = () => {
        const { history } = this.props;
        history.goBack()
    }
    _changeShowOrHide = () => {
        // const { history, location } = this.props;
        // // console.log('this.props.history-------', this.props.history.location.pathname)
        // // console.log('this.props.match.url1123', this.props.match);
        // //获取地址栏路径名
        // // console.log('this.props.location.pathname--', window.location)
        // console.log(window.location.pathname)
        // console.log(window.Location)


        // // if (window.location.Location.pathname === '/Layout') {
        // //     alert()
        // //     this.setState({ urlNum: '/Layout' })
        // // }
    }
    render() {
        const { actions, text, history } = this.props;
        const { Click } = actions;
        const { urlNum } = this.state
        console.log('Header---history.location.pathname', Click)
        return (
            <div className='cl-HeaderBtn'>
                {/* 订阅者模式实现首页返回按钮隐藏 */}
                {/* {urlNum === '/Layout' ? '' : < Button type="primary" onClick={() => { this._goBack(), this._changeShowOrHide() }} >history.goBack()</Button>} */}
                {/* 用路由形式实现首页返回按钮隐藏 父级{...props}得传入子组件 否则不好使 */}
                {this.props.history.location.pathname === '/Layout' ? '' : < Button type="primary" onClick={() => { this._goBack() }} >history.goBack()</Button>}
                <Button type="primary" onClick={() => { Click(2)}} >头部点击容器数据变化</Button>
            </div>
        )
    }
}
// 将 action 作为 props 绑定到 Product 上。
const mapDispatchToProps = (dispatch, ownProps) => ({
    actions: bindActionCreators({ Click }, dispatch)
});

const Main = connect(undefined, mapDispatchToProps)(Header_Main); // 连接redux
//有withRouter后 可以提供history this.props.history调取 否则只能从父级用{...props}传入
// export default withRouter(Main)
export default Main