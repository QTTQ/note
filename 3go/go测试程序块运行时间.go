package main

import (
	"fmt"
	"time"
)

func main() {
	t1 := time.Now()
	c := make(chan bool)
	go run(c)
	<-c
	fmt.Println(time.Since(t1))
}

func run(c chan bool) {
	sum := 0
	for i := 0; i < 100000000; i++ {
		sum += i
	}
	c <- true
}
