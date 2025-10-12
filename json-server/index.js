const fs = require('fs')
const jsonServer = require('json-server')
const jwt = require('jsonwebtoken')
const path = require('path')
const cors = require('cors')

const server = jsonServer.create()
const router = jsonServer.router(path.resolve(__dirname, 'db.json'))

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
    if (!req.authorization)
    {
        return res.status(403).json({ message: 'Auth error' })
    }
    next()
})

server.use(jsonServer.defaults())
server.use(router)
server.use(cors({
    origin: '*'
}))

server.post('/login', (req, res) =>
{
    const { username, password } = req.body
    const db = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'db.json'), 'utf-8'))
    const { users } = db

    const userFromDb = users.find((user) => user.username === username && user.password === password)
    if (userFromDb)
    {
        return res.json(userFromDb)
    }

    return status(403).json({ message: 'Auth error' })
})

server.listen(8000, () =>
{
    console.log('JSON Server is running on 8000 port')
})