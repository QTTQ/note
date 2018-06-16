package main

import (
	"fmt"
	"math"
)


var PI=3.14
var name = "gopher"

type newType int

type gopher struct{}

type golang interface{}

type byte int8
type rune int32

func main(){
	var a[1]bool
	var b 文本
	b="哈哈哈哈"
	var c int =1
	d:=false
	var x,y,z=1,2,3
	xx,_,zz:=3,2,1
	var aa float32=100.1
	bb:=int(aa)
	fmt.Println(bb)
	fmt.Println("Hello Go!")
	fmt.Println(a)
	fmt.Println(math.MinInt8)
	fmt.Println(math.MaxInt8)
	fmt.Println(b)
	fmt.Println(c)
	fmt.Println(d)
	fmt.Println(x)
	fmt.Println(y)
	fmt.Println(z)
	fmt.Println(xx)
	fmt.Println(zz)
}