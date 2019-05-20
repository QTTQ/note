package main

import (
	"../utils"
	"errors"
	"fmt"
)

type Queue struct {
	in  utils.Stack
	out utils.Stack
}

func (this *Queue) IsEmpty() bool {
	return this.in.IsEmpty() && this.out.IsEmpty()
}

func (this *Queue) Push(value interface{}) {
	this.in.Push(value)
}

func (this *Queue) Pop() (interface{}, error) {
	if this.IsEmpty() {
		return nil, errors.New("Queue is empty")
	}
	var value interface{}
	if !this.out.IsEmpty() {
		value, _ = this.out.Pop()
		return value, nil
	}
	for !this.in.IsEmpty() {
		value, _ = this.in.Pop()
		this.out.Push(value)

	}
	value, _ = this.out.Pop()
	return value, nil
}
func main() {
	var myQueue Queue
	myQueue.Push(1)
	myQueue.Push(2)
	fmt.Println(myQueue.Pop())
	fmt.Println(myQueue.Pop())
	myQueue.Push(3)
	myQueue.Push(4)
	fmt.Println(myQueue.Pop())
	fmt.Println(myQueue.Pop())
	fmt.Println(myQueue.Pop())
	fmt.Println(myQueue.Pop())
}

