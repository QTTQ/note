- src              源码文件夹：包含项目源码，我们基本都在这个文件夹下做开发
    - containers   容器文件夹：存放容器组件，比如 “苹果篮子”
    - components   组件文件夹：存放普通显示组件，比如 “苹果”
    - actions      actions文件夹：存放可以发出的action 
    - reducers     reducers文件夹：存放action的处理器reducers
    - services     服务文件夹：存放经过封装的服务，如 ajax服务, 模拟数据服务
    - styles       样式文件夹：存放应用的样式，如css, scss
    - images       图片文件夹：存放图片资源




├─ build/            # Webpack 配置目录
├─ dist/             # build 生成的生产环境下的项目
├─ src/              # 源码目录（开发都在这里进行）
│   ├─ assets/         # 放置需要经由 Webpack 处理的静态文件
│   ├─ components/     # 组件（COMPONENT）
│   ├─ redux/          # Redux 一箩筐
│   │   ├─ actions/      # （ACTION）
│   │   ├─ reducers/     # （REDUCER）
│   │   ├─ store/        # （STORE）
│   ├── routes/        # 路由（ROUTE）
│   ├── services/      # 服务（SERVICE，用于统一管理 XHR 请求，这是从 Vue Demo 中直接复制过来的）
│   ├── utils/         # 工具库（UTIL）
│   │   ├─ HoC/          # 高阶组件（HOC，全称 Higher Order Component）
│   │   ├─ mixins/       # 混合（MIXIN）
│   ├── views/         # 路由视图基页（VIEW）
│   │   ├─ layout/       # 全局布局
│   ├── app.js         # 启动文件
│   ├── index.html     # 静态基页
├── static/          # 放置无需经由 Webpack 处理的静态文件
├── .babelrc         # Babel 转码配置
├── .eslintignore    # （配置）ESLint 检查中需忽略的文件（夹）
├── .eslintrc        # ESLint 配置
├── .gitignore       # （配置）需被 Git 忽略的文件（夹）
├── package.json     # （这个就不用多解释了吧）

在这里您可能会问：怎么没有 containers/ 目录？
在本项目中，木偶组件与智能组件最大的差别在于：
前者的状态是通过父组件传入获得，而后者是直接连接到 state 获得
亦即：若一个木偶组件直接连接到 state，那么它就是一个所谓的智能组件
（详见 src/utils/createContainer.js 中对 react-redux 的 connect 函数的封装）
本示例项目唯一在组件的定义中自行使用 connect 函数的是 Navbar 组件（且用到了 ES7 的装饰器）

有关木偶组件与智能组件更为精确的论述，推荐 Redux 作者 Dan 的这篇文章，避免教条主义