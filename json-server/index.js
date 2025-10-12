const fs = require('fs')
const jsonServer = require('json-server')
const jwt = require('jsonwebtoken')
const path = require('path')
const cors = require('cors')

const server = jsonServer.create()
const router = jsonServer.router(path.resolve(__dirname, 'db.json'))
server.use(cors())
// Парсер JSON обязательно!
server.use(jsonServer.bodyParser)

server.use(async (req, res, next) =>
{
    await new Promise((res) =>
    {
        setTimeout(res, 1000)
    })
    next()
})

server.use((req, res, next) =>
{
    if (req.path === '/login')
    {
        return next()
    }

    if (!req.headers.authorization)
    {
        return res.status(403).json({ message: 'Auth error' })
    }
    next()
})

server.post('/login', (req, res) =>
{
    const { username, password } = req.body
    const db = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'db.json'), 'UTF-8'))
    const { users } = db

    const userFromDb = users.find((user) => user.username === username && user.password === password)
    if (userFromDb)
    {
        return res.json(userFromDb)
    }

    return res.status(403).json({ message: 'Auth error' })
})

server.use(jsonServer.defaults())
server.use(router)

server.listen(8000, () =>
{
    console.log('JSON Server is running on 8000 port')
})