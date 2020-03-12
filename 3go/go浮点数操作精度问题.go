package main

import (
	"fmt"
)

func main() {
	m1 := 8.2000
	m2 := 10.8
	fmt.Println(fmt.Sprintf("%.1f", m1-m2), fmt.Sprintf("%.4f", m1*m2))
}
