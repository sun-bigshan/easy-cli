const fs = require('fs')
const path = require('path')

const refresh = async answers => {
  const filePath = path.resolve(process.cwd(), `${answers.name}/package.json`)
  let jsonData = fs.readFileSync(filePath)
  jsonData = JSON.parse(jsonData)
  for(item in answers){
    jsonData[item] = answers[item]
  }
  const res = JSON.stringify(jsonData, null, '\t')
  fs.writeFileSync(filePath, res)
}

module.exports = refresh