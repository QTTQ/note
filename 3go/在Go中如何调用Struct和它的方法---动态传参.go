type YourT1 struct {}
func (y YourT1) MethodBar() {
   //do something
}

type YourT2 struct {}
func (y YourT2) MethodFoo(i int, oo string) {
   //do something
}

func Invoke(any interface{}, name string, args... interface{}) {
	inputs := make([]reflect.Value, len(args))
	for i, _ := range args {
		inputs[i] = reflect.ValueOf(args[i])
	}
	reflect.ValueOf(any).MethodByName(name).Call(inputs)
}

func main() {
	Invoke(YourT2{}, "MethodFoo", 10, "abc")
	Invoke(YourT1{}, "MethodBar")
}





真正的代码需要检查方法的输入号码或方法，它本身是否有效。你可以参考这个http：//gowalker.org/rem#type

选中“any”是一个结构类型。
检查“any”有“name”方法
检查方法“name”输入参数的数量等于args的长度。
实施ret通过reflect.Value.Interface()
小心PTR类型，否则您可以使用SomeInterface{}而不是直接使用interface{}以确保这种“任意”类型，如


https://cloud.tencent.com/developer/ask/42792


动态传参
https://www.jianshu.com/p/d40c007ef804