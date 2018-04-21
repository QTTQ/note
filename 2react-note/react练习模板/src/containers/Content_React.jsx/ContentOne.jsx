
import React, { Component, PropTypes } from 'react'; // 引入了React和PropTypes。PropTypes是用于检查props参数类型，可有可无，最好是有
import { BrowserRouter, Route, Link, Switch } from 'react-router-dom'


//连接redux
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { is, fromJS } from 'immutable';

//工具组件-订阅者模式
import Bus from '../../utils/onfire'

import 'antd/dist/antd.css';
import { Table, Icon } from 'antd';

const { Column, ColumnGroup } = Table;

class main extends Component {
    constructor(props) {
        super(props);
    }
    shouldComponentUpdate(nextProps, nextState) {
        return !is(fromJS(this.props), fromJS(nextProps)) || !is(fromJS(this.state), fromJS(nextState))
    }
    componentDidMount() {
        Bus.fire("goBackUrl", '/Layout')
    }
    _sendToParent = () => {
        this.props.parentSendFn("子级传到父级的信息")
    }
    render() {
        console.log("ContentOne--this.props", this.props);
        return (
            <div className="content_1">
                <div>{this.props.aaStr}父级数据</div>
                <div>{this.props.bbStr}父级数据</div>
                <button type="button" onClick={() => { this._sendToParent() }}>子级调用父级方法传送数据</button>
                <Table dataSource={data}>
                    <ColumnGroup title="Name">
                        <Column
                            title="First Name"
                            dataIndex="firstName"
                            key="firstName"
                        />
                        <Column
                            title="Last Name"
                            dataIndex="lastName"
                            key="lastName"
                        />
                    </ColumnGroup>
                    <Column
                        title="HHE"
                        dataIndex="age"
                        key="age"
                    />
                    <Column
                        title="Address"
                        dataIndex="address"
                        key="address"
                    />
                    <Column
                        title="Action"
                        key="action"
                        render={(text, record) => (
                            <span>
                                <a href="#">Action 一 {record.name}</a>
                                <span className="ant-divider" />
                                <a href="#">Delete</a>
                                <span className="ant-divider" />
                                <a href="#" className="ant-dropdown-link">
                                    More actions <Icon type="down" />
                                </a>
                            </span>
                        )}
                    />
                </Table>
            </div>
        )
    }
}
const data = [{
    key: '1',
    firstName: 'HAHA',
    lastName: 'Brown',
    age: 32,
    address: 'New York No. 1 Lake Park',
}, {
    key: '2',
    firstName: 'Jim',
    lastName: 'Green',
    age: 42,
    address: 'London Nok',
}];

export default main


