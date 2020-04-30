jinzhu/gorm 不常用细节之 INNER JOIN SUM MAX
一些常用的使用都说的很清楚了,中文文档网上也有大家可以去看.
下面只说一下我遇到的没在文档中或者github Issues里面很多人也提问过的,一些不常用细节
后续如果再遇到一些新的使用细节会持续更新

JOIN 或 INNER JOIN
两个表之间

    var count int = 0
    
    if err := db.Table("ats").Joins(" INNER JOIN  read_states ON ats.id = read_states.target_id ").Where("ats.tenant_id = ? and ats.object_id = ? and ats.object_type = ? AND read_states.status = 'unread'", tenantId, uid, common.EMPLOYEE).Count(&count).Error; err != nil {
        common.Log.Error("查询出错 %v", err)
        return 0, err
    }
    
    return count, nil
sum
对某列的值求和
    rows, err := db.Table("service_goods_orders").Select("name ,goods_id , sum(buy_number) AS total").Group("goods_id").Having("goods_id = ? ", goodsId).Where("deleted_at IS NULL OR deleted_at <= '0001-01-02' ").Rows()
    if err != nil {
        common.Log.Error("报错1 %v", err)
        //return 0, err
    }
    defer rows.Close()

    if rows.Next() {
        name := ""
        total := 0
        goodsId := ""
        err := rows.Scan(&name, &goodsId, &total)
        if err != nil {
            common.Log.Error("报错2 %v", err)
            //return 0, err
        }
        common.Log.Debug("查询结果 = %v ----- %v", name, total)
        //return total, nil
    }
    //return 0, nil
查询某列中的最大值
方式一
    max := 0
    type MaxStruct struct {
        Max int `json:"max"`
    }
    var result MaxStruct
    err := db.Raw("SELECT MAX( functions.order ) AS max FROM functions WHERE app_id = ?", appID).Scan(&result).Error
    if err != nil {
        common.Log.Error("出错 %v", err)
    }
    max = result.Max
    
方式二
    max := 0
    rows, err := db.Table("functions").Select(" MAX(functions.order) AS max ").Where(" app_id = ? ", appID).Rows()
    if err != nil {
        common.Log.Error("查询最大值报错 %v", err)
    }
    if rows.Next() {
        err := rows.Scan(&max)
        if err != nil {
            common.Log.Error("报错 %v", err)
        }
    }
