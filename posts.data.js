// VitePress 数据加载器
// 用于在 Markdown 中加载 posts.json 数据

import postsData from '../posts.json'

export default {
  load() {
    return postsData
  }
}
