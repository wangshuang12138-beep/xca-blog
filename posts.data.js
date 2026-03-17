import { readFileSync } from 'fs'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

const __dirname = dirname(fileURLToPath(import.meta.url))
const postsData = JSON.parse(readFileSync(join(__dirname, 'posts.json'), 'utf-8'))

export default {
  load() {
    return postsData
  }
}
