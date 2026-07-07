import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "元兒～的VitePress添加包",
  description: "以原版VitePress 2.0為基礎，有額外做一些動畫效果、Sidebar擴充等通用性質的添加處理",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      { text: '使用說明', link: '/intro', activeMatch: '^/(?!examples/|$)'  },
      { text: 'Examples', link: '/examples/markdown-examples', activeMatch: '/examples/' }
    ],

    sidebar: [
      {
        items: [
          { text: '簡介', link: '/intro' },
          { text: 'vitepress-page-transitions', link: '/vitepress-page-transitions' },
          { text: 'vitepress-sidebar-anchor', link: '/vitepress-sidebar-anchor' },
        ]
      },
      {
        text: 'VitePress 測試用範例',
        items: [
          { text: 'Markdown Examples', link: '/examples/markdown-examples' },
          { text: 'Runtime API Examples', link: '/examples/api-examples' }
        ]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/vuejs/vitepress' }
    ]
  }
})
