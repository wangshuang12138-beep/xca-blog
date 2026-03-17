# 博客写作指南

本文档说明如何在 xca-blog 中新增和管理博客文章。

---

## 目录

- [快速开始](#快速开始)
- [架构说明](#架构说明)
- [命令行工具](#命令行工具)
- [手动操作](#手动操作)
- [将项目加入博客](#将项目加入博客)

---

## 快速开始

### 创建新文章（推荐）

```bash
cd /root/.openclaw/workspace/xca-blog

# 创建新文章
node scripts/post.js new article-id "文章标题" "文章描述"

# 示例
node scripts/post.js new music-daily "xca's pick - 每日音乐故事日记" "一个人的日常，一首歌的时间"
```

这会自动：
1. ✅ 创建 `posts/article-id.md` 文件
2. ✅ 添加到 `posts.json` 配置
3. ✅ **config.mjs 会自动读取 posts.json 更新侧边栏**（无需手动操作）
4. ✅ **index.md 会自动读取 posts.json 更新首页列表**（无需手动操作）

### 编辑文章

创建后直接在 `posts/` 目录下编辑对应的 `.md` 文件：

```bash
vim posts/article-id.md
```

### 提交发布

```bash
git add .
git commit -m "添加新文章: 文章标题"
git push
```

---

## 架构说明

### 自动同步机制

博客使用 `posts.json` 作为**单一数据源**：

```
posts.json (单一数据源)
    ├──→ .vitepress/config.mjs (自动读取 → 侧边栏)
    ├──→ index.md (自动读取 → 首页文章列表)
    └──→ posts/*.md (文章内容)
```

**关键点**：
- 只需维护 `posts.json`，侧边栏和首页自动同步
- 创建文章后无需手动修改 `config.mjs` 或 `index.md`

### 文件结构

```
xca-blog/
├── posts.json          # 文章配置（元数据）⭐ 单一数据源
├── posts.data.js       # VitePress 数据加载器
├── posts/              # 博客文章目录
│   ├── music-daily.md
│   └── ...
├── .vitepress/
│   └── config.mjs      # 自动从 posts.json 读取
├── index.md            # 自动从 posts.json 读取
├── scripts/
│   └── post.js         # 文章管理脚本
└── WRITING_GUIDE.md    # 本文档
```

### posts.json 格式

```json
{
  "posts": [
    {
      "id": "music-daily",
      "title": "xca's pick - 每日音乐故事日记",
      "description": "一个人的日常，一首歌的时间...",
      "date": "2026-03-17",
      "category": "项目",
      "link": "/posts/music-daily",
      "file": "music-daily.md",
      "tags": ["music", "story"]
    }
  ]
}
```

### 字段说明

| 字段 | 说明 | 示例 |
|------|------|------|
| `id` | 唯一标识，用于 URL | `music-daily` |
| `title` | 文章标题 | `xca's pick` |
| `description` | 简短描述 | `一个人的日常...` |
| `date` | 发布日期 | `2026-03-17` |
| `category` | 分类 | `项目` / `笔记` |
| `link` | 文章链接 | `/posts/music-daily` |
| `file` | 文件名 | `music-daily.md` |
| `tags` | 标签数组 | `["music"]` |

---

## 命令行工具

### 查看所有命令

```bash
node scripts/post.js help
```

### 创建新文章

```bash
node scripts/post.js new <id> <title> <description>
```

**示例：**

```bash
node scripts/post.js new \
  my-project \
  "我的新项目" \
  "这是一个有趣的新项目介绍"
```

### 列出所有文章

```bash
node scripts/post.js list
```

---

## 手动操作

如果不想使用脚本，可以手动操作：

### 1. 创建文章文件

在 `posts/` 目录下创建 `.md` 文件：

```markdown
---
title: "文章标题"
description: 文章描述
date: 2026-03-17
---

# 文章标题

文章内容...

---

**最后更新**: 2026-03-17
```

### 2. 添加到 posts.json

```json
{
  "posts": [
    {
      "id": "article-id",
      "title": "文章标题",
      "description": "文章描述",
      "date": "2026-03-17",
      "category": "项目",
      "link": "/posts/article-id",
      "file": "article-id.md",
      "tags": []
    }
  ]
}
```

**注意**：添加后 config.mjs 和 index.md 会自动更新，无需手动修改。

---

## 将项目加入博客

### 标准流程

假设你要将 `my-project` 项目加入博客：

**Step 1: 准备项目信息**

收集以下信息：
- 项目名称
- 一句话描述
- 技术栈
- 访问地址
- 截图（可选）

**Step 2: 创建博客文章**

```bash
node scripts/post.js new \
  my-project \
  "My Project - 项目副标题" \
  "这是一个简洁有力的项目描述"
```

**Step 3: 完善文章内容**

编辑 `posts/my-project.md`，建议包含：

```markdown
---
title: "My Project - 项目副标题"
description: 项目描述
date: 2026-03-17
---

# My Project - 项目副标题

> 项目的一句话介绍

## 项目介绍

详细描述项目是什么、解决了什么问题。

## 设计理念

- **核心特性1**: 说明
- **核心特性2**: 说明

## 技术实现

| 项目 | 技术栈 |
|------|--------|
| 前端 | React / Vue |
| 部署 | GitHub Pages |

## 访问地址

🔗 [https://username.github.io/my-project/](https://username.github.io/my-project/)

---

**最后更新**: 2026-03-17
```

**Step 4: 提交并推送**

```bash
git add .
git commit -m "添加项目: My Project"
git push
```

---

## 注意事项

1. **id 格式**: 使用小写字母、数字和连字符，如 `my-project-name`
2. **日期格式**: 统一使用 `YYYY-MM-DD` 格式
3. **自动同步**: 只需修改 `posts.json`，其他文件会自动更新
4. **本地预览**: 运行 `npm run dev` 查看效果

---

## 故障排查

### 侧边栏没有显示新文章

检查 `posts.json` 格式是否正确，确保是有效的 JSON。

### 文章页面 404

检查 `posts.json` 中的 `link` 字段是否正确，以及 `posts/` 目录下是否有对应的 `.md` 文件。

---

*最后更新: 2026-03-17*
