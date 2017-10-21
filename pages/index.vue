<template>
</template>

<script>
export default {
  components: { },
  layout: ({ isMobile }) => isMobile ? 'mobile/content-types/mainpage' : 'desktop/content-types/mainpage'
}
</script>
