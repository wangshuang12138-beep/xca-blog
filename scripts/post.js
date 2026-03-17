#!/usr/bin/env node
/**
 * 博客文章管理脚本
 * 用法: node scripts/post.js [command] [args]
 * 
 * 注意: config.mjs 和 index.md 会自动从 posts.json 读取，无需手动同步
 */

const fs = require('fs');
const path = require('path');

const POSTS_JSON = path.join(__dirname, '..', 'posts.json');
const POSTS_DIR = path.join(__dirname, '..', 'posts');

// 读取文章列表
function loadPosts() {
  const content = fs.readFileSync(POSTS_JSON, 'utf-8');
  return JSON.parse(content);
}

// 保存文章列表
function savePosts(data) {
  fs.writeFileSync(POSTS_JSON, JSON.stringify(data, null, 2), 'utf-8');
}

// 创建新文章
function createPost(id, title, description) {
  const today = new Date().toISOString().split('T')[0];
  const filename = `${id}.md`;
  const filepath = path.join(POSTS_DIR, filename);
  
  // 检查文件是否已存在
  if (fs.existsSync(filepath)) {
    console.error(`❌ 文件已存在: ${filepath}`);
    return;
  }
  
  // 检查 ID 格式
  if (!/^[a-z0-9-]+$/.test(id)) {
    console.error('❌ ID 格式错误，只能使用小写字母、数字和连字符');
    return;
  }
  
  // 创建文章模板
  const template = `---
title: "${title}"
description: ${description}
date: ${today}
---

# ${title}

> ${description}

## 内容

开始写作...

---

**最后更新**: ${today}
`;

  fs.writeFileSync(filepath, template, 'utf-8');
  console.log(`✅ 创建文章: ${filepath}`);
  
  // 添加到 posts.json（插入到开头）
  const data = loadPosts();
  data.posts.unshift({
    id,
    title,
    description,
    date: today,
    category: '未分类',
    link: `/posts/${id}.html`,
    file: filename,
    tags: []
  });
  savePosts(data);
  console.log(`✅ 已添加到 posts.json`);
  
  console.log(`\n🎉 新文章创建完成！`);
  console.log(`标题: ${title}`);
  console.log(`文件: ${filepath}`);
  console.log(`链接: /posts/${id}.html`);
  console.log('\n💡 config.mjs 和 index.md 会自动读取新文章，无需额外操作');
}

// 列出所有文章
function listPosts() {
  const data = loadPosts();
  console.log('\n📚 文章列表:\n');
  data.posts
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .forEach((post, index) => {
      console.log(`${index + 1}. ${post.title}`);
      console.log(`   日期: ${post.date}`);
      console.log(`   链接: ${post.link}`);
      console.log(`   文件: posts/${post.file}`);
      console.log('');
    });
}

// 主函数
function main() {
  const [command, ...args] = process.argv.slice(2);
  
  switch (command) {
    case 'new':
      if (args.length < 3) {
        console.log('用法: node scripts/post.js new <id> <title> <description>');
        console.log('示例: node scripts/post.js new my-post "我的新文章" "文章简介"');
        process.exit(1);
      }
      createPost(args[0], args[1], args[2]);
      break;
      
    case 'list':
      listPosts();
      break;
      
    case 'help':
    default:
      console.log(`
博客文章管理脚本

用法:
  node scripts/post.js <command> [args]

命令:
  new <id> <title> <description>  创建新文章
  list                            列出所有文章
  help                            显示帮助

示例:
  node scripts/post.js new music-daily "xca's pick" "一个人的日常，一首歌的时间"

说明:
  - config.mjs 会自动从 posts.json 读取文章列表
  - index.md 会自动从 posts.json 读取文章列表
  - 只需运行此脚本创建文章，无需手动更新其他文件
`);
  }
}

main();
