# 初衷
    我们在做前端页面时，有时需要调用接口，但是后端开发人员有可能还没有完成，这时我们需要一个模拟数据返回的服务器。若是单纯地使用mockjs来模拟数据，无法做到完全的http请求模拟，若是新建一个服务器，则前端需要处理跨域问题。
    在这里，mock-endpoints-factory集成了[mockjs](http://mockjs.com)，为用户提供了一个简单的api，可以迅速创建对应url的http接口，可以方便的集成进webpack中。

# 准备
    我们以express为例来新建一个mock服务器。


## 安装 
    打开命令行运行如下命令：
```bash
    npm i -D mockjs express mock-endpoints-factory
```

## 配置mock数据
```js
// 必须是一个数组
const configList = [
    {
        url: '/mock/test1', // 必需参数。
        data: { // 返回数据格式
            "name": "@cname",
            "age|1-100": 22
        },
        method: 'get' // 必需参数。http请求方法
    },
    {
        url: '/mock/test2',
        data: 'cannot reached',
        statusCode: 404, // 非必需参数。http状态码
        method: 'post'
    },
    {
        url: '/mock/test3/:id', // 带参数的路由
        data: (req, res, Mock) => { // 返回数据格式，也可以是函数。
            const id = req.params.id
            res.send({ // 调用res.send方法返回数据到客户端
                id,
                name: Mock.mock('@cname'),
                age: parseInt(Math.random() * 80) + 20
            })
        },
        method: 'get'
    },
]

```

# 在webpack-dev-server中集成
我们可以在webpack-dev-server加入这样的配置：
```js
const createEndPoint = require('mock-endpoints-factory')

module.exports = {
    ...
    before(app){
        createEndPoint(app, configList)
    }
    ...
}
```

# 创建mock服务器

## 创建服务器
```js
const express = require('express')
const createEndPoint = require('mock-endpoints-factory')
const app = express()
const port = 3000

createEndPoint(app, configList)

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})

```