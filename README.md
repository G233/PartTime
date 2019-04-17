# LYC

本库为 2019 高校小程序开发大赛 合作库

<<<<<<< HEAD
名称：\*\*\*

产品定位：学生，兼职，低佣金（免费）

## 产品功能：

- 分为两个用户端，发布者端和求职者端
- 拟采用分包加载技术，分为发布者包和求职者包，根据用户初次登录时选定的角色，进行包选择加载，后续提供切换角色功能，主包仅供角色分析加载功能
- 从大体上来说，发布者，求职者，职位信息三者通过职位类别进行连接与区分
- 对于求职者与发布者的联系，拟采用双向确认，当一方看到另一方的需求时可以申请联系，并自动发送己方信息，当对方确认都即可向双方展示详细信息
- 看是否有直接调用微信聊天框功能，也可以二次确认后展示名片二维码
- 站内信广播，当求职者的意向职位和发布者相同时可直接向对方发布站内信通知，此系统为双向，可关闭
- 收费定位为面向商家收费，可采取单次收费也可以采取功能收费，求职者也就是学生免费使用

#### 小程序功能流程

- 点击进入小程序后展示海报 2-3s //海报作用是什么
- 进入账号注册页面
  - 提交注册手机号和密码或者使用微信登陆
- 进入身份选择页面
  - 通过选择“发布者”或“求职者”身份使用不同的用户端

#### 发布者端

- 填写名片

  - 上传姓名-微信号
- 首页
  - 人力资源分类（按照求职者意向职位分类查看）-人才推荐
         家教

    ​    
- 发布职位需求
  - 职位类别-职位名称-工作内容-工作时间-工作地点-技能需求-薪资说明-发布时间-附注
  - 可考虑付费发布职位，也可以采用功能收费，如站内信广播，适量的付费可过滤垃圾信息
  - 工作地点采用地图定位，求职者可以在地图中查看
- 消息
  - 可与联系人互发消息 //与求职者吗？
  - 联系人列表-一键已读-消息管理-添加联系人 // 添加联系人放在求职信息页面就好了
- 我的
  - 显示名称、头像
  - 沟通数-招贴数-录用数
  - 我的名片-我的关注-我的发布-隐私设置-帮助与反馈

#### 求职者端

- 填写自我简介
  - 上传头像-姓名-出生年月-学校-年级专业-微信号-在校经历-核心优势
- 首页
  - 地区选择-搜索功能
  - 职位分类（查看发布者发布的职位需求）-职位推荐
- 发布求职需求
  - 职位类别-职位名称-意向薪资-工作时段-工作地点-申请理由-发布时间-附注
- 消息
  - 可与联系人互发消息
  - 联系人列表-添加联系人-消息管理-一键已读
- 我的
  - 显示名称、头像
  - 沟通数-投递数-任职数
  - 我的简历-我的关注-我的发布-隐私设置-帮助与反馈

也有一个简化版的系统，即仅有发布者可发布需求，由求职者单向浏览，可直接联系发布者。综合开发难度和开发时间可进行取舍。可以先把这条线做完，参加比赛，后续开发再完善功能，所以开发要注意模块化和低耦合性
=======
名称：工大课兼

产品定位：学生，兼职，单向收费

## 小程序功能流程

* 删去了角色区分，采取统一的角色
* 每个人都可以发布职位，也可以进行求职
* 进行了两种分类的划分，招聘定位短中期工作，委托则是单次的任务
* 一次招聘流程
  * 付费发布招聘信息
  * 求职者浏览职位列表
  * 当看到想去的职位是可以点进详情页查看地点和其他详细信息
  * 点击想要，填写附注，可与雇主进行一定协商
  * 发布职位的人会在第一个应聘者产生的时候收到一次小程序通知
  * 会将所有点击过「想要」的人的个人信息列出来供招聘者进行筛选
  * 进行确认，然后对招聘进行通知，展示雇主联系方式
  * 销毁其他人的信息，对其进行应聘失败的通知
