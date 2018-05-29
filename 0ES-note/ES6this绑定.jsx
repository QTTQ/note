
// 第一种写法:
_handleClick(e) {
    console.log(this);
}
render() {
    return (

// 第二种写法：
constructor(props) {
    super(props);
    this._handleClick = this._handleClick.bind(this)
}
_handleClick(e) {
    console.log(this);
}
render() {
    return (

// 第三种写法：
_handleClick = (e) => {
    // 使用箭头函数(arrow function)
    console.log(this);
}
render() {
    return (




















        概述
        ES6提供了类，给模块化带来了很大的帮助。在类里面绑定事件，一来是为了使得代码结构清晰，二来是为了可以使用类的变量和方法。但是，由于事件的回调函数并不是由类的实例对象触发，所以，事件回调函数里面并不能访问类的this变量。另外，我们也不希望事件回调函数对外暴露，免得调用者直接调用。
        
        简单来说，我们就希望： 
        1. 事件回调函数要能访问类的this变量 
        2. 事件回调函数不能直接调用
        
        如何访问类的this
        方案一：将类的this保存成一个局部变量
        this的指代是动态改变的，但是局部变量的指代却是明确的，并且，函数定义的局部变量在整个函数里面都可以用。所以，我们可以使用let that = this保存类的this变量。
        
        
        class A{
        
            //绑定事件的方法
            bindEvent(){
              let that = this;
              this.button1.on('click',function(e){
                   this.addClass('on'); //this指代所点的元素
                   that.doSomething();  //that指向类的this
              })
            }
        
           doSomething(){
             //事件处理函数
           }
        
           //解绑事件
           unBindEvent(){
              this.button1.off();
            }
        
        }
        这种方法只在使用jquery时有用，因为jquery解绑事件不需要提供回调函数，直接off就可以了。但是原生js需要提供回调函数也有它的道理，因为同一个元素的同一种事件可以绑定多个回调函数，所以你需要指出释放哪一个。
        
        方案二：使用bind()改变this的指向
        有类A,在A中要添加mousemove事件，根据需求写出下面代码:
        
        class A{
        
            //添加事件
            addEvent(){
               document.addEventListener( 'mousemove', onMouseMove, false );
            }
        
        
            //添加事件
            removeEvent(){
               document.removeEventListener( 'mousemove', onMouseMove , false );
            }
        }
        
        //事件回调函数中
        function onMouseMove(event){
            console.log(this);    //#document
        }

        但是，这样获取不到类的this。onMouseMove的this将会指向document。因为事件是添加到document上的，所以自然是由document触发事件并调用onMouseMove进行处理，所以onMouseMove中的this指向document。
        
        比较正确的做法是：使用bind()函数改变onMouseMove中this的指向，同时将事件回调函数移到类外面：
        
        class A{
        
            //添加事件
            addEvent(){
               document.addEventListener( 'mousemove', onMouseMove.bind(this), false );
            }
        
        
        
            //添加事件
            removeEvent(){
               document.removeEventListener( 'mousemove', onMouseMove.bind(this) , false );
            }
        
        
        
        }
        
        //事件回调函数中
        function onMouseMove(event){
            console.log(this); 
        }

        但是这样仍然存在问题，事件移除不掉了！因为this.bind()每次调用都会返回一个新的函数，所以：
        
        document.addEventListener( 'mousemove', onMouseMove.bind(this), false );
        1
        和
        
        document.removeEventListener( 'mousemove', onMouseMove.bind(this), false );
        1
        两者的第二个参数并不相同。
        
        正确的做法是： 将bind()的结果保存到一个变量中：
        
        class A{
        
            constructor(){
               this._onMouseMove = onMouseMove.bind(this);    //看这里
        
            }
        
            //添加事件
            addEvent(){
               document.addEventListener( 'mousemove', this._onMouseMove , false );
            }
        
            //添加事件
            removeEvent(){
               document.removeEventListener( 'mousemove', this._onMouseMove , false );
            }
        
        }
        
        //事件回调函数中
        function onMouseMove(event){
            console.log(this); 
        }

        如何定义私有的事件回调函数
        在Java中，不想对外暴露的方法可以定义为私有方法，但是ES6并没有提供私有方法，只能通过一些办法模拟。但是，事件回调函数比较特别，因为事件除了定义，还要移除，这会带来额外的麻烦。但还是有办法的：
        
        使用Symbol变量来定义
        const _onMouseMove = Symbol("_onMouseMove");
        class A{
        
            constructor(){
               this[_onMouseMove] = onMouseMove.bind(this);
        
            }
        
            //添加事件
            addEvent(){
               document.addEventListener( 'mousemove', this[_onMouseMove] , false );
            }
        
            //添加事件
            removeEvent(){
               document.removeEventListener( 'mousemove', this[_onMouseMove] , false );
            }
        
        }
        
        //事件回调函数中
        function onMouseMove(event){
            console.log(this); 
        }
        
        Symbol("_onMouseMove")会产生一个唯一的值，这个值是在对象创建的时候才生成的，所以，调用者没有办法在写代码时知道这个值的，所以，就无法调用使用这个值命名的方法了，这样就定义了一个私有方法。