let a = [1, 1, 2, 3, 4, 5, 5]
let unique = (a) => ([...new Set(a)])
console.log(unique(a))
console.log([...new Set(a)])
// --------------
const aa = parseInt(2.33333)
console.log(aa)
console.log(~~aa)
// --------------

function formatNumber(str) {
    return str.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}
console.log(formatNumber("123456789")) // 1,234,567,890
console.log((123456789).toLocaleString('en-US'))  // 1,234,567,890
// --------------

let c = 3, b = 4
[b, c] = [c, b]
console.log(c, b)
// --------------            
let arr = [1, 2, 3, 4, 5]
function sum(arr) {
    return arr.reduce((a, b) => a + b)
}
sum(arr) //15
let arr = [1, 2, 3, 4, 5]
function sum(arr) {
    return eval(arr.join("+"))
}
sum(arr) //15