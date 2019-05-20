package main

import (
	"fmt"
)

type NodeList struct {
	Val  int
	Next *NodeList
}
var n=0
func printListFromTailToHead(head *NodeList) {
	if head != nil {
		n++
		printListFromTailToHead(head.Next)
		fmt.Println(n,"-----")
		fmt.Println(head.Val,head,n)
	}
}
func main() {
	n3 := &NodeList{3, nil}
	n2 := &NodeList{2, n3}
	n1 := &NodeList{1, n2}
	// fmt.Println(n1, n2, n3)
	printListFromTailToHead(n1)
}
