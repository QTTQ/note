package main

import (
	"fmt"
)

func Fibonacci(n int) int {
	if n <= 1 {
		return n
	}
	f1, f2 := 0, 1
	for i := 2; i <= n; i++ {
		if i >= 2 {
			f1, f2 = f2, f1+f2
		}
	}
	return f1 + f2
}

func main() {
	fmt.Println(Fibonacci(10))
}
