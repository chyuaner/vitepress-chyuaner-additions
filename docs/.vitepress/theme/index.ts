import { Theme } from 'vitepress'
import DefaultTheme from 'vitepress/theme'

// 1. 引入剛剛包裝好的本地套件與轉場 CSS
import { useThemeTransitions } from 'vitepress-page-transitions'
import 'vitepress-page-transitions/style.css'
import { useSidebarScrollTracker } from 'vitepress-sidebar-anchor'

// 2. 引入本站自訂 CSS 樣式
import './custom.css'

export default {
  extends: DefaultTheme,
  setup() {
    // 3. 啟用套件
    useThemeTransitions()
    useSidebarScrollTracker()
  }
} satisfies Theme
