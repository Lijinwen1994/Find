# find

> VUE全家桶 + elementUI + axios + Sass预处理器 + node(express框架) + mysql开发的 职场信息类，我独立完成的全栈项目。
## 项目已经部署上线
  <a href='http://www.lijinwen.cn/find' target="_blank">点这里预览</a>
  在腾讯云 使用pm2部署

## 统计
    前端 32个vue组件 超过5000行代码。 <br>
    后端 19个接口 接近2000行代码
## 功能
* 一/二级评论
* session实现免登陆
* 图片上传,保存
* 话题可以贴上标签， 可根据标签取得对应话题。
* 标签模糊搜索:使用sql 的like语句实现
* 自己写了个vue鼠标滚动加载插件
* 百度地图API获取经纬度，保存到数据库，读取时调用百度地图API渲染

## 优化
* vue路由懒加载
* 标签模糊搜索，使用vue 的watch 输入框的value的变化。loadsh的`debounce`函数防抖方法，避免了短时间大量请求。

<pre>
watch: {
  //用于用户搜索标签时，请求标签。
  tagInputValue(newValue){
    this.getTags();
  }
},
methods: {
  //loadsh的函数防抖方法
  getTags:_.debounce(
    function () {
      getSearchTag(this.tagInputValue).then((res) => {
        //获取返回的数据
      })
    }, 500)
}
</pre>
* 多个复用的组件
* 使用ES2015语法 `promise`， `async/await`解决express回调嵌套的问题
* 鼠标滚动加载插件， 用于公司，个人简历信息，问吧话题加载。避免一次加载全部数据
* 开启强制预解析：`<meta http-equiv='x-dns-prefetch-control' content='on'>` 在高级浏览器中，a标签默认打开了dns预解析，但在https中，浏览器默认关闭预解析，这句话就是强制打开预解析
* 选用iconfont 矢量图作为图标减少http请求。
## 还可以进行的优化
* vue-ssr 服务器渲染，解决spa首屏加载慢，以及SEO问题
* 对于支持webp的浏览器，可将图片转成webp格式， 方案可以是 加载一段base64格式的webp图片，并判断图片宽高的方案进行浏览器嗅探


## 通过这个项目学到的东西
### 前端方面
	* 熟悉了vue框架的使用，包括slot插槽，过滤器，过渡动画，eventBus，自定义事件向上通信等等...
	* 以及其核心插件vue-router, vuex的使用
	* 跨域的实践， 由于前端和后端各起一个服务，端口不同造成跨域。使用cors处理跨域。
	* 锻炼了BUG的定位，解决能力。  在解决BUG中成长 	
	
### 后端方面
	* 初探node.js 魅力，踏出实现成为web全栈目标的第一步。 
	* 了解前后端数据的交互流程
	* 数据接口的设计
	* 熟悉了session，cookie。 并使用session实现免了登陆功能
	* 初步了解express框架的使用
### 数据库方面
	*数据库选择mysql而不选择mongodb有2个原因，第一是因为大学上过这门课，学习成本相对较低。第二项目中有二级评论，以及相对繁琐的标签关联，外键约束。所以选择更加灵活的mysql。
	* 熟悉了增删改查，like模糊查询，多表查询等sql语句 
	* 了解了连接池的概念
	
## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

For detailed explanation on how things work, checkout the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).
