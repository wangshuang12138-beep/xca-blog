# xca-blog

xca 的个人博客，使用 VitePress 构建。

## 在线访问

🔗 https://wangshuang12138-beep.github.io/xca-blog/

## 快速开始

### 创建新文章

```bash
# 使用脚本创建（推荐）
node scripts/post.js new article-id "文章标题" "文章描述"

# 示例
node scripts/post.js new my-post "我的新文章" "这是文章描述"
```

**特点**：
- ✅ 自动创建文章文件
- ✅ 自动更新 `posts.json`
- ✅ **侧边栏和首页列表自动同步**（无需手动操作）

### 编辑文章

```bash
vim posts/my-post.md
```

### 提交发布

```bash
git add .
git commit -m "添加文章: 我的新文章"
git push
```

## 本地开发

```bash
# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 构建
npm run build
```

## 目录结构

```
xca-blog/
├── posts.json          # 文章配置（元数据）⭐ 单一数据源
├── posts.data.js       # VitePress 数据加载器
├── posts/              # 博客文章
├── scripts/            # 辅助脚本
│   └── post.js         # 文章管理脚本
├── .vitepress/
│   └── config.mjs      # 自动从 posts.json 读取
├── index.md            # 自动从 posts.json 读取
├── WRITING_GUIDE.md    # 写作指南
└── ...
```

## 文章管理

### 列出所有文章

```bash
node scripts/post.js list
```

### 查看帮助

```bash
node scripts/post.js help
```

## 写作指南

详细指南请查看 [WRITING_GUIDE.md](./WRITING_GUIDE.md)

### 核心概念

博客使用 `posts.json` 作为**单一数据源**：

```
posts.json (单一数据源)
    ├──→ .vitepress/config.mjs (自动读取 → 侧边栏)
    └──→ index.md (自动读取 → 首页列表)
```

只需维护 `posts.json`，侧边栏和首页自动同步。

---

© 2026 xca
