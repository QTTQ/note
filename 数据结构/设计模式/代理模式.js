const guangdongCity = {
    shenzhen: 11,
    guangzhou: 12,
    zhuhai: 13
}
const getGuandongCity = function () {
    let guangdongCity = [
        {
            name: "shenzhen",
            id: 11,
        },
        {
            name: "guangzhou",
            id: 12
        }
    ]
    return guangdongCity
}
const render = function (fn) {
    document.write(JSON.stringify(fn()))
}
const addressAdapter = function (oldAddressfn) {
    let address = {}, oldAddress = oldAddressfn();
    for (let i = 0, c; c = oldAddress[i++];) {//这个遍历 赶脚很好玩 不错
        address[c.name] = c.id
    }
    return () => {
        return address
    }
}
render(addressAdapter(getGuandongCity))