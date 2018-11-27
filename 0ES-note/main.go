
package main

import (
    "fmt"
    // "time"
)

func main() {
    ch := make(chan string, 32)

    go func() {
        ch <- "searchByBing"
    }()
    go func() {
        ch <- "searchByGoogle"
    }()
    go func() {
        ch <- "searchByBaidu"
    }()

    fmt.Println(<-ch)
}