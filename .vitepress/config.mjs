import { defineConfig } from 'vitepress'
import { readFileSync } from 'fs'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

const __dirname = dirname(fileURLToPath(import.meta.url))
const postsData = JSON.parse(readFileSync(join(__dirname, '../posts.json'), 'utf-8'))

// 从 posts.json 生成侧边栏
const postsSidebar = postsData.posts
  .sort((a, b) => new Date(b.date) - new Date(a.date))
  .map(post => ({
    text: post.title,
    link: post.link
  }))

export default defineConfig({
  lang: 'zh-CN',
  title: 'xca',
  description: 'xca 的个人博客 - 记录经验与生活',
  
  // 站点配置
  head: [
    ['link', { rel: 'icon', href: 'https://wangshuang12138-beep.github.io/assets/logo-xca-square.svg' }],
    ['meta', { name: 'theme-color', content: '#1a1a1a' }],
  ],

  // 主题配置
  themeConfig: {
    // Logo
    logo: 'https://wangshuang12138-beep.github.io/assets/logo-xca-square.svg',
    
    // 导航
    nav: [
      { text: '首页', link: '/' },
      { text: '文章', link: '/posts/' },
      { text: '关于', link: '/about' },
    ],

    // 文章侧边栏 - 自动从 posts.json 生成
    sidebar: {
      '/posts/': [
        {
          text: '文章列表',
          items: postsSidebar
        }
      ]
    },

    // 社交链接
    socialLinks: [
      { icon: 'github', link: 'https://github.com/wangshuang12138-beep' },
    ],

    // 页脚
    footer: {
      message: '用 VitePress 构建',
      copyright: '© 2026 xca'
    },

    // 搜索
    search: {
      provider: 'local'
    },

    // 大纲
    outline: {
      level: [2, 3],
      label: '目录'
    },

    // 编辑链接
    editLink: {
      pattern: 'https://github.com/wangshuang12138-beep/xca-blog/edit/main/:path',
      text: '在 GitHub 上编辑'
    },

    // 最后更新时间
    lastUpdated: {
      text: '最后更新',
      formatOptions: {
        dateStyle: 'short',
        timeStyle: 'short'
      }
    },

    // 文档页脚
    docFooter: {
      prev: '上一篇',
      next: '下一篇'
    },

    // 返回顶部
    returnToTopLabel: '返回顶部',

    // 侧边栏菜单
    sidebarMenuLabel: '菜单',

    // 深色模式
    darkModeSwitchLabel: '主题'
  },

  // Markdown 配置
  markdown: {
    lineNumbers: true,
    config: (md) => {
      // 可以在这里添加 markdown-it 插件
    }
  },

  // 构建配置
  cleanUrls: true,
  
  // 部署配置（GitHub Pages）
  base: '/xca-blog/',
  
  // 忽略死链
  ignoreDeadLinks: true,

  // 最后更新时间
  lastUpdated: true,

  // Vue 配置
  vue: {
    template: {
      compilerOptions: {
        // Vue 编译器选项
      }
    }
  }
})
