import { glob } from 'glob'
import * as fs from 'node:fs'
import gm from 'gray-matter'

const data = []

await glob('./src/blog/**/*.md').then(async (files) => {
    for (const file of files) {
        const readFile = fs.readFileSync(file)
        const dt = gm(readFile).data
        dt.fileContent = gm(readFile).content
        dt.fileName = file.replace('src/blog/', '')
        console.log(`File ${dt.fileName} read successfully`)
        data.push(dt)
    }
})

fs.writeFileSync('./blogPosts.json', JSON.stringify(data))