golang调用javascript文件里的函数
2016年12月13日 22:19:34 玄岳 阅读数：4285
版权声明：本文为博主原创文章，未经博主允许不得转载。	https://blog.csdn.net/zyx4843/article/details/53614934
这里要用到otto---Go语言实现的JavaScript 解释器(github.com/robertkrimen/otto)

假设plugins.js里的内容有：


function addnum(a, b) {
    
    return a + add5(b)
}
 
function add5(a) {
  return a + 5
}
要调用addnum函数，golang内容为:

	f, err := os.Open("plugins.js")
	if err != nil {
		panic(err)
	}

	defer f.Close()

	buff := bytes.NewBuffer(nil)

	if _, err := buff.ReadFrom(f); err != nil {
		panic(err)
 	}
	runtime := otto.New()
	if _, err := runtime.Run(buff.String()); err != nil {
		panic(err)
	}

	a:= 1 
	b:= 2
	jsa, err := runtime.ToValue(a)
	if err != nil {
		panic(err)
	}
	jsb, err := runtime.ToValue(userid)
	if err != nil {
		panic(err)
	}
	result, err := runtime.Call("addnum", nil, jsa, jsb)
	if err != nil {
		panic(err)
	}
	out, err := result.ToInterger()
	if err != nil {
		panic(err)
	}
得到的结果out会是8