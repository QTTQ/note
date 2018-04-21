
import React, { Component, PropTypes } from 'react'; // 引入了React和PropTypes。PropTypes是用于检查props参数类型，可有可无，最好是有
import { BrowserRouter, Route, Link, withRouter} from 'react-router-dom'

//连接redux
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { is, fromJS } from 'immutable';

import 'antd/dist/antd.css';
import { Cascader, Button} from 'antd';

class main extends Component {
    shouldComponentUpdate(nextProps, nextState) {
        return !is(fromJS(this.props), fromJS(nextProps)) || !is(fromJS(this.state), fromJS(nextState))
    }
    focusTextInput=()=> {
        console.log(1111);
        this.textInput.focus(
            (e)=>{
                console.log(e)
            }
        );
    }
    render() {
        // console.log("this.props.match", this.props.match);
        console.log("ContentTwo--this.props", this.props);
        return (
            <div className="content_2">
                    <Cascader options={options} onChange={onChange} placeholder="Please select" />
                <input
                    type="text"
                    ref={(input) => { this.textInput = input; }} />
                <input
                    type="button"
                    value="Focus the text input"
                    onClick={() => { this.focusTextInput()}}
                />111
                <div>content_2</div>
            </div>
        )
    }
}
/**
 * 上下分别为获取match的类形式和函数形式
 */

// const main=({match})=>{
//     console.log('match',match)
//     return (
//         <div className="content_2">
//             <Cascader options={options} onChange={onChange} placeholder="Please select" />
//             <div>content_2</div>
//         </div>
//     )
// }
const options = [{
    value: 'zhejiang',
    label: 'Zhejiang',
    children: [{
        value: 'hangzhou',
        label: 'Hangzhou',
        children: [{
            value: 'xihu',
            label: 'West Lake',
        }],
    }],
}, {
    value: 'jiangsu',
    label: 'Jiangsu',
    children: [{
        value: 'nanjing',
        label: 'Nanjing',
        children: [{
            value: 'zhonghuamen',
            label: 'Zhong Hua Men',
        }],
    }],
}];

function onChange(value) {
    // console.log(value);
    alert(value)
}


export default main


