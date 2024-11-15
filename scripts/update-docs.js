import fs from 'fs'
import path from 'path'

const updateReadme = () => {
  const readmePath = path.join(process.cwd(), 'README.md')
  const packagePath = path.join(process.cwd(), 'package.json')

  const pkg = JSON.parse(fs.readFileSync(packagePath, 'utf8'))
  const readme = fs.readFileSync(readmePath, 'utf8')

  // 更新版本号
  const updatedReadme = readme.replace(
    /\[(\d+\.\d+\.\d+)\]/,
    `[${pkg.version}]`
  )

  fs.writeFileSync(readmePath, updatedReadme)
  console.log('README.md has been updated!')
}

updateReadme() 