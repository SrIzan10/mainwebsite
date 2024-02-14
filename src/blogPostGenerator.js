import { glob } from 'glob'
import * as fs from 'node:fs'
import gm from 'gray-matter'
import { Feed } from 'feed'
import dayjs from 'dayjs'
import customParseFormat from "dayjs/plugin/customParseFormat.js";
import { marked } from "marked";
dayjs.extend(customParseFormat)

const feed = new Feed({
    title: 'Sr Izan\'s Blog',
    description: 'My little donowall place on the net',
    id: 'https://srizan.dev/blog',
    link: 'https://srizan.dev/blog',
    language: 'en',
    image: 'https://srizan.dev/pfp.png',
    favicon: 'https://srizan.dev/pfp.png',
    copyright: 'Copyleft 2023, Sr Izan',
    feedLinks: {
        json: 'https://srizan.dev/blog/feed.json',
        atom: 'https://srizan.dev/blog/atom.xml',
        rss: 'https://srizan.dev/blog/rss.xml'
    },
    author: {
        link: 'https://srizan.dev',
        name: 'Sr Izan',
        email: 'izan@srizan.dev'
    }
})

const data = []

await glob('./src/blog/**/*.md').then(async (files) => {
    for (const file of files) {
        const readFile = fs.readFileSync(file)
        const dt = gm(readFile).data
        const fileContent = gm(readFile).content
        if (dt.draft) return

        dt.fileContent = fileContent
        dt.fileName = file.replace('src/blog/', '')
        console.log(`File ${dt.fileName} read successfully`)
        data.push(dt)

        feed.addItem({
            title: dt.title,
            id: `https://srizan.dev/blog/${dt.id}`,
            link: `https://srizan.dev/blog/${dt.id}`,
            description: dt.description,
            content: marked.parse(fileContent),
            date: dayjs(dt.date).toDate(),
            author: [
                {
                    name: 'Sr Izan',
                    link: 'https://srizan.dev'
                }
            ]
        })
    }
})

data.sort((a, b) => b.id - a.id);

fs.writeFileSync('./public/blogPosts.json', JSON.stringify(data))
fs.writeFileSync('./public/blog/feed.json', feed.json1())
fs.writeFileSync('./public/blog/rss.xml', feed.rss2())
fs.writeFileSync('./public/blog/atom.xml', feed.atom1())