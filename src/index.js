const Mock = require('mockjs')

/**
 * 根据mockjs配置生成对应url的api接口工厂
 * app是类似于express的对象，提供产生get，post，put等接口的api，以get为例：
 *      app.get = (url, (req, res) => {})
 * 其余方法参数一致，方法名即为http请求方式名（小写）。
 * app还需要提供一个send方法回应请求,一个status方法设置返回码。
 * @param {Object} app 类似express的对象
 * @param {Function} app.get 
 * @param {Object} mockConfig mock配置
 * @param {String} method http的请求方法，如get,post等
 * @param {url} http请求的url 如 /mock/test1/:id
 * @param {Object | Function} data 可以是mockjs的数据配置，也可以是函数，函数的形式为：
 * (req, res) => {}, req 表示request对象，res表示response对象，这里是指类似express提供的request和response对象
 * @param {Number} statusCode http返回码如200,404等
 * 
 */
function createApiItem(app, mockConfig){
    const { method, url, data, statusCode } = mockConfig
    const methodKey = (method || 'get').toLowerCase()
    app[methodKey](url, (req, res) => {
        if (statusCode || statusCode === 0) {
            res.status(statusCode)
        }
        if(typeof data === 'function') {
            data(req, res, Mock)
            return
        }
        const json = Mock.mock(data)
        res.send(json)
    })
}

module.exports = function createEndpoints(app, mockList){
    (mockList ||[]).forEach(item => createApiItem(app, item))
}
