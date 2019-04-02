# LYC
本库为 2019高校小程序开发大赛 合作库

名称：***

产品定位：学生，兼职，低佣金（免费）

## 产品功能：
* 分为两个用户端，发布者端和求职者端
* 拟采用分包加载技术，分为发布者包和求职者包，根据用户初次登录时选定的角色，进行包选择加载，后续提供切换角色功能，主包仅供角色分析加载功能
* 从大体上来说，发布者，求职者，职位信息三者通过职位类别进行连接与区分
* 对于求职者与发布者的联系，拟采用双向确认，当一方看到另一方的需求时可以申请联系，并自动发送己方信息，当对方确认都即可向双方展示详细信息
* 看是否有直接调用微信聊天框功能，也可以二次确认后展示名片二维码
* 站内信广播，当求职者的意向职位和发布者相同时可直接向对方发布站内信通知，此系统为双向，可关闭
* 收费定位为面向商家收费，可采取单次收费也可以采取功能收费，求职者也就是学生免费使用
#### 发布者端
* 登录
    * 要求实名认证，可以采用微信支付进行认证或者调用微信手机号验证
* 发布职位需求
    * 地点-类别-薪资-工作时间-发布时间-附注
    * 可考虑付费发布职位，也可以采用功能收费，如站内信广播，适量的付费可过滤垃圾信息
    * 工作地点采用地图定位，求职者可以在地图中查看
* 查看求职需求
    * 可按照求职者意向职位分类查看
#### 求职者端
* 登录 
    * 可以考虑采用教务系统学号登录，如无必要可以不加
* 发布求职需求
    * 类别-意向薪资-可工作时间-发布时间-附注
* 查看职位需求
    * 可查看发布者发布的职位需求，可分类查看 


也有一个简化版的系统，即仅有发布者可发布需求，由求职者单向浏览，可直接联系发布者。综合开发难度和开发时间可进行取舍。可以先把这条线做完，参加比赛，后续开发再完善功能，所以开发要注意模块化和低耦合性


#### 技术选型
前端：
* mpvue-小程序端的 vue 实现
* vuex-集中状态与数据处理
* 由于不考虑多前端，路由和数据请求可直接采用小程序 api
* iView Weapp和color-ui——UI框架 

后端：
* Django-啥都有
* mysql-谁都用

####  技术难点
* 站内信广播
* 双向确认

#### 学习资料
* [ES6](http://es6.ruanyifeng.com/)
* [Git](https://www.liaoxuefeng.com/wiki/0013739516305929606dd18361248578c67b8067c8c017b000)
* [python](https://www.liaoxuefeng.com/wiki/0014316089557264a6b348958f449949df42a6d3a2e542c000)
* [Django](https://docs.djangoproject.com/zh-hans/2.2/)
* [小程序官方文档](https://developers.weixin.qq.com/miniprogram/dev/)
* [小程序开发指南](https://developers.weixin.qq.com/ebook?action=get_post_info&token=935589521&volumn=1&lang=zh_CN&book=miniprogram&docid=0008aeea9a8978ab0086a685851c0a)
* [Vue](https://cn.vuejs.org/)
* [Vuex](https://vuex.vuejs.org/zh/)
* [mpvue](http://mpvue.com/mpvue/)
* [iView](https://weapp.iviewui.com/)
* [Color-UI](https://www.color-ui.com/)
* [色彩搭配](https://www.materialpalette.com)
* [渐变搭配](https://m.okjike.com/originalPosts/5c87f309b9baeb0018afdc0b?source_username=0e026b8b-4f5c-4ad6-97c8-a44bb082334e&utm_source=qq&share_distinct_id=169dd5108a659-0e2f326feec91d-7a1437-2073600-169dd5108aada&share_depth=1)
