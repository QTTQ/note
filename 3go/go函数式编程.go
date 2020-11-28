Golang 函数式编程简述
hedzr Go语言中文网 今天
点击上方蓝色“Go语言中文网”关注，回复「电子书」领全套Go资料
先吐一吐
一般而言，Golang 的 Functional 编程都会呈现出恶形。表面上看，恶形是因为 Golang 缺少一些必要的语法糖；本质上说，恶形源于它没有高级抽象能力，正如泛型的缺失。

恶形
丑在何处？这里有个例子：

func main() {
    var list = []string{"Orange", "Apple", "Banana", "Grape"}
    // we are passing the array and a function as arguments to mapForEach method.
    var out = mapForEach(list, func(it string) int {
        return len(it)
    })
    fmt.Println(out) // [6, 5, 6, 5]
}

// The higher-order-function takes an array and a function as arguments
func mapForEach(arr []string, fn func(it string) int) []int {
    var newArray = []int{}
    for _, it := range arr {
        // We are executing the method passed
        newArray = append(newArray, fn(it))
    }
    return newArray
}
很好，此包装看起来不错，是不是？fp形态看起来看着也比较舒服。我想……嗯，我想包装一下，令其通用化，给别人用。于是就糟了，支持int64需要这样：

func mapInt64ForEach(arr []int64, fn func(it int64) int) []int {
    var newArray = []int{}
    for _, it := range arr {
        // We are executing the method passed
        newArray = append(newArray, fn(it))
    }
    return newArray
}
这才刚刚开始，你开始为 bool，uint64，……写出 n 个版本，记住，函数名也要改。

对照：C++模板实现
所以我会说，golang 的高阶函数，functional，实际上真的会顺理成章地恶形。

天知道，现在我多数情况下都会采用 golang 进行架构设计，然而我心里一直有一种难以言说的失望。如果在 C++11：

class Print {
public:
    void operator()(int elem) const {
        std::cout << elem << " ";
    }
};

func a(){
    std::vector<int> vect;
    for (int i=1; i<10; ++i) {
        vect.push_back(i);
    }

    Print print_it;
    std::for_each (vect.begin(), vect.end(), print_it);
    std::cout << std::endl;
}
为了节约字节，这里借用 stdlib 的 for_each 而不是自行实现一份，但 foreach 的实现其实也真心简单。

重点在于，我现在要操作 string 了，只需要重写一份 Print 就可以了，我并不需要做 n 份 for_each 实现。如果有必要，我可以实现一份泛型的 Print 模板类，于是什么都不必重新实现副本，直接使用就可以了。

收结
还没有开始研究 Golang Functional Programming 的美丽的地方，反而先贬损了一番，真是情非得已啊！

好，现在来讲 functional 的好的用法。

虽然 functional 并不易于泛型复用，但在具体类型，又或者是通过 interface 抽象后的间接泛型模型中，它是改善程序结构、外观、内涵、质量的最佳手段。

所以你会看到，在成熟的类库中，无论是标准库还是第三方库，functional 模式被广泛地采用。

所以，下面会对这些应用作一番归纳和展示，目的在于提供一系列最佳实践的陈列并希望籍此有助于提高你的具体编码能力。

什么是 Functional Programming
首先我们需要研究一下什么是高阶函数编程？所谓的 Functional Programming，一般被译作函数式编程（以 λ演算 为根基）。

函数式编程，是指忽略（通常是不允许）可变数据（以避免它处可改变的数据引发的边际效应），忽略程序执行状态（不允许隐式的、隐藏的、不可见的状态），通过函数作为入参，函数作为返回值的方式进行计算，通过不断的推进（迭代、递归）这种计算，从而从输入得到输出的编程范式。在函数式编程范式中，没有过程式编程所常见的概念：语句，过程控制（条件，循环等等）。此外，在函数式编程范式中，具有引用透明（Referential Transparency）的特性，此概念的含义是函数的运行仅仅和入参有关，入参相同则出参必然总是相同，函数本身（被视作f(x)）所完成的变换是确定的。

