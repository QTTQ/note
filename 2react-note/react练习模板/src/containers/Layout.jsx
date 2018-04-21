import React, { Component, PropTypes } from 'react'; // 引入了React和PropTypes。PropTypes是用于检查props参数类型，可有可无，最好是有
import { BrowserRouter, Route, Link, Switch, withRouter } from 'react-router-dom'

//连接redux
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { is, fromJS } from 'immutable';


import HeaderReact from './Header_React.jsx/index'
import ContentReact from './Content_React.jsx/index'
import FooterReact from './Footer_React.jsx'


import 'antd/dist/antd.css';
import { Layout } from 'antd';
const { Header, Footer, Sider, Content } = Layout;


// // import { is, fromJS } from 'immutable';
// // import Config from '../../config/index';

// const main = ({ ...props }) => {
//     const { history } = props;
//     console.log('Layout---history.location.pathname', history.location.pathname)
//     // const main = () => {
//     return (
//         // <BrowserRouter>
//         <Layout>
//             <Header>
//                 {/* //加{ ...props }子组件才能接受全部上级的props */}
//                 <HeaderReact  { ...props } />
//             </Header>
//             <Content>
//                 <ContentReact />
//             </Content>
//             <Footer>
//                 {/* //加{ ...props }子组件才能接受全部上级的props */}
//                 <FooterReact { ...props } />
//             </Footer>
//         </Layout>
//         // </BrowserRouter>
//     )
// }
// //有withRouter后 可以提供history this.props.history调取
// // export default withRouter(main)
// export default main

// -----------------------------------

class main extends Component {
    constructor(props) {
        super(props);
    }
    componentDidMount() {
        console.log('------------------------',this.props);
    }
    shouldComponentUpdate(nextProps, nextState) {
        if (nextProps.location.pathname !== this.props.location.pathname) {
            return true;
        } else {
            return false
        }
        // return !is(fromJS(this.props), fromJS(nextProps)) || !is(fromJS(this.state), fromJS(nextState))
    }
    render() {
        const { history } = this.props;
        console.log('Layout--this.props', this.props);
        // const main = () => {
        return (
            // <BrowserRouter>
            <Layout>
                <Header>
                    {/* //加{ ...props }子组件才能接受全部上级的props */}
                    <HeaderReact  { ...this.props } />
                </Header>
                <Content>
                    <ContentReact { ...this.props } />
                </Content>
                <Footer>
                    {/* //加{ ...props }子组件才能接受全部上级的props */}
                    <FooterReact { ...this.props } />
                </Footer>
            </Layout>
            // </BrowserRouter>
        )
    }
}

//有withRouter后 可以提供history this.props.history调取
// export default withRouter(main)
export default main