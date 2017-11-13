好了，仅仅依靠一些简单的修饰器，我们就让 react 程序如此生动有趣。最后总结一些：

@observale 修饰器或者 observable 函数让对象可以被追踪；
@computed 修饰器创造了自动运算的表达式；
autorun 函数让依靠 observable 的函数自动执行，这个用来写 log，发请求很不错；
@observer 修饰器让 React 组建自动起来，它会自动更新，即便是在一个很大的程序里也会工作的很好；

最后，MobX 不是一个状态容器