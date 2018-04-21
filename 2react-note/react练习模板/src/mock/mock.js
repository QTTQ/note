// // 安装
// // npm install mockjs
// // 使用
// var Mock = require('mockjs');
// var data = Mock.mock('qqq.com',{
//     'list|1-10': [{
//         'id|+1': 1
//     }]
// });
// Mock.mock(/\.json/, {
//     'list|1-10': [{
//         'id|+1': 1,
//         'email': '@EMAIL'
//     }]
// })

// $.ajax({
//     url: 'hello.json',
//     dataType: 'json'
// }).done(function (data, status, jqXHR) {
//     console.table(data)
// })