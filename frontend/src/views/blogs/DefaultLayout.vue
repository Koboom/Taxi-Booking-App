<template>
  <div>
    <router-view />
  </div>
</template>

  <script>
  export default {
    head() {
    return {
      title: this.documentTitle,
      meta: [
          { name: 'description', content: this.metaDescription },
          { name: 'keywords', content: this.metaKeywords }
        ]
      }
    },
    computed: {
      documentTitle() {
        // Logic to dynamically generate the page title
        // (e.g., using route meta, store state, etc.)
        return this.$route.meta.title || 'Default Page Title';
      },
      metaDescription() {
        // Logic to dynamically generate the meta description
        return this.$route.meta.description || 'Default Page Description';
      },
      metaKeywords() {
        // Logic to dynamically generate the meta keywords
        return this.$route.meta.keywords || 'Default Keywords';
      }
    }
  }
  </script>