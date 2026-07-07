---
head:
  - - meta
    - http-equiv: refresh
      content: 0;url=./markdown-examples
---

# 正在跳轉中...

如果您沒有被自動重新導向，請點選 [這裡](./markdown-examples)。

<script setup>
import { onMounted } from 'vue'
import { useRouter } from 'vitepress'

const router = useRouter()

onMounted(() => {
  router.go('./markdown-examples')
})
</script>
