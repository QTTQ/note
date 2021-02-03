// golang给请求参数追加参数

// 爱了李召君 2019-11-26 10:02:06  786  收藏 1
// 版权
// 在做web服务的时候，偶尔会碰到这种需求，给http请求追加参数，下面是一些关于此类需求的记录。

//         if c.Request.Method == "GET" {
//             var getUrl url.URL
//             getUrl.Path = c.Request.URL.Path
//             query := c.Request.URL.Query()
//             query.Set("login_uid", gdsLoggedUid)
//             c.Request.URL, _ = c.Request.URL.Parse(getUrl.String() + "?" + query.Encode())
//             fmt.Printf("%c[1;43;30m--LOCAL--GET-- %v%c[1;43;30m\n", 0x1B, c.Request.URL, 0x1B)
//         } else if c.Request.Method == "POST" {
//             bodyData, _ := c.GetRawData()
//             data := make(map[string]interface{})
//             json.Unmarshal(bodyData, &data)
//             data["login_uid"], _ = strconv.Atoi(gdsLoggedUid)
//             newData, _ := json.Marshal(data)
//             c.Request.Body = ioutil.NopCloser(bytes.NewBuffer(newData))
//             fmt.Printf("%c[1;43;30m--LOCAL--POST-- %v%c[1;43;30m\n", 0x1B, string(newData), 0x1B)
//         }