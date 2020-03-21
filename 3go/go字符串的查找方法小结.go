golang中字符串的查找方法小结
1）func Contains(s, substr string) bool这个函数是查找某个字符是否在这个字符串中存在，存在返回true

示例如下：

import (
 "fmt"
 "strings"
)
func main() {
 fmt.Println(strings.Contains("widuu", "wi")) //true
 fmt.Println(strings.Contains("wi", "widuu")) //false
}
2）func ContainsAny(s, chars string) bool这个是查询字符串中是否包含多个字符

示例如下：

import (
   "fmt"
   "strings"
)

func main() {
  fmt.Println(strings.ContainsAny("widuu", "w&d")) //true
}

3）func ContainsRune(s string, r rune) bool,这里边当然是字符串中是否包含rune类型，其中rune类型是utf8.RUneCountString可以完整表示全部Unicode字符的类型

示例如下：


import (
 "fmt"
 "strings"
)
func main() {
 fmt.Println(strings.ContainsRune("widuu", rune('w'))) //true
 fmt.Println(strings.ContainsRune("widuu", 20))        //fasle
}

4）func Count(s, sep string) int这个的作用就是输出，在一段字符串中有多少匹配到的字符

示例如下：


import (
 "fmt"
 "strings"
)
func main() {
 fmt.Println(strings.Count("widuu", "uu")) //1
 fmt.Println(strings.Count("widuu", "u"))  //2
}

5）func Index(s, sep string) int 这个函数是查找字符串，然后返回当前的位置，输入的都是string类型，然后int的位置信息

示例如下：


import (
 "fmt"
 "strings"
)
func main() {
 fmt.Println(strings.Index("widuu", "i")) //1
 fmt.Println(strings.Index("widuu", "u")) //3
}

6）func IndexAny(s, chars string) int 这个函数是一样的查找，字符串第一次出现的位置，如果不存在就返回-1

示例如下：


import (
 "fmt"
 "strings"
)
func main() {
 fmt.Println(strings.IndexAny("widuu", "u")) //3
}

 7）func IndexByte(s string, c byte) int,这个函数功能还是查找第一次粗线的位置，只不过这次C是byte类型的，查找到返回位置，找不到返回-1

示例如下：


import (
 "fmt"
 "strings"
)
func main() {
 fmt.Println(strings.IndexByte("hello xiaowei", 'x')) //6
}

8）func IndexRune(s string, r rune) int，还是查找位置，只不过这次是rune类型的

示例如下：


import (
 "fmt"
 "strings"
)
func main() {
 fmt.Println(strings.IndexRune("widuu", rune('w'))) //0
}

9）func IndexFunc(s string, f func(rune) bool) int这个函数大家一看就知道了，是通过类型的转换来用函数查找位置

示例如下：


import (
 "fmt"
 "strings"
)
func main() {
 fmt.Println(strings.IndexFunc("nihaoma", split)) //3
}
func split(r rune) bool {
 if r == 'a' {
  return true
 }
 return false
}

10）func LastIndex(s, sep string) int 看到这个大家可能也明白了查找的是最后出现的位置，正好跟index相反

示例如下：


import (
 "fmt"
 "strings"
)
func main() {
 fmt.Println(strings.LastIndex("widuu", "u")) // 4
}

11）func LastIndexAny(s, chars string) int这个跟indexAny正好相反，也是查找最后一个

示例如下：


import (
 "fmt"
 "strings"
)
func main() {
 fmt.Println(strings.LastIndexAny("widuu", "u")) // 4
}

 