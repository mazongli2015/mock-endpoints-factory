const axios = require('axios')

test('测试普通get接口-----', () => {
    const base = 'http://localhost:3000/mock'
    axios.get(base + '/test1').then(rs => Object.keys(rs.data))
    .then((keys) => {
        expect(keys).toEqual(['name', 'age'])
    })
})

test('测试普通url带参数的get接口-----', () => {
    const base = 'http://localhost:3000/mock'
    axios.get(base + '/test3/214').then(rs => Object.keys(rs.data))
    .then((keys) => {
        expect(keys).toEqual(['id','name', 'age'])
    })
})

test('测试返回状态码为404的post接口-----', () => {
    const base = 'http://localhost:3000/mock'
    axios.post(base + '/test2').catch(e => {
        expect(e.response.status).toBe(404)
        expect(e.response.data).toBe('cannot reached')
    })
})