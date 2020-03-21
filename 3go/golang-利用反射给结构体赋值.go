golang-利用反射给结构体赋值
fwdqxl · 2017-11-06 01:00:01 · 2403 次点击 · 预计阅读时间 1 分钟 · 不到1分钟之前 开始浏览    
这是一个创建于 2017-11-06 01:00:01 的文章，其中的信息可能已经有所发展或是发生改变。
由于想给一个结构体的部分成员赋值，但是有不知道具体名字，故将tag的json名字作为索引，按照json名字来一一赋值

//将结构体里的成员按照json名字来赋值
func SetStructFieldByJsonName(ptr interface{}, fields map[string]interface{}) {
    logger.Debug("fields:", fields)

    v := reflect.ValueOf(ptr).Elem() // the struct variable

    for i := 0; i < v.NumField(); i++ {

        fieldInfo := v.Type().Field(i) // a reflect.StructField
        tag := fieldInfo.Tag           // a reflect.StructTag
        name := tag.Get("json")

        if name == "" {
            name = strings.ToLower(fieldInfo.Name)
        }
        //去掉逗号后面内容 如 `json:"voucher_usage,omitempty"`
        name = strings.Split(name, ",")[0]
        logger.Debug("JSONnAME:", name)

        if value, ok := fields[name]; ok {

            logger.Debug("fieldInfo.Name:", fieldInfo.Name)
            //给结构体赋值
            //保证赋值时数据类型一致
            logger.Debug("类型1：", reflect.ValueOf(value).Type(), "类型2：", v.FieldByName(fieldInfo.Name).Type())
            if reflect.ValueOf(value).Type() == v.FieldByName(fieldInfo.Name).Type() {
                v.FieldByName(fieldInfo.Name).Set(reflect.ValueOf(value))
            }

        }
    }

    return
}