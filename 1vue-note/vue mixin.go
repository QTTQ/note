Nuxt.js 基础入门教程
ssrvue.jsnuxt.jsjavascript
发布于 2018-02-05
原文链接

Vue 开发一个单页面应用，相信很多前端工程师都已经学会了，但是单页面应用有一个致命的缺点，就是 SEO 极不友好。除非，vue 能在服务端渲染（ssr）并直接返回已经渲染好的页面，而并非只是一个单纯的 <div id="app"></div>。

Nuxt.js 就是一个极简的 vue 版的 ssr 框架。基于它，我们可以快速开发一个基于 vue 的 ssr 单页面应用。

安装
Nuxt.js 官方提供了一个模板，可以使用 vue-cli 直接安装。

$ vue init nuxt-community/starter-template <project-name>
目录结构
.
├── README.md
├── assets
├── components
├── layouts
├── middleware
├── node_modules
├── nuxt.config.js
├── package.json
├── pages
├── plugins
├── static
├── store
└── yarn.lock
其中：

assets: 资源文件。放置需要经过 webpack 打包处理的资源文件，如 scss，图片，字体等。
components: 组件。这里存放在页面中，可以复用的组件。
layouts: 布局。页面都需要有一个布局，默认为 default。它规定了一个页面如何布局页面。所有页面都会加载在布局页面中的 <nuxt /> 标签中。如果需要在普通页面中使用下级路由，则需要在页面中添加 <nuxt-child />。该目录名为Nuxt.js保留的，不可更改。
middleware: 中间件。存放中间件。可以在页面中调用： middleware: 'middlewareName' 。
pages: 页面。一个 vue 文件即为一个页面。index.vue 为根页面。

若需要二级页面，则添加文件夹即可。
如果页面的名称类似于 _id.vue （以 _ 开头），则为动态路由页面，_ 后为匹配的变量（params）。
若变量是必须的，则在文件夹下建立空文件 index.vue。更多的配置请移步至 官网 。
plugin: 插件。用于组织那些需要在 根vue.js应用 实例化之前需要运行的 Javascript 插件。需要注意的是，在任何 Vue 组件的生命周期内， 只有 beforeCreate 和 created 这两个钩子方法会在 客户端和服务端均被调用。其他钩子方法仅在客户端被调用。
static: 静态文件。放置不需要经过 webpack 打包的静态资源。如一些 js, css 库。
store: 状态管理。具体使用请移步至 官网。
nuxt.config.js: nuxt.config.js 文件用于组织Nuxt.js 应用的个性化配置，以便覆盖默认配置。具体配置请移步至 官网。
Nuxt 特有函数
首先，了解一下在 nuxt 的页面中独有的函数/变量：

asyncData(context)
asyncData方法使得你能够在渲染组件之前异步获取数据。该方法在服务端中执行的，所以，请求数据时，不存在跨域问题。返回的数据将与 data() 返回的数据进行合并。由于asyncData方法是在组件 初始化 前被调用的，所以在方法内是没有办法通过 this 来引用组件的实例对象。

context 变量的可用属性一览：

属性字段	类型	可用	描述
isClient	Boolean	客户端 & 服务端	是否来自客户端渲染
isServer	Boolean	客户端 & 服务端	是否来自服务端渲染
isDev	Boolean	客户端 & 服务端	是否是开发(dev) 模式，在生产环境的数据缓存中用到
route	vue-router 路由	客户端 & 服务端	vue-router 路由实例。
store	vuex 数据流	客户端 & 服务端	Vuex.Store 实例。只有vuex 数据流存在相关配置时可用。
env	Object	客户端 & 服务端	nuxt.config.js 中配置的环境变量, 见 环境变量 api
params	Object	客户端 & 服务端	route.params 的别名
query	Object	客户端 & 服务端	route.query 的别名
req	http.Request	服务端	Node.js API 的 Request 对象。如果 nuxt 以中间件形式使用的话，这个对象就根据你所使用的框架而定。nuxt generate 不可用。
res	http.Response	服务端	Node.js API 的 Response 对象。如果 nuxt 以中间件形式使用的话，这个对象就根据你所使用的框架而定。nuxt generate 不可用。
redirect	Function	客户端 & 服务端	用这个方法重定向用户请求到另一个路由。状态码在服务端被使用，默认 302。redirect([status,] path [, query])
error	Function	客户端 & 服务端	用这个方法展示错误页：error(params)。params 参数应该包含 statusCode 和 message 字段。
fetch(context)
fetch 方法用于在渲染页面前填充应用的状态树（store）数据， 与 asyncData 方法类似，不同的是它不会设置组件的数据。为了让获取过程可以异步，你需要返回一个 Promise，Nuxt.js 会等这个 promise 完成后再渲染组件。

fetch 会在组件每次加载前被调用（在服务端或切换至目标路由之前）。

head
Nuxt.js 使用了 vue-meta 更新应用的 头部标签(Head) 和 html 属性。

用于更新 头部信息。如 title，descripe 等。在 head 方法里可通过 this 关键字来获取组件的数据。

layout
指定该页面使用哪个布局文件。默认值为 default。

middleware
需要执行的中间件，如鉴权的 auth等。

transition
指定页面切换时的动画效果。支持传入 String, Object, Function。具体配置请移步至 官网 。

validate
Nuxt.js 可以让你在动态路由对应的页面组件中配置一个校验方法用于校验动态路由参数的有效性。

返回 true 说明路由有效，则进入路由页面。返回不是 true 则显示 404 页面。

Begin Coding
前置工作
API
在这里，我们使用 CNode API 进行开发 Demo.

axios
请求数据，我们使用 Nuxt 官方提供的 @nuxtjs/axios 安装后，在 nuxt.config.js 中加上：

