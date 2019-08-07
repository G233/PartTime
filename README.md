# 「小课兼」介绍文档

## 产品定位
面向大学附近商家和同学们的兼职平台

## 开发背景
在高校学生人群中，不少同学通过兼职来赚取生活费，但是在信息不对等的情况下，如何方便的获取兼职信息的职位就成为了一个大问题，
于是我们就想开发一款小程序来解决这些问题

## 市场调研
在开始小程序开发之初，我们对于产品面向的两大群体「学生-商家」 分别进行了调研，也对现有的招兼职方式进行了了解，我们发现就现有的渠道（兼职群）而言，对于商家和学生来说都不尽人意，问题主要存在在这几个方面

**对商家而言**
* 找不到渠道发布，对于校外人员来说，要进入校内群更是困难
* 时效性低，本来兼职就是短时间的工作需求，能否快速的找到合适的人很重要

**对学生而言**
* 正是由于有需求的人找不到地方发布，所以造成了职位过少的现象，抢不到职位
* 群主垄断信息，收取高昂的中介费，让本就经济困难的同学望而却步
* 现有兼职介绍团队鱼龙混杂，不乏有欺诈虚假信息存在，学生安全得不到保障

这些都是我们可以改进的地方，我们希望能够帮助到同学们
## 功能说明

* 所有人都可以在首页按分类查看兼职职位
* 需要填写简历信息才能进入职位相关流程
* 可以在平台上发布想要招聘的职位
* 可以收藏中意的职位稍后查看
* 可以把职位分享给他人查看
* 可以多人同时申请职位，发布者可以任意选择就职者确认
* 在双向选择确认之后会交换双方联系信息，避免联系方式被滥用
* 采用站内信和小程序模板信息通知职位状态信息
* 职位录取确认之后职位变为不可删除，作为就职关系存档保存以防纠纷
* 可直接联系开发者反馈信息


## 技术选型

#### 小程序端
小程序端采用 mpvue 框架进行开发，具体用到的技术栈为
* **mpvue** ---  模块化开发更利于团队合作，npm 更加方便的引入包
* **Vuex**  --- 集中状态与数据处理，方便页面间，组件间数据通信
* **WxService** - 将所有微信 API 进行 promise 封装，避免回调地狱
* **iView Weapp** --- 小程序UI组件库
* **Color-UI** --- 纯css UI 组件库
* **Animate** ---基于 css3 的动画库 
* **WxRequest** ---基于 Promise 封装 wx.request 请求方法，同时支持自定义请求的配置、拦截请求和响应、转换请求和响应数据、自动转换 JSON 数据等等功能。
* **ES6** --- 采用 await 语句实现了类同步的语法格式，避免复杂的嵌套回调
* **Vuex-persistedstate** --- 持久化vuex中的数据，缓存常用数据，减少网络请求，提高首屏加载速度

#### 后端
后端使用 node 详细技术栈为
* **Nginx** --- 反向代理，负载均衡
* **Koa2** --- 基于node.js的 web 开发框架
* **mongoDb** --- 文档性数据库
* **PM2** --- node.js流程管理器，可以实现多核负载均衡

## 优化
**性能优化**
* 删除了引入库中所有未使用的部分，减小代码包体积
* 对重要数据和必要数据进行缓存，提高了小程序的响应速度
* 在职位首页和站内信等有长列表加载的地方使用分页加载，提高响应速度
* 压缩所有使用的图片，减小体积，提升小程序打开速度
* 考虑到本小程序页面并不多，所以未使用分包加载

**用户体验优化**
* 由于发布职位对于商家用户来说是优先级最高的操作，但是对于学生用户来说基本上用不到，所以我们把发布职位按钮放在了首页的最高层级，但是在浏览职位信息这一学生常用操作的时候进行隐藏，很好的兼顾了两类用户的使用体验
* 在需要进行网络数据请求展示数据的地方都做了动画，降低用户在等待时候的焦虑感
* 在所有用户操作的地方，成功还是失败都有反馈
* 仅使用 openId 绑定用户，无需用户授权即可实现静默登陆
* 对于用户详细资料填写我们也非常克制，只有在进行发布职位，申请职位这两个后续需要详细信息的流程进行了提醒拦截，不填写也可以正常浏览，收藏职位。
* 对于职位信息的变动都进行了站内信的提醒，避免用户对于收藏或申请中的职位变动产生困扰
* 对于小程序的定位非常清晰，我们的平台仅作为工具使用，无签到、积分等多余部分增强用户粘性，符合小程序用完即走的概念 
* 页面数据展示层级清晰，有一些状态变化使用了过渡动画，提升了用户浏览体验
* 双向确认保护了用户的个人隐私信息
* 对于一些不是特别重要的删除我们提供的是撤销而不是弹框确认，减少了打断用户操作

## 运营

**存在问题**

因为这款小程序开发的初衷就是为了能够帮助到同学们，所以一定会上线运营，不过在上线之前还有一个问题需要解决，那就是信息审核的问题，平台上信息的管控是一个需要关注的点，平台方有责任也有义务确保信息的真实，也是为了保护同学的安全与钱财，所以信息审核是一个必要的流程，不过限于开发时间与参加比赛的这个性质，暂时还未写入正式版中。

**商业化**

小课兼可以考虑采用付费查看职位的方式，但是肯定不会很高，在这个流程中，学生方是有收入的一方，付费意愿应该比本来就要支出的商家方强，还有一种思路就是转型成大学生家教平台，接入学校系统认证，做垂直细分领域，仅需要很小的代码改动，这样一来平台的核心竞争力就变成了货真价实的大学生，这时可以面向家长收费，我认为是可取的，家教本身也是大部分学生兼职的选择。

**营销**

把握不同用户群体痛点，商家端可以主打平台真实学生资源丰富，学生端可以主打 低中介费，真实有保障。

## 后续升级计划
限制于开发时间，还有和许多可以优化和升级的地方
* 信息提醒采用手机短息的方式
* 首页添加搜索功能
* 付费可以置顶职位信息
* 添加发布信息审核

## 说明
* 限制于个人开发账号，微信支付无法接入，所以现阶段暂未接入付费功能。
* 模板信息尚未审核完成，暂时无法使用
* 因为本小程序是采用 mpvue 进行开发，看源代码的话建议看未编译的代码，经过 mpvue 编译后的代码可读性很低，两份代码都会打包上传
* 提供正式版小程序码方便评委们查看
* ![](http://ww1.sinaimg.cn/large/005SZDNKly1g3jqz73d3dj30zk0zkn72.jpg)

## 使用
安装所需模块 npm install
编译 npm run dev
编译好的文件在 /dist/wx/ 文件里

### ps：
服务器已经另作他用，所以此小程序正式版已经不可访问了，代码可做学习使用，后台代码在另一个项目里
