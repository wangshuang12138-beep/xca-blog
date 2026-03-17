---
title: 文章列表
description: 所有博客文章列表
---

# 文章列表

这里记录我的所有文章，按时间倒序排列。

<script setup>
import { data as postsData } from '../posts.data.js'

const sortedPosts = postsData.posts.sort((a, b) => new Date(b.date) - new Date(a.date))

// 按年份分组
const groupedPosts = sortedPosts.reduce((acc, post) => {
  const year = post.date.split('-')[0]
  if (!acc[year]) acc[year] = []
  acc[year].push(post)
  return acc
}, {})

const years = Object.keys(groupedPosts).sort((a, b) => b - a)
</script>

<div v-for="year in years" :key="year">
  <h2>{{ year }}</h2>
  
  <div v-for="post in groupedPosts[year]" :key="post.id" class="post-item">
    <h3><a :href="post.link">{{ post.title }}</a></h3>
    <p class="post-meta">{{ post.date }} · {{ post.category }}</p>
    <p class="post-desc">{{ post.description }}</p>
  </div>
</div>

<style scoped>
.post-item {
  margin: 1.5rem 0;
  padding: 1rem;
  border-radius: 8px;
  background: var(--vp-c-bg-soft);
}

.post-item h3 {
  margin: 0 0 0.5rem 0;
  font-size: 1.2rem;
}

.post-item h3 a {
  text-decoration: none;
  color: var(--vp-c-text-1);
}

.post-item h3 a:hover {
  color: var(--vp-c-brand);
}

.post-meta {
  margin: 0.25rem 0;
  font-size: 0.875rem;
  color: var(--vp-c-text-2);
}

.post-desc {
  margin: 0.5rem 0 0 0;
  color: var(--vp-c-text-2);
  font-size: 0.95rem;
}
</style>
