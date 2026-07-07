import { onMounted, watch } from 'vue'
import { useRoute } from 'vitepress'

export function useSidebarScrollTracker() {
  if (typeof window === 'undefined') return
  if (typeof IntersectionObserver === 'undefined') {
    console.warn('[vitepress-sidebar-anchor] IntersectionObserver is not supported in this browser.')
    return
  }

  const route = useRoute()
  let activeSidebarObserver = null

  const updateActiveSidebar = () => {
    if (activeSidebarObserver) {
      activeSidebarObserver.disconnect()
      activeSidebarObserver = null
    }

    setTimeout(() => {
      const sidebarLinks = document.querySelectorAll('.VPSidebarItem .VPLink')
      const currentPath = decodeURIComponent(window.location.pathname)
        .replace(/\/$/, '')
        .replace(/\.html$/, '')

      const hashLinks = []

      sidebarLinks.forEach((el) => {
        const href = el.getAttribute('href')
        if (!href || !href.includes('#')) return

        const [linkPath, hash] = href.split('#')
        const normalizedLinkPath = decodeURIComponent(linkPath)
          .replace(/\/$/, '')
          .replace(/\.html$/, '')

        if (normalizedLinkPath === currentPath || (normalizedLinkPath === '' && href.startsWith('#'))) {
          const target = document.getElementById(decodeURIComponent(hash))
          hashLinks.push({ el, hash, target })
        } else {
          const container = el.closest('.VPSidebarItem')
          container?.classList.remove('is-active')
          el.classList.remove('active')
        }
      })

      if (hashLinks.length === 0) return

      const observerOptions = {
        root: null,
        rootMargin: '0px 0px -80% 0px',
        threshold: 0
      }

      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const activeHash = entry.target.id
            
            hashLinks.forEach(({ el, hash }) => {
              const container = el.closest('.VPSidebarItem')
              if (decodeURIComponent(hash) === activeHash) {
                container?.classList.add('is-active')
                el.classList.add('active')
              } else {
                container?.classList.remove('is-active')
                el.classList.remove('active')
              }
            })
          }
        })
      }, observerOptions)

      activeSidebarObserver = observer

      hashLinks.forEach(item => {
        if (item.target) observer.observe(item.target)
      })

      const isAnyActive = hashLinks.some(({ el }) => el.classList.contains('active'))
      if (!isAnyActive && hashLinks.length > 0) {
         const firstContainer = hashLinks[0].el.closest('.VPSidebarItem')
         firstContainer?.classList.add('is-active')
         hashLinks[0].el.classList.add('active')
      }
    }, 300)
  }

  onMounted(updateActiveSidebar)
  watch(() => route.path, updateActiveSidebar)
}
