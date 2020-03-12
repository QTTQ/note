




// http.Get
func httpGet(url string) []byte {
	resp, err := http.Get(url)
	if err != nil {
		fmt.Println(err)
		return nil
	}
	defer resp.Body.Close()
	body, err := ioutil.ReadAll(resp.Body)
	return body
}

func httpPost(myurl string, data map[string]string) []byte {
	// resp, err := http.Post(myurl,
	// 	"application/x-www-form-urlencode",
	// 	strings.NewReader("name=abc")) // Content-Type post请求必须设置
	// if err != nil {
	// 	return nil
	// }
	// defer resp.Body.Close()
	// body, err := ioutil.ReadAll(resp.Body)
	// fmt.Println(string(body))
	// post_arg := url.Values{"username": {"2300"}, "password": {"2300"}}
	// fmt.Println(post_arg.Encode())
	// req, err := http.NewRequest("POST", myurl, strings.NewReader(post_arg.Encode()))
	/////////////////////////////
	str := ""
	for k, v := range data {
		str += k + "=" + url.QueryEscape(v) + "&"
	}
	// payload := strings.NewReader("j_mode=static&j_from=oa&j_locale=zh_CN&j_username=%E6%AD%A6%E6%B0%B8%E8%83%9C&j_password=c3lzdGVtT0EsMDAw")
	payload := strings.NewReader(str)
	req, err := http.NewRequest("POST", myurl, payload)
	//设置header
	req.Header.Add("Content-Type", "application/x-www-form-urlencoded")
	req.Header.Add("Cache-Control", "no-cache")
	if err != nil {
		panic(err)
	}
	resp, err := (&http.Client{}).Do(req)
	if err != nil {
		panic(err)
	}
	defer resp.Body.Close()
	respByte, _ := ioutil.ReadAll(resp.Body)
	return respByte
	///////////////////////////////////////////

	// jsonValue, _ := json.Marshal(data)
	// fmt.Println(bytes.NewBuffer(jsonValue), ":--------------requestDataStr")
	// resp, err := http.Post(myurl, "application/x-www-form-urlencoded", bytes.NewBuffer(jsonValue))
	// if err != nil {
	// 	panic(err)
	// }
	// defer resp.Body.Close()
	// respByte, _ := ioutil.ReadAll(resp.Body)
	// return respByte
	// //////////////////////////////////////
	// 	strBt, _ := json.Marshal(data)
	// 	aaa := bytes.NewBuffer(strBt)
	// 	bbbb := strings.NewReader(string(strBt))
	// 	fmt.Println(data, "000000000000000000000000077777777777777", bbbb)
	// 	req, err := http.NewRequest("POST", myurl, aaa)
	// 	//header
	// 	req.Header.Set("X-Custom-Header", "myvalue")
	// 	req.Header.Set("Content-Type", "application/json")
	// 	// req.Header.Add("Content-Type", "application/json")
	// 	// req.Header.Add("User-Agent", "Content-Type:application/json")
	// 	// req.Header.Add("Host", "open.1771.com")
	// 	// req.Header.Add("Accept-Encoding", "gzip")
	// 	// req.Header.Add("User-Agent", "Android-Up366-Moblie 4.3.0")
	// 	// req.Header.Add("Connection", "Keep-Alive")

	// 	if err != nil {
	// 		panic(err)
	// 	}

	// 	resp, err := (&http.Client{}).Do(req)
	// 	if err != nil {
	// 		panic(err)
	// 	}
	// 	defer resp.Body.Close()
	// 	respByte, _ := ioutil.ReadAll(resp.Body)
	// 	return respByte
}
