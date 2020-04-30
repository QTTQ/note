func main(){
    //测试test_func的执行时间
    start := time.Now().Unix()
    test_func()
    end := time.Now().Unix()
    fmt.Printf("执行消耗的时间为:%v秒", end - start)
}