const { promisify } = require('util')
const figlet = promisify(require('figlet'))
const clear = require('clear')
const chalk = require('chalk')
const open = require('open')
const fs = require('fs')

const { clone } = require('./download.js')
const refresh = require('./refresh.js')

const spawn = async (...args) => {
  const { spawn } = require('child_process')
  return new Promise(resolve => {
    const proc = spawn(...args)
    proc.stdout.pipe(process.stdout)
    proc.stderr.pipe(process.stderr)
    proc.on('close', () => {
      resolve()
    })
  })
}

const log = (content, type = 'green') => console.log(chalk[type](content))

module.exports = async answers => {
  const { name } = answers
  // 打印欢迎页面
  clear()
  const data = await figlet('Easy Cli')
  log(data)

  if (fs.existsSync(name)) {
    log(`已存在项目文件夹${name}！`, 'red');
    return;
  }

  // clone
  log(`🚀 创建项目：${name}`)
  await clone('github:sun-bigshan/simple-boilerplate', name)

  // 修改 package.json 文件
  log(`✏️ 修改 package.json 文件`)
  await refresh(answers)

  // 自动安装依赖
  log('🔨 安装依赖')
  await spawn('yarn', ['install'], { cwd: `./${name}` })

  log(`
👌 安装完成
To get start:
=========================
    cd ${name}
    yarn serve
=========================
  `)

  open('http://127.0.0.1:8080')

  // 启动
  await spawn('yarn', ['serve'], { cwd: `./${name}` })
}