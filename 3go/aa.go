pakae main

func main() {
    lookup := make(map[string]int)
    lookup["goku"] = 9001
    power, exists := lookup["vegeta"]
    // 打印：0和false
    // 0代表一个整数型的默认值
    fmt.Println(power, exists)
}
func main(){
	lookup:=make(map[string]int)
	lookup["goku"]=9001
	power,exists:=lookup["vegeta"]
	fmt.Println(power,exists)
}