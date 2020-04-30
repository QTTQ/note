
package main
 
import (
	"fmt"
	"time"
)
获取  格式化：
func main()  {
	fmt.Println(time.Now())
	fmt.Println(time.Now().Local())
	fmt.Println("--------------")
	//////////////////////////////
	currentTime := time.Now().Local()
	newFormat := currentTime.Format("2006-01-02 15:04:05.000")
	fmt.Println(newFormat)
	fmt.Println("--------------")
	myTime := time.Date(2018, time.December, 17, 23, 59, 59, 999, time.UTC)
	myTime1 := time.Date(2018, time.December, 17, 23, 59, 59, 999, time.UTC)
	fmt.Println("MyTime:", myTime.Format("2006-01-02 15:04:05.000"))
	fmt.Println("--------------")
	if myTime==myTime1 {
		fmt.Println("=======")
	}
增加：
import "strings"
 
func main() {
	// Add 时间相加
	now := time.Now()
	// ParseDuration parses a duration string.
	// A duration string is a possibly signed sequence of decimal numbers,
	// each with optional fraction and a unit suffix,
	// such as "300ms", "-1.5h" or "2h45m".
	//  Valid time units are "ns", "us" (or "µs"), "ms", "s", "m", "h".
	// 10分钟前
	m, _ := time.ParseDuration("-1m")
	fmt.Println(m)
	m1 := now.Add(m)
	fmt.Println(m1)
	fmt.Println("----------------------------")
	// 8个小时前
	h, _ := time.ParseDuration("-1h")
	h1 := now.Add(8 * h)
	fmt.Println(h1)
	fmt.Println("----------------------------")
	// 一天前
	d, _ := time.ParseDuration("-24h")
	d1 := now.Add(d)
	fmt.Println(d1)
	fmt.Println("----------------------------")
	printSplit(50)
	fmt.Println("----------------------------")
	// 10分钟后
	mm, _ := time.ParseDuration("1m")
	mm1 := now.Add(mm)
	fmt.Println(mm1)
	fmt.Println("----------------------------")
	// 8小时后
	hh, _ := time.ParseDuration("1h")
	hh1 := now.Add(hh)
	fmt.Println(hh1)
	fmt.Println("----------------------------")
	// 一天后
	dd, _ := time.ParseDuration("24h")
	dd1 := now.Add(dd)
	fmt.Println(dd1)
 
	printSplit(50)
	fmt.Println("----------------------------")
	// Sub 计算两个时间差
	subM := now.Sub(m1)
	fmt.Println(subM.Minutes(), "分钟")
	fmt.Println("----------------------------")
	sumH := now.Sub(h1)
	fmt.Println(sumH.Hours(), "小时")
	fmt.Println("----------------------------")
	sumD := now.Sub(d1)
	fmt.Printf("%v 天\n", sumD.Hours()/24)
 
}
 
func printSplit(count int) {
	fmt.Println(strings.Repeat("#", count))
}
 

比较：
 
func main() {
    format := "2006-01-02 15:04:05"
    now := time.Now()
    //now, _ := time.Parse(format, time.Now().Format(format))
    a, _ := time.Parse(format, "2019-03-10 11:00:00")
    b, _ := time.Parse(format, "2015-03-10 16:00:00")
 
	fmt.Println("now:",now.Format(format), "\na:",a.Format(format),"\nb:", b.Format(format))
	fmt.Println("---    a > now  >  b   -----------")
    fmt.Println("now  a   After: ",now.After(a))
    fmt.Println("now  a   Before:",now.Before(a))
    fmt.Println("now  b   After:",now.After(b))
    fmt.Println("now  b   Before:",now.Before(b))
    fmt.Println("a  b   After:",a.After(b))
    fmt.Println("a  b   Before:",a.Before(b))
    fmt.Println(now.Format(format), a.Format(format), b.Format(format))
    fmt.Println(now.Unix(), a.Unix(), b.Unix())
}