- 切片、映射和通道，使用make
- 数组、结构体和所有的值类型，使用new 

new 是一个分配内存的内置函数。new的参数是一个类型，new的返回值是一个指针。该指针指向参数的默认零值。

make 也用于内存分配，但是和 new 不同，它只用于 chan / map 和 且切片的内存创建，而且它返回的类型就是这三个类型本身，而不是它们的指针类型。因为chan / map / 切片已经是引用类型了，所以没必要返回他们的指针了。
看一下 make 的文档


简单的说，new只分配内存，make用于slice，map，和channel的初始化。
