import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "元兒～的VitePress添加包",
  description: "以原版VitePress 2.0為基礎，有額外做一些動畫效果、Sidebar擴充等通用性質的添加處理",
  themeConfig: {

    // 通用部分
    lastUpdated: true,

    outline: {
      label: '目錄'
    },

    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      { text: '使用說明', link: '/intro', activeMatch: '^/(?!examples/|$)'  },
      { text: 'Examples', link: '/examples/markdown-examples', activeMatch: '/examples/' }
    ],

    sidebar: [
      { text: '簡介', link: '/intro' },
      {
        text: 'Packages',
        items: [
          { text: 'vitepress-page-transitions', link: '/vitepress-page-transitions' },
          { text: 'vitepress-sidebar-anchor', link: '/vitepress-sidebar-anchor' },
        ]
      },
      {
        text: '測試用範例',
        items: [
          {
            text: 'Markdown Examples', link: '/examples/markdown-examples',
            items: [
              { text: 'Syntax Highlighting', link: '/examples/markdown-examples#syntax-highlighting' },
              { text: 'Custom Containers', link: '/examples/markdown-examples#custom-containers' },
              { text: 'More', link: '/examples/markdown-examples#more' },

            ]
          },
          { text: 'Runtime API Examples', link: '/examples/api-examples' }
        ]
      },

      {
        text: 'VitePress常用Tips',
        items: [
          { text: 'Config', link: '/tips/config' },
          { text: 'Markdown語法', link: '/tips/markdown' },
          { text: 'Github Actions', link: '/tips/gh-actions' },
        ]
      },
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/chyuaner/vitepress-chyuaner-additions' }
    ],

  }
})
