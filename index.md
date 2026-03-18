---
layout: home

hero:
  name: xca
  text: 记录与思考
  tagline: 经验总结 · 生活感悟 · 技术探索
  image:
    src: /logo-xca-square.svg
    alt: xca logo
  actions:
    - theme: brand
      text: 开始阅读
      link: /posts/
    - theme: alt
      text: 关于我
      link: /about

features:
  - icon: 📝
    title: 经验总结
    details: 项目复盘、技术学习、踩坑记录
  - icon: 💭
    title: 生活感悟
    details: 日常思考、读书笔记、随笔杂谈
  - icon: ⚡
    title: 简洁至上
    details: 极简设计，专注内容本身
---

<script setup>
import { withBase } from 'vitepress'
import { data as postsData } from './posts.data.js'

const sortedPosts = postsData.posts.sort((a, b) => new Date(b.date) - new Date(a.date))
</script>

## 最新文章

<ul>
  <li v-for="post in sortedPosts" :key="post.id">
    <a :href="withBase(post.link)">{{ post.title }}</a> - {{ post.date }}
  </li>
</ul>

---

<style scoped>
.VPHero .VPImage {
  max-width: 120px;
  border-radius: 24px;
}
</style>
