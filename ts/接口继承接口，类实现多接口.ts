interface InterfaceOne {
    //
    sports():void;
}
interface InterfaceTwo {
    //
    swimming():void
}
// 接口集成接口
interface InterfaceThree extends InterfaceOne,InterfaceTwo {
    //
    coding():void;
}

class ParentCls {
    name:string;
    constructor(name:string){
        this.name = name
    }
    //
    ktv(){
        console.log(this.name + '唱歌');
    }
}
// 继承父类实现多接口
class SubCls extends ParentCls implements InterfaceTwo, InterfaceOne {
    
    // 实现接口
    sports(){
        console.log(this.name + '运动')
    }

    swimming(){
        console.log(this.name + '游泳')
    }
}
let subCls = new SubCls('小明');
subCls.sports()
subCls.swimming();
subCls.ktv()

//
class SubCls2 extends ParentCls implements InterfaceThree {
    //
    coding(){
        console.log(this.name + '写代码');
    }
    sports(){
        console.log(this.name + '运动');
    }
    swimming(){
        console.log(this.name + '游泳')
    }
}
let subCls2 = new SubCls2('小王');
subCls2.coding();
subCls2.sports();
subCls2.ktv();
subCls.swimming();
