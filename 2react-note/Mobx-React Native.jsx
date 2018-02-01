// MboX环境配置：

// 1.npm i mobx mobx - react--save //引入mobx
// 2.npm i babel - plugin - transform - decorators - legacy babel - preset - react - native - stage - 0 --save - dev //能够使用@标签
// 3.在.babelrc文件中修改为{
//     "presets": ["react-native"],
//         "plugins": ["transform-decorators-legacy"]
// }
// mobx常用的标签

// @observable: 使用此标签监控要检测的数据；
// @observer: 使用此标签监控当数据变化是要更新的Component（组件类）
// @action: 使用此标签监控数据改变的自定义方法(当在需要数据改变的时候执行此自定义方法，那么View层也会跟着自动变化，默认此View层已经使用@observer标签监控)
// 注：简单的数据，可以直接进行读取和复制操作，View也会变化；

import React, { Component } from 'react';
import {
    View,
    StyleSheet,
    ScrollView,
    Text,
} from 'react-native';

/*
 * 引入这个两个头文件
 * */
import { observable, action } from 'mobx';
import { observer } from 'mobx-react/native';

/*
* 假数据
* */
const datas = [
    { name: '苹果', count: 0 },
    { name: '梨', count: 0 },
    { name: '香蕉', count: 0 },
    { name: '草莓', count: 0 },
    { name: '橘子', count: 0 },
];

/*
* 对整个列表添加观察，观察列表个数的变化
* */
@observer
export default class MobxTestSecond extends Component {

    /*
    * 数据管理器
    * */
    dataManager = new DataSource();

    componentWillMount() {
        /*
        * 赋值初始数据
        * */
        this.dataManager.replace(datas);
    }

    /*
    * 添加一个新的Item
    * */
    addItem = () => {
        let item = { name: '西瓜', count: 0 };
        this.dataManager.addItem(item)
    };

    /*
    * 删除第一个Item
    * */
    deleteItem = () => {
        this.dataManager.deleteItem(0);
    };

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.addItemView}>
                    <Text style={styles.addItem} onPress={this.addItem}>增加</Text>
                    <Text style={styles.addItem} onPress={this.deleteItem}>删除</Text>
                </View>
                <ScrollView>
                    {
                        this.dataManager.dataSource.slice(0).map((item, i) => <ItemView key={i} item={item} />)
                    }
                </ScrollView>
            </View>
        );
    }
}



/*
* 对每一个Item添加观察,改变个数
* */
@observer
class ItemView extends Component {

    countAdd = () => {
        this.props.item.add();
    };

    countDec = () => {
        this.props.item.dec();
    };

    render() {
        const { item } = this.props;
        return (
            <View style={styles.itemContainer}>
                <Text>{item.name}</Text>
                <Text>{item.count}</Text>
                <Text style={styles.btn} onPress={this.countAdd}> + </Text>
                <Text style={styles.btn} onPress={this.countDec}> - </Text>
            </View>
        );
    }
}



/*
 * 整个列表页数据管理器
 * */
class DataSource {
    // 本地数据源
    @observable
    dataSource = [];

    // 添加初始数据
    @action
    replace = (items) => {
        // 1. 清空原数据
        this.dataSource.splice(0, this.dataSource.length);

        // 2. 加载新数据
        items.map((item, i) => {
            this.dataSource.push(new Item(item));
        });
    };

    // 添加新数据
    @action
    addItem = (item) => {
        this.dataSource.unshift(new Item(item));
    };


    // 删除一条数据
    @action
    deleteItem = (idx) => {
        this.dataSource.splice(idx, 1);
    };
}
/*
 * 单条Item数据管理器
 * */
class Item {

    /*
    * 商品名称（此值是不变的所以不需要检测此值）
    * */
    name;

    /*
    * 监控商品个数
    * */
    @observable
    count;


    constructor(item) {
        this.name = item.name;
        this.count = item.count;
    };

    /*
    * 商品个数+1
    * */
    @action
    add = () => {
        this.count += 1;
    };

    /*
    * 商品个数-1
    * */
    @action
    dec = () => {
        this.count > 0 && (this.count -= 1);
    };
}

// 链接：https://www.jianshu.com/p/bbf9837443f3
