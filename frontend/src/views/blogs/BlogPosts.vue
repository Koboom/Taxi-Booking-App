<template>
    <div class="w3-container ">
      <div class="w3-center">
        <h1>{{ blog.title }}</h1>
        <img v-if="blog.coverImage" :src="blog.coverImage" style="width: 200px; " alt="" class="">
      </div>
      <div class="w3-row">
        <div class="w3-col l2">
          <p></p>
        </div>
        <div class="w3-col l8">
          <div v-html="blog.content" style="text-align: justify;"></div>
          <p> {{ blog.author }} {{ blog.createdAt }}</p>
        </div>
        <div class="w3-col l2">
          <p></p>
        </div>
      </div>
    </div>
  </template>

  <script>
  import { useCounterStore } from '@/stores/counter';
  import { mapActions } from 'pinia';

  export default {
    name: "BlogPosts",
    data() {
      return {
        blog: {
          content: ""
        }
      }
    },
    async mounted() {
      await this.updateBlog()
    },
    methods: {
      ...mapActions(useCounterStore, ["fetchBlog"]),
      async updateBlog() {
        try {
          this.blog = await this.fetchBlog(this.$route.params.blogId)
        } catch (error) {
          console.error("Error fetching blog: ", error)
          this.error = "Error fetching blog: " + (error.message || "Unknow error")
        }
      },
    }
  }
  </script>

  <style scoped>
  p {
    text-indent: 4em;
    color: black;
  }
  </style>