const express = require('express')
const createEndPoint = require('./src/index')

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