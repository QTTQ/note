< !DOCTYPE html >
    <html lang="en">

        <head>
            <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <meta http-equiv="X-UA-Compatible" content="ie=edge">
                        <title>Document</title>
</head>

                    <body>
                        <script>
                            // 用 Object.create实现类式继承

                            // 下面的例子演示了如何使用Object.create()来实现类式继承。这是一个所有版本JavaScript都支持的单继承。
                            // Shape - superclass
                            function Shape() {
                                this.x = 0;
                            this.y = 0;
        }

        // superclass method
        Shape.prototype.move = function (x, y) {
                                this.x += x;
                            this.y += y;
            console.info('Shape moved.');
        };

        // Rectangle - subclass
        function Rectangle() {
                                Shape.call(this); // call super constructor.
                            }

        // subclass extends superclass
        Rectangle.prototype = Object.create(Shape.prototype);
        Rectangle.prototype.constructor = Rectangle;

        var rect = new Rectangle();

        console.log('Is rect an instance of Rectangle?',
            rect instanceof Rectangle); // true
        console.log('Is rect an instance of Shape?',
            rect instanceof Shape); // true
        rect.move(1, 1); // Outputs, 'Shape moved.



        // 如果你希望能继承到多个对象，则可以使用混入的方式。

        function MyClass() {
                                SuperClass.call(this);
                            OtherSuperClass.call(this);
        }

        // inherit one class
        MyClass.prototype = Object.create(SuperClass.prototype);
        // mixin another
        Object.assign(MyClass.prototype, OtherSuperClass.prototype);
        // re-assign constructor
        MyClass.prototype.constructor = MyClass;

        MyClass.prototype.myMethod = function () {
                                // do a thing
                            };
// Object.assign 会把  OtherSuperClass原型上的函数拷贝到 MyClass原型上，
// 使 MyClass 的所有实例都可用 OtherSuperClass 的方法。Object.assign
// 是在 ES2015 引入的，且可用 polyfilled。要支持旧浏览器的话，
// 可用使用 jQuery.extend() 或者 _.assign()。



// js中有类继承(call())和原型继承;
// 类继承的缺点
// 1、会继承父类的属性
// 2、方法在构造函数内创建，函数的复用就无从谈起了，
// 3、而且还有一个问题，就是在超类原型中定义的方法对子类是不可见的。
    </script>
                    </body>

</html>