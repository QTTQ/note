  data() {
        return {
            goodsList: [],
            tabList: [],
            liActive: 1,
            mapList: {},
            footerMore: true,
            indexNavFixed: false,
        }
    },

     kingSendRequest(id) {
            let self = this;
            self.mapList[self.liActive] = {}
            self.mapList[self.liActive].list = self.goodsList
            self.mapList[self.liActive].footerMore = self.footerMore
            //判断点击的是第几个  把对应索引的数据再赋值回去
            if (self.mapList[id]) {
                self.goodsList = self.mapList[id].list;
                self.footerMore = self.mapList[id].footerMore;
            } else {
                self.footerMore = true
                self.goodsList = [];
                self.getList(id, 1);//初始页面调用ajax
            }
            self.liActive = id
        },

          kingSendRequest(id) {
            let self = this;
            self.mapList[self.liActive] = {}
            self.mapList[self.liActive].list = self.goodsList
            //判断点击的是第几个  把对应索引的数据再赋值回去
            if (self.mapList[id]) {
                self.goodsList = self.mapList[id].list;
            } else {
                self.footerMore = true
                self.goodsList = [];
                self.getList(id, 1);//初始页面调用ajax
            }
            self.liActive = id
        },
