import express from 'express'
import restInit from './rest'

const port = 3000
const app = express()

// 使用express内置中间件解析json数据
app.use(express.json())

app.use((req, res, next) => {
  const { query, hostname, method, path, headers, body } = req
  const reqMsg = {
    method,
    path,
    hostname,
    query,
    headers,
    body
  }
  console.log('[System] recieve request: ',reqMsg)
  next()
})

restInit(app)

app.listen(port, () => {
  console.log("[System] Start!")
})