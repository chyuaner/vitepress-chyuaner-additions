import { nextTick, provide } from 'vue'
import { useRouter, useData } from 'vitepress'

export function useThemeTransitions() {
  if (typeof window === 'undefined') return

  const router = useRouter()
  const { isDark } = useData()

  // 1. 深淺色模式切換圓形動畫
  provide('toggle-appearance', async ({ clientX: x, clientY: y }) => {
    const isAppearanceTransition = document.startViewTransition
      && !window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (!isAppearanceTransition) {
      isDark.value = !isDark.value
      return
    }

    const clipPath = [
      `circle(0px at ${x}px ${y}px)`,
      `circle(${Math.hypot(
        Math.max(x, innerWidth - x),
        Math.max(y, innerHeight - y)
      )}px at ${x}px ${y}px)`
    ]

    document.documentElement.classList.add('theme-appearance-transition')

    try {
      await document.startViewTransition(async () => {
        isDark.value = !isDark.value
        await nextTick()
      }).ready

      await document.documentElement.animate(
        { clipPath: isDark.value ? clipPath.reverse() : clipPath },
        {
          duration: 300,
          easing: 'ease-in',
          fill: 'forwards',
          pseudoElement: `::view-transition-${isDark.value ? 'old' : 'new'}(root)`
        }
      ).finished
    } finally {
      document.documentElement.classList.remove('theme-appearance-transition')
    }
  })

  // 2. 路由頁面切換動畫
  let isTransitioning = false
  const normalizePath = (path) => {
    return decodeURIComponent(path.split('#')[0].split('?')[0])
      .replace(/\/$/, '')
      .replace(/\.html$/, '')
  }

  router.onBeforeRouteChange = (to) => {
    if (isTransitioning) return true
    if (normalizePath(to) === normalizePath(window.location.pathname)) return true

    if (document.startViewTransition) {
      isTransitioning = true
      const hadSidebar = document.querySelector('.VPSidebar') !== null

      const transition = document.startViewTransition(async () => {
        try {
          await router.go(to)
          const hasSidebar = document.querySelector('.VPSidebar') !== null
          if (hadSidebar && hasSidebar) {
            document.documentElement.classList.add('transition-sidebar-fade')
          } else if (hadSidebar && !hasSidebar) {
            document.documentElement.classList.add('transition-sidebar-leave')
          } else if (!hadSidebar && hasSidebar) {
            document.documentElement.classList.add('transition-sidebar-enter')
          }
        } finally {
          isTransitioning = false
        }
      })

      if (transition && transition.finished) {
        transition.finished.then(() => {
          document.documentElement.classList.remove(
            'transition-sidebar-fade',
            'transition-sidebar-leave',
            'transition-sidebar-enter'
          )
        })
      }
      return false
    }
  }
}
