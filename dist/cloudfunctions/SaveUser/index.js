// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  const db = cloud.database({
    env: 'aa'
  })
  let res = await db.collection('user').add({
    data: {
      "adwda": "awsdawsd"
    }
  })
  console.log(res)

  return 0
}
