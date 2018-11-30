// *和&的区别 :
// & 是取地址符号 , 即取得某个变量的地址 , 如 ; &a
// *是指针运算符 , 可以表示一个变量是指针类型 , 也
// 可以表示一个指针变量所指向的存储单元 , 也就是这个地址所存储的值 .

package main

import (
	"fmt"
)

var i = 100

func main() {
	aaa(i)
	fmt.Println("---用指针----i:", i)
	bbb(&i)
	fmt.Println("---用指针----i:", i)
	// ccc()
}

func aaa(i int) {
	i++
	c := 110
	c = c + 1
	fmt.Println("---c:", c, "---i:", i)
}
func bbb(i *int) {
	//*是指针运算符 , 可以表示一个变量是指针类型 , 也
	//可以表示一个指针变量所指向的存储单元 , 也就是这个地址所存储的值
	// *i=*i+100
	c := 110
	c = c + 1
	*i++
	fmt.Println("---c:", c, "---i:", i)
}

//指针地址不能运算
// func ccc() {
// 	b := 100
// 	p := &b //&b  其实是个地址 而不是个值 所以不能运算
// 	p++
// 	fmt.Println(p) //会报错
// }

// 所以   *i 表示的是一个值  但这个值的身份是指针类型
// 		&b 表的的不是一个值 而是一串内存地址