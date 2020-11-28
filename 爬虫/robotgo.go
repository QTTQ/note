http://www.dagoogle.cn/n/151.html


ＧＯ语言Robotgo学习-窗口操作（7）
来源:简书 分类: 文章浏览史 发布时间:2020-04-12 15:03:08 最后更新:2020-04-12 浏览:96
转载声明：
本文为摘录自“简书”，版权归原作者所有。
原文链接:
https://www.jianshu.com/p/002224096f16
温馨提示：
为了更好的体验，请点击原文链接进行浏览
摘录时间：
2020-04-12 15:03:08
概览
ShowAlert，消息提示框
GetActive，SetActive获取当前窗口和跳转到某窗口
GetTitle，获取窗口标题
GetHandle，SetHandle，获取窗口句柄和设置句柄
Pids，获取进程PID
PidExists，判断进程是否存在
Process，获取进程信息
FindName，根据PID查询进程名
FindNames，查询所有进程名
FindIds，根据进程名找PID
ActivePID，根据PID激活窗口
几个文档中的函数测试中无法有效使用（可能是我win10系统），或者没找到合适用法的，没有写入下方文档
ShowAlert，消息提示框
ShowAlert("标题", "消息", "Success","Close")，后面两个参数无效，可省略，中文存在乱码问题

btMsg:=robotgo.ShowAlert("Title", "This Message!", "Success","Close")
fmt.Println(btMsg)//确定0，取消1
GetActive，SetActive获取当前窗口和跳转到某窗口
下面代码测试流程：程序正式执行后，5S类切换到另外一个窗口，过会又会跳到开始的窗口

cw:=robotgo.GetActive()//获取当前选择的窗口
time.Sleep(5*time.Second)
robotgo.SetActive(cw)//跳转到目标窗口
GetTitle，获取窗口标题
fmt.Println(robotgo.GetTitle())
GetHandle，SetHandle，获取窗口句柄和设置句柄
获取没问题，但设置发现无效

fmt.Println(robotgo.GetHandle())
robotgo.SetHandle(3272727)
Pids，获取进程PID
返回两个参数，第一个是pid的数组，第二个是错误信息

fmt.Println(robotgo.Pids())
PidExists，判断进程是否存在
根据PID判断，返回两个参数，第一个bool值存在true，第二个是错误信息

fmt.Println(robotgo.PidExists(928))
Process，获取进程信息
返回两个参数：进程信息的数组，错误信息

fmt.Println(robotgo.Process())
FindName，根据PID查询进程名
返回参数：进程名，错误信息

fmt.Println(robotgo.FindName(928))
FindNames，查询所有进程名
不知道是不是系统原因，无效
返回参数：进程名数组，错误信息

fmt.Println(robotgo.FindNames())
FindIds，根据进程名找PID
返回参数：进程PID，错误信息

fmt.Println(robotgo.FindIds("lsass.exe"))
ActivePID，根据PID激活窗口
不知道是不是系统原因，无效
返回参数：错误信息

fmt.Println(robotgo.ActivePID(9792))