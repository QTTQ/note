package simplefactory

import "fmt"

//API API
type API interface {
	Say(name string) string
}

//NewAPI NewAPI
func NewAPI(t int) API {
	if t == 1 {
		return &hiAPI{}
	} else if t == 2 {
		return &helloAPI{}
	}
	return nil
}

type hiAPI struct{}

func (*hiAPI) Say(name string) string {
	return fmt.Sprintf("Hi,%s", name)
}

type helloAPI struct{}

func (*helloAPI) Say(name string) string {
	return fmt.Sprintf("Hello,%s", name)
}

// 什么是工厂模式？

// 我们在创建对象时不会对客户端直接暴露创建逻辑，而是 通过使用一个共同的接口根据不同的条件来指向具体想要创建的对象。

// 为什么要使用工厂模式？

// 比如，我现在想要去英雄商城购买英雄（去商场买衣服、去餐馆吃饭也是同样的道理），首先每个英雄要耗费的金币不一样，姑且我不管这个英雄是怎么设计的，
// 只需交付不同的钱，购买不同的英雄即可。不同的钱，购买不同的英雄在代码层面上理解就是，在不同的条件下创建不同的实例对象。
// （注意：这个不同的条件是外部调用的）那么我现在只要交付具体的钱（也就是区分不同的条件）即可从商城（也就是工厂）获取我想要的英雄。

// 工厂模式的优点？

// A：使用工厂模式的优点在于一个调用者想创建一个对象，只要知道其名称（也就是不同的标签）就可以在工厂获取具体的对象

// B：扩展性强，如果想增加一个产品（也就是具体的对象），只要扩展工厂类就可以（也就是增加不同的标签，增加不同标签所对应的对象）。

// C： 屏蔽产品的具体实现，调用者只关心产品的接口、无需关心内部实现。