* 一次委托流程
  * 免费（低价）发布委托任务
  * 采取先到先得的策略
  * 一经确认即交换双方联系方式

## 页面功能细分：

### 登录

* 姓名
* 性别
* 手机号：仅求职时展示给对方
* 微信号：

### 首页

* 职业分类
  * 家教：小学/初中/高中/
  * 服务：服务员/收银员/ 店面服务人员
  * 跑腿：送外卖/送快递/发传单/ 户外体力活动
  * 委托：取快递/代购/表白/送礼/ 单次收费服务
* 卡片列表-圆角纯白卡片
  * 职位名称
  * 薪酬
  * 工作时间
  * 收藏角标：点击一下即可收藏
* 卡片排序
  * 发布时间
  * 薪酬

### 收藏页

* 点击过收藏的职位信息
* 点击前往详情页
* 取消收藏

### 发布职位页

* 职位名称
* 分类：分类可由用户申请自定义，由开发者审核，审核不通过由开发者选择类型。
* 薪资：时/月，当类型为委托时，薪资单位为次
* 地点：由腾讯地图提供，当类型为委托时不要求提供
* 附注：附加详细要求
* 付费：可采取少量收费过滤垃圾信息，委托类别的免费，付费进行优先展示

### 职位详情页

* 职位名称
* 薪酬
* 附注
* 工作地点
* 想做：文案暂定，点击按钮后弹框可填写附注（雇主可以看到你的文字噢，有什么想说的吗），可以进行一点简单的协商，或者介绍一下自己的优势。
* 收藏

###我的页面

* 站内信
  * 一些通知
* 我发布的职位
  * 可以进行删除，提供撤销操作而不是二次确认
  * 想要的人：
    * 将所有点击过想要的人的信息做一个列表，附带上附注，有一个「就 ta 了」按钮，进行确定，对于这个操作弹窗进行提醒，也可以在顶端进行提醒（此人将收到你的招聘请求，且会交换你们的联系方希），其他人给一个招聘失败的字段
* 我想要的职位
  * 也是一个所有点击过想要的职位的列表，有一个标记状态，等待还是拒绝还是成功，可以点击进入职位详情页
* 隐私设置
  * 联系方式的展示设定
* 意见与反馈
  * 直接跳转开发者微信
* 关于我们
  * 介绍一下开发人员
* 更改个人信息
  * 可以对个人资料进行修改
>>>>>>> lg

#### 技术选型

前端：

* mpvue-小程序端的 vue 实现
* vuex-集中状态与数据处理
* 全部采用小程序的 promiseAPI 封装
* iView Weapp

* color-ui——UI 框架
* animate:动画 css

#### 学习资料

* [ES6](http://es6.ruanyifeng.com/)
* [Git](https://www.liaoxuefeng.com/wiki/0013739516305929606dd18361248578c67b8067c8c017b000)
* [小程序官方文档](https://developers.weixin.qq.com/miniprogram/dev/)
* [小程序开发指南](https://developers.weixin.qq.com/ebook?action=get_post_info&token=935589521&volumn=1&lang=zh_CN&book=miniprogram&docid=0008aeea9a8978ab0086a685851c0a)
* [Vue](https://cn.vuejs.org/)
* [Vuex](https://vuex.vuejs.org/zh/)
* [mpvue](http://mpvue.com/mpvue/)
* [iView](https://weapp.iviewui.com/)
* [Color-UI](https://www.color-ui.com/)
* [色彩搭配](https://www.materialpalette.com)
* [渐变搭配](https://m.okjike.com/originalPosts/5c87f309b9baeb0018afdc0b?source_username=0e026b8b-4f5c-4ad6-97c8-a44bb082334e&utm_source=qq&share_distinct_id=169dd5108a659-0e2f326feec91d-7a1437-2073600-169dd5108aada&share_depth=1)
