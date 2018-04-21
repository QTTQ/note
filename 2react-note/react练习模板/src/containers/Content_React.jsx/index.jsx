import React, { Component, PropTypes } from 'react'; // 引入了React和PropTypes。PropTypes是用于检查props参数类型，可有可无，最好是有
import { BrowserRouter, Route, Link, Switch } from 'react-router-dom'

//action 
import { Click } from '../../redux/action/ClickAction'
import { SwitchContent } from '../../redux/action/SwitchContentAction'

//连接redux
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

//子组件
import ContentOne from './ContentOne'
import ContentTwo from './ContentTwo'
import ContentThree from './ContentThree'
import ContentFour from './ContentFour'
import NotFind404 from './NotFind404'

import 'antd/dist/antd.css';
import { Button } from 'antd';

class childe extends Component {
    constructor(props) {
        super(props);
        this.state = {
            aaStr: "111",
            bbStr: "bbb"
        }
    }
    _childrenSendFn = (e) => {
        alert(e)
    }

    render() {
        const { actions, textData, SwitchContentData } = this.props;
        const { Click } = actions;
        const { aaStr, bbStr } = this.state;
        console.log('总Content--this.props', this.props);
        return (
            <main className="cl-ContenttextData">
                <Button type="primary" onClick={Click} >容器自身点击自身数据变化</Button>
                <Button type="primary">{textData}</Button>
                <Button type="primary">{SwitchContentData}</Button>
                {(() => {
                    switch (SwitchContentData) {
                        case 1: return (<ContentOne parentSendFn={this._childrenSendFn} {...this.props} aaStr={aaStr} bbStr={bbStr} />);
                        case 2: return (<ContentTwo {...this.props} />);
                        case 3: return (<ContentThree />);
                        case 4: return (<ContentFour />);                        
                        default: return (<ContentOne {...this.props} />);
                    }
                })()}
                <main>
                    /**
                     * 点击Footer中的link路由跟着切换（前提history得有）
                     */
                    <Switch>
                        <Route path="/Layout" exact component={ContentOne} />
                        <Route path="/Layout/ContentTwo" component={ContentTwo} />
                        <Route path="/Layout/ContentThree" component={ContentThree} />
                        <Route path="/Layout/ContentFour" component={ContentFour} />                        
                    </Switch>
                </main>
            </main>
        )
    }
}
// 将 store 中的数据作为 props 绑定到 LoginForm 上
const mapStateToProps = (state, ownProps) => {
    // let { Common, ClickAdd, SwitchContent } = state;
    let { ClickAdd, SwitchContent } = state;
    // console.log('state', state)
    return {
        SwitchContentData: SwitchContent.SwitchcontentState,
        textData: ClickAdd.textState
    }
}

// 将 action 作为 props 绑定到 Product 上。
const mapDispatchToProps = (dispatch, ownProps) => ({
    actions: bindActionCreators({ Click }, dispatch)
});

const Main = connect(mapStateToProps, mapDispatchToProps)(childe); // 连接redux
export default Main