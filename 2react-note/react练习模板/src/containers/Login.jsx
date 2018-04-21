import React, { Component, PropTypes } from 'react'; // 引入了React和PropTypes。PropTypes是用于检查props参数类型，可有可无，最好是有
import { BrowserRouter, Route, Link } from 'react-router-dom'
// import { createHashHistory as history } from 'history/createHashHistory';
//action
import { login, registerAjax } from '../redux/action/loginAction'
//连接redux
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';


import HeaderReact from './Header_React.jsx/index'
import ContentReact from './Content_React.jsx/index'
import 'antd/dist/antd.css';
import { Layout, Input, Button } from 'antd';

class Login extends Component {
    constructor() {
        super();
        this.state = {
            userName: "",
            passWord: "",
        }
    }
    _loginVerification = () => {
        const { history } = this.props;
        const { userName, passWord } = this.state;
        if (!userName) return alert('用户名不能为空');
        if (!passWord) return alert('密码不能为空');
        if (userName === this.props.userName && passWord === this.props.passWord) {
            history.push('/Layout');
        } else {
            alert('输入不正确 请从新输入')
            return false;
        }
    }
    _RegisteredInformation=()=>{
        const { login, registerAjax } =this.props.actions;
        const { userName, passWord } = this.state;        
        registerAjax("qqq.com", { userName, passWord})
        if (userName !== "" && passWord!==''){
            alert("注册成功");
        }
    }
    _stateChange = (e) => {
        const target = e.target;
        this.setState({
            [target.name]: target.value
        })
    }
    render() {
        const { actions, userName, passWord, history } = this.props;
        const { login, registerAjax} = actions;
        console.log('Login--this.props', this.props);
        return (
            <div className='login' onChange={(e) => { this._stateChange(e) }}>
                <Input name="userName" placeholder="请输入用户名" value={this.state.userName} />
                <Input name='passWord' placeholder="请输入密码" value={this.state.passWord} />
                <Button onClick={() => { this._loginVerification()}}>登录验证</Button>
                <Button onClick={() => { this._RegisteredInformation() }}>注册个人信息</Button>                
            </div>
        )
    }
}

// 将 store 中的数据作为 props 绑定到 LoginForm 上
const mapStateToProps = (state, ownProps) => {
    // let { Common, ClickAdd, LoginApp } = state;
    let { LoginApp, RegisterReducer } = state; //获取reducer中的方法
    return {
        userName: RegisterReducer.userNameState,
        passWord: RegisterReducer.passWordState,
    }
}
// 将 action 作为 props 绑定到 Product 上。我感觉是把actions方法添加到props上
const mapDispatchToProps = (dispatch, ownProps) => ({
    actions: bindActionCreators({ login, registerAjax }, dispatch) //发射action中的方法

});

const Login_redux = connect(mapStateToProps, mapDispatchToProps)(Login); // 连接redux
export default Login_redux


