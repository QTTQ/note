文件
1.创建文件
os.Create(filename)
2.打开文件
1)只读

os.OpenFile(filename, os.O_RDONLY, os.ModePerm)
2)写入

f, err := os.OpenFile(filename, os.O_WRONLY, os.ModePerm)
3)追加

os.OpenFile(filename, os.O_APPEND|os.O_WRONLY, os.ModeAppend)
3.判断文件是否存在
if _, err := os.Stat(filename); os.IsNotExist(err) {
 f, _ = os.Create(filename)
}
4.写文件
//Write方法写入
f.Write([]byte(content))
//Writestring方法写入
f.WriteString(content)
请求
1.Get请求
resp, err := http.Get(url)
//关闭连接
defer resp.Body.Close()
//读取内容
body, err := ioutil.ReadAll(resp.Body)
2.Post请求
resp, err := http.Post(url,"application/x-www-form-urlencoded",strings.NewReader("name=1&pwd=2")
//关闭连接
defer resp.Body.Close()
//读取内容
body, err := ioutil.ReadAll(resp.Body)
时间
1.时间戳
time.Now().Unix()
2.日期转换
time.Now().Local().Format("2006-01-02 15:04:05.000")
3.定时器
t := time.Tick(1 * time.Second)
go onTime(t)
加密
Md5加密
h := md5.New()
h.Write([]byte(s))
hex.EncodeToString(h.Sum(nil))
JSON
//数据转换为json字符串
json.Marshal(data)
//解析json
data := make(map[string]interface{})
json.Unmarshal([]byte(body), &data)
数据库mysql操作
查询
type User struct{
 Id int
 Name string
}
rows, err := db.Query("SELECT id,name FROM users")
var u User
for rows.Next(){
 rows.Scan(&u.Id, &u.Name)
}
