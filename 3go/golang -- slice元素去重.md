    合并两个整型切片，返回没有重复元素的切片，有两种去重策略
1. 通过双重循环来过滤重复元素（时间换空间）
// 通过两重循环过滤重复元素
func RemoveRepByLoop(slc []int) []int {
    result := []int{}  // 存放结果
    for i := range slc{
        flag := true
        for j := range result{
            if slc[i] == result[j] {
                flag = false  // 存在重复元素，标识为false
                break
            }
        }
        if flag {  // 标识为false，不添加进结果
            result = append(result, slc[i])
        }
    }
    return result
}
1
2
3
4
5
6
7
8
9
10
11
12
13
14
15
16
17
2. 通过字典来过滤（空间换时间）
因为字典的主键唯一，所以可以用来判断元素是否重复

// 通过map主键唯一的特性过滤重复元素
func RemoveRepByMap(slc []int) []int {
    result := []int{}
    tempMap := map[int]byte{}  // 存放不重复主键
    for _, e := range slc{
        l := len(tempMap)
        tempMap[e] = 0
        if len(tempMap) != l{  // 加入map后，map长度变化，则元素不重复
            result = append(result, e)
        }
    }
    return result
}
1
2
3
4
5
6
7
8
9
10
11
12
13
ps : 这里为了节省内存，使用map[int]byte。 因为map的value并没有用到，所以什么类型都可以。

效率第一，如果节省计算时间，则可以采用如下方式
// 元素去重
func RemoveRep(slc []int) []int{
    if len(slc) < 1024 {
        // 切片长度小于1024的时候，循环来过滤
        return RemoveRepByLoop(slc)
    }else{
        // 大于的时候，通过map来过滤
        return RemoveRepByMap(slc)
    }
}
1
2
3
4
5
6
7
8
9
10
ps: 1024 这个数字不是特别精准，我是使用go test 的基准测试，手工的比较的。大约在这个数量超上，使用map方式的速度要快，小于这个数量级后，loop方式要快，而且省内存。
--------------------- 
作者：风格色 
来源：CSDN 
原文：https://blog.csdn.net/qq_27068845/article/details/77407358 
版权声明：本文为博主原创文章，转载请附上博文链接！