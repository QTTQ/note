defer仅在函数返回时才会执行，在循环的结尾或其他一些有限范围的代码内不会执行。

for _, file := range files {
    if f, err = os.Open(file); err != nil {
        return
    }
    // 对文件进行操作
    f.Process(data)
    // 关闭文件
    f.Close()
 }
 这里用f.Close() 就行