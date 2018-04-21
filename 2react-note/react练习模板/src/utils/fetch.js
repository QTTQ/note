import fetch from 'isomorphic-fetch';
import Mock from 'mockjs';

const API = {};
Mock.mock('qqq.com', {
    // 'list|1-10': [{
    //     'id|+1': 1,
    //     'email': '@EMAIL'
    // }]
    'userName|1':['QQQ'],
    'passWord|1': ['QQQ'],

})

// export default function reqAjax(url, body) {
const reqAjax = (url, body) => {
    return new Promise((resolve, reject) => {
        fetch(url, {
            method: 'GET',
            mode: "cors",
            headers: {
                "Content-Type": "application/json"
            },
            // body: { username, password }
            body: body
        }).then(res => res.json()).then(res => {
            console.log(res, '....');
            // 成功, 处理逻辑
            // alert('恭喜您注册成功了');
            resolve(res);
        }).catch((error) => {
            reject(error);
        })
    })
}
export { reqAjax }

