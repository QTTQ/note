import React, { Component, PropTypes } from 'react'; // 引入了React和PropTypes。PropTypes是用于检查props参数类型，可有可无，最好是有
import { BrowserRouter, Route, Link, Switch } from 'react-router-dom'

//action
import { SwitchContent } from '../../redux/action/SwitchContentAction'

//连接redux
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { is, fromJS } from 'immutable';

//工具组件-订阅者模式
import Bus from '../../utils/onfire'

//子组件
import ContentOne from '../Content_React.jsx/ContentOne'
import ContentTwo from '../Content_React.jsx/ContentTwo'
import ContentThree from '../Content_React.jsx/ContentThree'
import NotFind404 from '../Content_React.jsx/NotFind404'

import 'antd/dist/antd.css';
import { Button } from 'antd';

class Footer_Main extends Component {
    // const FooterMain = ({ SwitchContent = this.props.actions}) => {
    shouldComponentUpdate(nextProps, nextState) {
        console.log('Footer--nextProps.location.pathname', nextProps.location.pathname);
        if (nextProps.location.pathname !== this.props.location.pathname) {
            return true;
        } else {
            return false
        }
        // return !is(fromJS(this.props), fromJS(nextProps)) || !is(fromJS(this.state), fromJS(nextState))
    }
    _changeBus = (e) => {
        Bus.fire("goBackUrl", e)
    }
    render() {
        const { actions } = this.props;
        const { SwitchContent } = actions;
        // console.log('Footer--this.props', this.props)
        console.log('Footer---history.location.pathname', this.props.history.location.pathname)
        return (
            /**
             * 类中没有BrowserRouter路由跳转会失效 除非从父级传入{...props}可以提供history
             */
            // <BrowserRouter>
            <div className="cl-FooterBtn" >
                <Button type="primary" onClick={() => { SwitchContent(1) }}> Switchcontent1</Button>
                <Button type="primary" onClick={() => { SwitchContent(2) }}> Switchcontent2</Button>
                <Button type="primary" onClick={() => { SwitchContent(3) }}> Switchcontent3</Button>
                <Button type="primary" onClick={() => { SwitchContent(4) }}> Switchcontent4</Button>
                {
                    <div>
                        <Link to='/Layout'><Button type="primary" onClick={() => { this._changeBus('/Layout') }}> text1</Button></Link>
                        <Link to='/Layout/ContentTwo'><Button type="primary" onClick={() => { this._changeBus('/Layout/ContentTwo') }}> text2</Button></Link>
                        <Link to='/Layout/ContentThree'><Button type="primary" onClick={() => { this._changeBus('/Layout/ContentThree') }}> text3</Button></Link>
                        <main>
                            <Switch>
                                <Route path="/Layout" exact component={ContentOne} />
                                <Route path="/Layout/ContentTwo" component={ContentTwo} />
                                <Route path="/Layout/ContentThree" component={ContentThree} />
                            </Switch>
                        </main>
                    </div>
                }
            </div>
            //  </BrowserRouter>
        )
    }
}


const mapDispatchToProps = (dispatch, ownProps) => ({
    actions: bindActionCreators({ SwitchContent }, dispatch)
})
const Main = connect(undefined, mapDispatchToProps)(Footer_Main); // 连接redux
//有withRouter后 可以提供history this.props.history调取 否则只能从父级用{...props}传入
// export default withRouter(Main)
export default Main
