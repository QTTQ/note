// 用接口表示数组
// 接口也可以用来描述数组：

interface NumberArray {
    [index: number]: number;
}
let fibonacci: NumberArray = [1, 1, 2, 3, 5];
// NumberArray 表示：只要 index 的类型是 number，那么值的类型必须是 number。

interface NumberArray1{
    [index:number]:number;
}


// 类数组
// 类数组（Array-like Object）不是数组类型，比如 arguments：

function sum() {
    let args: number[] = arguments;
}

index.ts(2,7): error TS2322: Type 'IArguments' is not assignable to type 'number[]'.
  Property 'push' is missing in type 'IArguments'.
// 事实上常见的类数组都有自己的接口定义，如 IArguments, NodeList, HTMLCollection 等：

function sum() {
    let args: IArguments = arguments;
}