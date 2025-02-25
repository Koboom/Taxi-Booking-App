<script>
import { useCounterStore } from '@/stores/counter';
import { mapActions } from 'pinia';

export default {
    name: "Blog",
    data() {
        return {
            blogs: []
        }
    },
    async mounted() {
        await this.updateBlogs()
    },
    methods: {
        ...mapActions(useCounterStore, ["fetchBlogs"]),
        async updateBlogs() {
            try {
                this.blogs = await this.fetchBlogs()
            } catch (error) {
                alert("Blog konnten nicht aktualisier werden. Bitte versuchen Sie es spaeter noch einmal.")
            }
        }
    }
}
</script>
<template>
    <div class="w3-container">
        <h2>Blogs</h2>
        <p>Coming soon...</p>
        <ol class="">
            <li v-for="blog in blogs"
            :key="blogId"
            >
                <a class="w3-hover-text-red w3-text-black" :href="`/blogs/${blog._id}`">
                    {{ blog.title }}
                    <span class="w3-margin w3-text-red w3-hover-text-blue">
                        {{ blog.author }}
                    </span>
                    <span class="w3-margin w3-text-red w3-hover-text-blue">
                        {{ blog.createdAt }}
                    </span>
                    <span class="w3-margin w3-text-red w3-hover-text-blue">{{ blog.status }}</span>
                    <span class="w3-margin w3-text-red w3-hover-text-blue">{{ blog.seo.title }}</span>
                    <span class="w3-margin w3-text-red w3-hover-text-blue">{{ blog.seo.description }}</span>
                    <span class="w3-margin w3-text-red w3-hover-text-blue">{{ blog.seo.keywords[0] }}</span>
                </a>
            </li>
        </ol>
    </div>
</template>
<style></style>