在一些业务场景下，我们需要进行大量的字符串拼接操作，
如：批量写入数据库时拼接sql语句。此时如果使用 '+' 拼
接效率下降严重，因此我们寻求某种高效的字符串拼接方式。

直接上结论：

1. 少量文本拼接使用 '+' 方便，性能影响不大

2. 大量小文本拼接使用 strings.Join()

3. 大量大文本拼接使用 bytes.Buffer




附：

2. strings.Join 使用示例

var strs = []string{"a","b","c",}
func TestStringsJoin(b *testing.B) {
    for i := 0; i < b.N; i++ {
        strings.Join(strs, "")
    }
}
3. bytes.Buffer 使用示例

var strs = []string{"a","b","c",}
func TestBytesBuffer(b *testing.B) {
    for i := 0; i < b.N; i++ {
        var b bytes.Buffer
        for j := 0; j < len(strs); j++ {
            b.WriteString(strs[j])
        }
    }
}