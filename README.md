# 准备
    我们以express为例来新建一个mock服务器。
## 安装 
    打开命令行运行如下命令：
```bash
    npm i -D mockjs express
```
# 创建mock服务器
具体代码如下：
```js
const express = require('express')
const createEndPoint = require('mock-endpoints-factory')

const configList = [
    {
        url: '/mock/test1',
        data: {
            "name": "@cname",
            "age|1-100": 22
        },
        method: 'get'
    },
    {
        url: '/mock/test2',
        data: 'cannot reached',
        statusCode: 404,
        method: 'post'
    },
    {
        url: '/mock/test3/:id',
        data: (req, res, Mock) => {
            const id = req.params.id
            res.send({
                id,
                name: Mock.mock('@cname'),
                age: parseInt(Math.random() * 80) + 20
            })
        },
        method: 'get'
    },
]

const app = express()
const port = 3000

createEndPoint(app, configList)

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})

```