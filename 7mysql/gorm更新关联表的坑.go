que = db.DBMater.Model(&goods1).Where("id = ?", goodsIdStr).Updates(goods1)
if que.Error != nil && que.Error != gorm.ErrRecordNotFound {
	return err
}


一定要用Model  不能用 Table  等 要不 无法识别关联表