顺便一提，柯里化 是函数式编程中相当重要的一个理论和技术。完全抛弃过程式编程的 if、then、while 之类的东西，完全的函数迭代，一般是纯函数式支持者最为喜爱的，而诸如 Start(...).Then(...).Then(...).Else(...).Finally(...).Stop() 这类风格往往会被视为异教徒。

这确实很有意思。原教旨主义（按：非指该术语的宗教性原意，仅用于在此处引申以指代 Pure 党）在任何地方都是确定及存在的。

表征
总结一下，函数式编程具有以下的表征：

No Data mutations 没有数据易变性
No implicit state 没有隐式状态
No side effects 没有边际效应（没有副作用）
Pure functions only 只有纯粹的函数，没有过程控制或者语句
First-class function 头等函数身份
First-class citizen 函数具有一等公民身份
Higher-order functions[1] 高阶函数，可以出现在任何地方
[Closures](https://en.wikipedia.org/wiki/Closure_(computer_programming "Closures")) 闭包 - 具有上级环境捕俘能力的函数实例
Currying[2] 柯里化演算 - 规约多个入参到单个，等等
[Recursion](https://en.wikipedia.org/wiki/Recursion_(computer_science "Recursion")) 递归运算 - 函数嵌套迭代以求值，没有过程控制的概念
Lazy evaluations[3] / Evaluation strategy[4] 惰性求值 - 延迟被捕俘变量的求值到使用时
Referential transparency[5] 引用透明性 - 对于相同的输入，表达式的值必须相同，并且其评估必须没有副作用
由于重心不在高级 FP 编程和相关学习，因此无法深入讨论纯种的 FP 柯里化变换，这是个传统 C 程序员较难转弯的东西。

Golang 中的函数式编程：高阶函数
在 Golang 中，函数式编程这个概念已经被重新包装和阐释过了，诸如一切都是函数，函数是值，等等。所以本文中可能会避免函数式编程的提法，往往会以高阶函数编程的提法代替之。

需要强调的是，函数式编程并非仅仅是高阶函数编程，高阶函数编程也不能包容函数式编程，这是两种不同的概念，只是在表现形式上彼此之间有所交集。而对于 Golang 来说，既没有真正的纯粹的函数式编程，当然其实 Golang 也没有纯粹的面向对象编程，Golang 对这两者都采用不同的、略有极端的手法进行了改头换面、也包含一些与时俱静的先进性理论的融合。当然，在大多数场景上，我们还是认同 Golang 采用自己的哲学支持这样的多范式编程。

在 Golang 中，高阶函数很多时候是为了实现某种算法的关键粘合剂。

例如，

基本的闭包结构
递归
函子/运算子
惰性计算
可变参数：Functional Options
基本的闭包（Closure）结构
在函数、高阶函数身属一阶公民的编程语言中，你当然可以将函数赋值为一个变量、复制给一个成员，作为另一函数的参数（或之一）进行传参，作为另一函数的返回值（或之一）。

Golang 具备上述支持。

然而，Golang 没有匿名函数外扩或缩减的语法糖，实际上，Golang 没有大多数的语法糖，这是它的设计哲学所决定的。所以你必须采用有点冗长的代码书写，而无法让语法显得简洁。在这一点上，C++ 使用 operator() 的方式能够缩写，采用 [] 捕俘语法能够简写闭包函数，Java 8 以后在匿名闭包的简化语法上行进的很厉害，但还比不上 Kotlin，Kotlin 则更进一步允许函数调用的最后一个闭包被外扩到调用语法之后并以语句块的形式而存在：

fun invoker(p1 string, fn fun(it int)) {
  // ...
}

invoker("ok") { /* it int */ ->
  // ...
}
但在 Golang 中，你需要完整地编写高阶函数的原型，哪怕你对其作了 type 定义也没用：

type Handler func (a int)

func xc(pa int, handler Handler) {
  handler(pa)
}

func Test1(){
  xc(1, func(a int){ // <- 老老实实地再写一遍原型吧
    print (a)
  })
}
值得注意的是，一旦 Handler 的原型发生变化，库作者和库使用者都会很痛苦地到处查找和修改。

对的，你将在这里学到一个编程的重要原则，接口设计必须考虑稳固性。只要接口稳固，当然不会有 Handler 的原型需要调整的可能性，对不对？呵呵。

吐糟并不是我的爱好，所以点到为止。

运算子 Functor
算子通常是一个简单函数（但也未必如此），总控部分通过替换不同算子来达到替换业务逻辑的实际实现算法：

func add(a, b int) int { return a+b }
func sub(a, b int) int { return a-b }

var operators map[string]func(a, b int) int

func init(){
  operators = map[string]func(a, b int) int {
    "+": add,
    "-": sub,
  }
}

func calculator(a, b int, op string) int {
  if fn, ok := operators[op]; op && fn!=nil{
    return fn(a, b)
  }
  return 0
}
递归 Recursion
斐波拉契，阶乘，Hanoi 塔，分形等是典型的递归问题。

在支持递归的编程语言中，怎么运用递归往往是一个较难的知识点。个人的经验而言，日思夜想，豁然开朗是完全掌握递归的必然过程。

函数式编程中，递归是个遍地走的概念。这在 Golang 中被具现为高阶函数返回值。

下面这个示例简单地实现了阶乘运算：

package main

import "fmt"

func factorial(num int) int {
    result := 1
    for ; num > 0; num-- {
        result *= num
    }
    return result
}

func main() {
    fmt.Println(factorial(10)) // 3628800
}
但我们应该采用 Functional Programming 的风格重新实现它：

package main

import "fmt"

func factorialTailRecursive(num int) int {
    return factorial(1, num)
}

func factorial(accumulator, val int) int {
    if val == 1 {
        return accumulator
    }
    return factorial(accumulator*val, val-1)
}

func main() {
    fmt.Println(factorialTailRecursive(10)) // 3628800
}
大多数现代编程语言对于尾递归都能够很好地在编译阶段进行隐含性地优化，这是一个编译原理中的重要的优化点：尾递归总是能够退化为无需嵌套函数调用的循环结构。

所以我们在上面进行了一定的改写，从而将阶乘运算实现为了 Functional 的方式，在令其具备良好的可读性的同时，还能令其避开嵌套函数调用时的栈消耗问题。

采用高阶函数的递归
借用 fibonacci 的实现我们简单地示例返回一个函数的方式来实现递归：

package main

import "fmt"

func fibonacci() func() int {
    a, b := 0, 1

    return func() int {
        a, b = b, a+b
        return a
    }
}

func main() {
    f := fibonacci()

    for i := 0; i < 10; i++ {
        fmt.Println(f())
    }
}

// 依次输出：1 1 2 3 5 8 13 21 34 55
延迟计算 Delayed Calculating
使用高阶/匿名函数的一个重要用途是捕俘变量和延迟计算，也即所谓的惰性计算（Lazy evaluations[6]）。

在下面这个例子中，

func doSth(){
  var err error
  defer func(){
    if err != nil {
      println(err.Error())
    }
  }()
  
  // ...
  err = io.EOF
  return
}

doSth() // printed: EOF
在 defer 的高阶函数中，捕俘了外部作用域中的 err 变量，doSth 的整个运行周期中对 err 的设定，最终能够在 defer 函数体中被正确计算得到。如果没有捕俘和延迟计算机制的话，高阶函数体中对 err 的访问就只会得到 nil 值，因为这是捕俘时刻 err 的具体值。请注意为了缩减示例代码规模我们采用了 defer 来演示，实际上使用 go routines 可以得到同样的效果，换句话说，在高阶函数中对外部作用域的访问是动态地延迟地计算的。

例外：循环变量
当然在这里有一个著名的坑：循环变量并不被延迟计算（由于总是会发生循环被优化的动作，因而循环变量在某种角度看是不存在的伪变量）。

func a(){
  for i:=0; i<10; i++ {
    go func(){
      println(i)
    }()
  }
}

func main(){ a() }
// 1. 结果会是 全部的 0
// 2. 在新版本的 Golang 中，将无法通过编译，报错为：
// loop variable i captured by func literal
想要得到符合直觉的结果，你需要传参该循环变量：

func a(){
  for i:=0; i<10; i++ {
    go func(ix int){
      println(ix)
    }(i)
  }
}
我老实交待，这个坑我踩过，单步调试才发现。在一个大型系统中，找到这么一个错误，你会充满疲惫感。而它是表示你的编程水平不行吗？放心，这并不是，我不是因为自己啃过才放低标准的，实在是 Golang 有够恶心的。

Functional Options
作为一个类库作者，迟早会面临到接口变更问题。或者是因为外部环境变化，或者是因为功能升级而扩大了外延，或者是因为需要废弃掉过去的不完善的设计，或者是因为个人水平的提升，无论哪一种理由，你都可能会发现必须要修改掉原有的接口，替换之以一个更完美的新接口。

旧的方式
想象下有一个早期的类库：

package tut

func New(a int) *Holder {
  return &Holder{
    a: a,
  }
}

type Holder struct {
  a int
}
后来，我们发现需要增加一个布尔量 b，于是修改 tut 库为：

package tut

func New(a int, b bool) *Holder {
  return &Holder{
    a: a,
    b: b,
  }
}

type Holder struct {
  a int
  b bool
}
没过几天，现在我们认为有必要增加一个字符串变量，tut 库不得不被修改为：

package tut

func New(a int, b bool, c string) *Holder {
  return &Holder{
    a: a,
    b: b,
    c: c,
  }
}

type Holder struct {
  a int
  b bool
  c string
}
想象一下，tut 库的使用者在面对三次接口 New() 的升级时，会有多少 MMP 要抛出来。

对此我们需要 Functional Options 模式来解救之。

新的方式
假设 tut 的第一版我们是这样实现的：

package tut

type Opt func (holder *Holder)

func New(opts ...Opt) *Holder {
  h := &Holder{ a: -1, }
  for _, opt := range opts {
    opt(h)
  }
  return h
}

func WithA(a int) Opt {
  return func (holder *Holder) {
    holder.a = a
  }
}

type Holder struct {
  a int
}

//...
// You can:
func vv(){
  holder := tut.New(tut.WithA(1))
  // ...
}
同样地需求变更发生后，我们将 b 和 c 增加到现有版本上，那么现在的 tut 看起来是这样的：

package tut

type Opt func (holder *Holder)

func New(opts ...Opt) *Holder {
  h := &Holder{ a: -1, }
  for _, opt := range opts {
    opt(h)
  }
  return h
}

func WithA(a int) Opt {
  return func (holder *Holder) {
    holder.a = a
  }
}

func WithB(b bool) Opt {
  return func (holder *Holder) {
    holder.b = b
  }
}

func WithC(c string) Opt {
  return func (holder *Holder) {
    holder.c = c
  }
}

type Holder struct {
  a int
  b bool
  c string
}

//...
// You can:
func vv(){
  holder := tut.New(tut.WithA(1), tut.WithB(true), tut.WithC("hello"))
  // ...
}
由于代码没有什么复杂度，所以我不必逐行解说实例代码了。你将会得到一个直观的感受是，原有的 tut 的用户端遗留代码（例如 vv() ）实际上可以完全不变，透明地应对 tut 库本身的升级动作。

这里要提到这种编码范式的特点和作用包括：

a. 在实例化 Holder 时，我们现在可以变相地使用不同数据类型的任意多可变参数了。

b. 借助既有的范式模型，我们还可以实现任意的复杂的初始化操作，用以为 Holder 进行不同的构建操作。

c. 既然是范式，那么其可读性、可拓展性需要被研究——很明显，现在的这一范式能得到高分。

d. 在大版本升级时，New(...) 的接口稳固性相当好，无论你如何调整内在算法及其实现，对这样的第三方库的调用者来说，没有什么需要改变的。

小结
本文参考了 dcode 提到的一些知识，此外，7 Easy functional programming techniques in Go[7] 也介绍了很多 FP 知识。

本文没有打算在 FP 方面进行展开，因为在笔者的认识中，Lisp，Haskell 之类的语言环境下讨论 FP 才是有意义的，Golang 当中虽然对 FP 有很多的倾向，但它当然是过程式的 PL ，只是说对 FP 有很强的支持而已。

但这些细致的看法分野，只是学术上的辨析。所以本文只是在具体实作方面归纳一些具有相关性的惯用法。

或许以后就这个方面会再做归纳，也许会有更深入的认识。

本文作者：hedzr 原文链接：https://hedzr.github.io/golang/fp/golang-functional-programming-in-brief/