export default {
  ...
  modules: [
    '@nuxtjs/axios'
  ],
  axios: {
    baseURL: 'https://cnodejs.org/api/v1',
    // or other axios configs.
  }
  ...
}
就可以在页面中通过 this.$axios.$get 来获取数据，不需要在每个页面都单独引入 axios.

scss
需要先安装 sass-loader 和 node-sass

$ yarn add sass-loader node-sass --dev
如果需要在项目中全局使用某个 scss 文件（如 mixins, vars 等），需要借助 sass-resources-loader : yarn add sass-resources-loader —dev， 还需要在 nuxt.config.js 的 build 配置中调整导出的 loader 配置：

export default {
  ...
  build: {
    extend(config, { isDev, isClient }) {
      const sassResourcesLoader = {  
        loader: 'sass-resources-loader',  
        options: {  
          resources: [
            // 填写需要全局注入 scss 的文件。引入后，所有页面均有效。
            'assets/styles/mixins.scss'  
          ]
        }  
      }
      // 修改 scss sass 引用的 loader。
      config.module.rules.forEach((rule) => {  
        if (rule.test.toString() === '/\\.vue$/') {  
          rule.options.loaders.sass.push(sassResourcesLoader)  
          rule.options.loaders.scss.push(sassResourcesLoader)  
        }  
        if (['/\\.sass$/', '/\\.scss$/'].indexOf(rule.test.toString()) !== -1) {  
          rule.use.push(sassResourcesLoader)  
        }  
      })  
    }
  }
  ...
}
首页
首页一般只需要简单的获取首页数据并渲染即可。

主要 代码：

asyncData({app, query}) {
  console.log(query)
  // 根据不用的标签获取不同的数据，最后返回话题列表。
  return app.$axios.$get(`topics?tab=${query.tab || ''}`).then(res => {
    // console.log(res)
    // console.log(JSON.parse(res))
    return {list: res.data}
  })
}
当进入首页时，该函数会被执行， nuxt 会等到获取数据后再和组件的 data 合并，进而渲染数据。在模板中，可以直接使用 list 变量获取数据。

<div class="card fluid topic" v-for="topic in list" :key="topic.id" >
  <div class="section">
    <h3><nuxt-link :to="{name: 'topic-id', params: {id: topic.id}}" class="topic-title">{{topic.title}}</nuxt-link></h3>
    <p class="topic-info">
      <mark v-if="topic.top" class="tertiary">精华</mark>
      <mark v-else>{{tabsObj[topic.tab]}}</mark>
      <span class="avatar">
        <img :src="topic.author.avatar_url" alt="">
      </span>
      <span class="username">
        {{topic.author.loginname}}
      </span>
    </p>
  </div>
</div>
在这里提及一下， <nuxt-link /> 和 <a /> 的区别是： nuxt-link 走的是 vue-router 的路由，即网页已为单页面，并且浏览器不会重定向。而 a 标签走的是 window.location.href，每一次点击 a 标签后的页面，都会进行一次服务端渲染，和普通的 PHP 混合开发没有太大的区别。

在这里使用了 nuxt-link 是因为 CNode 的 API 不存在跨域问题，因此可以作为一个单页面应用，体验更好。

因为列表页数据类型有多种，该页面可能会被复用，所以当路由对象发生变化时，需要重新获取数据，这时可以监听路由的变化以做出响应：

watch: {
  '$route': function() {
    console.log('$route has changed.')
    this.getData()
  }
}
配置 seo 优化（这里只是单纯的复制罢了，demo 使用，侵删）：

head() {
  return {
    title: '首页' + (this.$route.query.tab ? `- ${this.tabsObj[this.$route.query.tab]}` : ''),
    meta: [{
      hid: 'description',
      name: 'description',
      content: 'CNode：Node.js专业中文社区'
    }]
  }
}
话题详情
同样的，使用 asyncData 函数进行获取数据，再渲染页面。

asyncData({app, params}) {
  console.log(params)
  return app.$axios.$get('topic/' + params.id).then(res => {
    // let data = res.data instanceof String ? JSON.parse(res.data) : res.data
    let data = res.data
    // console.log(res)
    // let div = document.createElement('div')
    // div.innerHTML = res.data.data.content
    // res.data.summary = div.innerText.substr(0, 120)
    data.summary = data.content.replace(/<[^>]+>/g,"").substr(0, 120).replace(/\s+/g, '')
    return {detail: data}
  }).catch(err => {
    console.log('axios.get failed.')
    console.error(err)
  })
}
在这里，踩过坑。想使用 div 的 innerText 来过滤掉正文中的 HTML 标签，但是，如果用户是直接进入这个页面的时候，执行 asyncData 时，document 对象是不存在的，从而会报错。也就是说，当 asyncData 在服务端执行时，是没有 document 和 window 对象的，请大家注意一下。

作为一个社区，seo 尤为重要，倘若每个页面都需要写一大堆的 head 对象，就会显得尤其的繁琐。所以可以借助 nuxt 的 plugin 机制，将其封装成一个函数，并注入到每一个页面当中：

// plugins/global.js
import Vue from 'vue'

Vue.mixin({
  methods: {
    // 必传 标题，描述。其他的 meta 标签通过 payload 注入，其中，每个 meta 的 hid 需要是唯一的。
    $seo(title, content, payload = []) {
      return {
        title,
        meta: [{
          hid: 'description',
          name: 'description',
          content
        }].concat(payload)
      }
    }
  }
})
在 nuxt.config.js 中加上：

export default {
  plugins: [
    '~plugins/global.js'
  ]
}
这样，只需要在页面的 head 的函数中，返回该函数即可：

head() {
    return this.$seo(this.detail.title, this.detail.summary)
}
