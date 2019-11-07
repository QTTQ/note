go指针的一个小坑
几乎可以肯定的说，go语言中除了闭包在引用外部变量的时候是传引用的，
其他的时候都是传值的。如果你说形参可以定义为指针。好吧，那么告诉你
这个指针的值其实是按照传值的方式使用的。

下面看个很浅显的例子：

func stillTest(v int) {
    v = v + 100
}
i := 100
fmt.Println("i ", i)
stillTest(i)
fmt.Println("after i ", i)
输出：


传值就是传进去的是个copy副本
你修改副本跟本体当然不一样...
函数里面操作自己的栈内存,跟外面没任何关系





i  100
after i  100
两个值是不会有什么区别的。但是指针就会有什么区别么？

func anotherStillTest(v *int) {
    *v = *v + 100
}
fmt.Println("i ", i)
anotherStillTest(&i)
fmt.Println("after i ", i)
输出：

i  100
after i  200
你看到i的值改了，你大喊这难道不是传的引用吗。man，仔细看看下面的例子。

func addressStillTest(v *int) {
    x := 456
    v = &x
}
x := 1000
fmt.Println("x ", x)
addressStillTest(&x)
fmt.Println("after x ", x)
输出：

x  1000
after x  1000
是的，第一个方法中传了一个地址进去，但是我们明显不是对地址做的任
何修改操作，而是做了一个dereference操作。然后修改了变量的值。而
在上面的这个例子中才是对地址的操作。我们在函数addressStillTest中
试图修改x指向的地址，由于x的地址是传值操作的，也就是拷贝过来的，
所以修改是无效的。最后的输出结果也说明了这一点。

所以在函数操作方面，任何的参数都是按照传值操作的方式执行的。不管
是穿的指针还是一般的一个值都是传值使用的。

下面再看看这个结构体的例子。首先需要有这个：

type Dog struct {
    Name string
    Type string
}
func addressTest(d *Dog) {
    a := &Dog{"another cute dog", "another type"}
    d = a 
}
输出：

Dog  5 6
Another Dog  5 6
对结构体直接做更换地址的操作还是不起作用。再一次表面函数的指针也是传值操作的。

如果要修改一个结构体呢？

func anotherTest(d *Dog) {
    a := &Dog{"another cute dog", "another type"}
    d.Name = a.Name
    d.Type = a.Type
}
输出：

Dog  cute dog ...
Another Dog  another cute dog another type
 

最后说明一个问题。在c，c++里如果从函数内部返回一个局部变量的指针
的话是不对的。但是在Go里是可以的。Go的编译器会检查函数的局部变量
指针是否会作为返回值给外部使用，如果是的话则将这个变量放在heap
上延长其生命周期。

func test() *Dog {
    return &Dog{"cute dog", "..."}
}
d := test()
fmt.Println("Dog ", d.Name, d.Type)
输出：

Dog  cute dog ...
 

坑已填平！

 

补充

坑其实只是勉强的算是填平了。比如，我现在需要在一个方法中修改一
个结构体实例的值。

复制代码
type Person struct {
        Name string
        Phone string
}

func main() {
        session, err := mgo.Dial("server1.example.com,server2.example.com")
        if err != nil {
                panic(err)
        }
        defer session.Close()

        // Optional. Switch the session to a monotonic behavior.
        session.SetMode(mgo.Monotonic, true)

        c := session.DB("test").C("people")
        err = c.Insert(&Person{"Ale", "+55 53 8116 9639"},
                   &Person{"Cla", "+55 53 8402 8510"})
        if err != nil {
                log.Fatal(err)
        }

        result := Person{}
        err = c.Find(bson.M{"name": "Ale"}).One(&result)
        if err != nil {
                log.Fatal(err)
        }

        fmt.Println("Phone:", result.Phone)
}
复制代码
比如上例中，我需要从mongodb中取出结构体实例result的具体值，把一个
指针传进，然后用给这个实例的每个成员分别赋值的方式可以得到数据库



还是沿用最开始的例子里的type Dog struct结构体来定义测试方法：

func anotherAddressTest(d **Dog) {
    a := &Dog{"address dog", "address dog type"}
    *d = a 
}
    // get address out of a func
    var aad = &Dog{"8", "9"}
    fmt.Println("Dog ", aad.Name, aad.Type)
    anotherAddressTest(&aad)
    fmt.Println("Address Dog ", aad.Name, aad.Type)
输出：

Dog  8 9
Address Dog  address dog address dog type
可以看到，值被修改了。整个的东西其实在原理上来说都是一样的，作为函数
的参数直接拷贝过来的指针如果被修改了是不会传回去任何的东西的。但是
，如果指针所指向的内容被修改了，可以带到函数的外部。所以，这里使
用了指向指针的指针，也就是二级指针。根据上面得出的院里二级指针作
为参数如果被修改了不会带出道函数的外部，但是整个二级指针指向的内
容如果修改了却可以带导函数的外部。





如果对指针类型进行反射操作的话,

就必需, 先调用Elem()方法.

Sample :
        
        kind := reflect.TypeOf(s).Kind()

        // 参数为指针时: kind == reflect.Ptr 为指针类型
        if kind == reflect.Ptr {
            v := reflect.ValueOf(s)
            for i := 0; i < v.Elem().Type().NumField(); i++ {
                tag := v.Elem().Type().Field(i).Tag.Get(tagName)
                if tag == "" || tag == "-" {
                    continue
                }
                validator := parseValidatorFromTag(tag)
                valid, err := validator.Validate(v.Elem().Field(i).Interface())
                if !valid && err != nil {
                    errs = append(errs, fmt.Errorf("%s%s", v.Elem().Type().Field(i).Name, err.Error()))
                }
            }
        }


链接：https://www.jianshu.com/p/ae08f75b8f64
来源：简书