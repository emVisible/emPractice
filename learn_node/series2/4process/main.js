
const process = require('process')
/**
 * 标准输入输出
*/

process.stdin.on('data', (data) => {
  if (data == 'exit') process.exit(-1)
  const currentMsg = {
    version: process.version, // 当前Node版本
    env: process.env, // 环境变量
    workDirectory: process.cwd(), // 当前工作目录
    args: process.argv, // 传入node的参数
    data: data //tsdin输入
  }
  Object.entries(currentMsg).forEach(item => {
    process.stdin.write(item)
  })
})