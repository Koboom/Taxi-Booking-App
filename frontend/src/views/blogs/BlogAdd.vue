<script>
import { useCounterStore } from '@/stores/counter';
import { mapActions } from 'pinia';
import { marked } from "marked"

export default {
    data() {
        return {
            blogs: [],
            blog: {
                title: "",
                slug: "",
                content: "",
                excerpt: "",
                author: "",
                tags: [],
                coverImage: "",
                seo: {
                    title: "",
                    description: "",
                    keywords: [],
                },
                status: "",
                wiews: 0,
                comments: [],
                publishedAt: null,

            }
        }
    },
    async mounted() {
        await this.updateBlogs()
    },
    methods: {
        ...mapActions(useCounterStore, ["fetchBlogs", "addBlog"]),
        async updateBlogs() {
            this.blogs = await this.fetchBlogs()
        },
        handleImageUpload(event) {
            const file = event.target.files[0];
            const supportedTypes = ['image/svg+xml', 'image/png', 'image/jpeg', 'image/jpg', 'image/webp'];
            const maxSizeInMb= 5
            const maxSizeInBytes = maxSizeInMb * 1024 * 1024;

            if (file) {
              console.log('File selected:', file);
              console.log('File type:', file.type);
            }

            if (file && supportedTypes.includes(file.type)) {
              if (file.size > maxSizeInBytes) {
                alert(`File size should not exceed ${maxSizeInMb}`)
                return
              }

              const reader = new FileReader();
              reader.onload = (e) => {
                this.blog.coverImage = e.target.result;
                console.log(" File loaded successfully:",this.blog.coverImage);
              };
              reader.onerror = () => {
                alert("There was an error reading the file. Please try again.");
              };
              reader.readAsDataURL(file);
              this.coverImage = file;
            } else {
              alert("Please select an image file (.svg, .png, .jpeg, .jpg, .webp).");
            }
        },
        async submitBlogform() {
            try {
                await this.addBlog(this.blog)
                alert("Blog added successfully")
                this.blogs.push({...this.blog})
                await this.updateBlogs()
                this.resetBlogForm()
            } catch (error) {
                console.error(error)
            }
        },
        resetBlogForm() {
            this.blog = {
                title: "",
                slug: "",
                content: "",
                excerpt: "",
                author: "",
                tags: [],
                coverImage: "",
                seo: {
                    title: "",
                    description: "",
                    keywords: [],
                },
                status: "",
                wiews: 0,
                comments: [],
                publishedAt: null,
            }
        },
        formatContent(content) {
          return marked(content)
        }
    }
}
</script>
<template>
    <div class="w3-container w3-hide-small w3-hide-medium w3-border w3-border-green w3-round-large w3-light-grey w3-round">
        <p>{{ blogs.length }}</p>
        <h2>Add New Blog</h2>
        <div style="white-space: pre-line;">
          <!-- <p style="white-space: pre-line">
            {{ blog.content }}
          </p> -->
          {{ blog.content }}
        </div>

        <form @submit.prevent="submitBlogform" class="w3-form">
            <!-- Title -->
             <div>
               <!-- <label for="title">Title</label> -->
               <input type="text" id="title" v-model="blog.title" required class="w3-input w3-border w3-round-large" placeholder="Title">
             </div>
             <div>
               <!-- <label for="author">Author</label> -->
               <input type="text" id="author" v-model="blog.author" required class="w3-input w3-border w3-round-large" placeholder="Author">
             </div>
             <div>
                <!-- <label for="slug">Slug</label> -->
                <input type="text" id="slug" v-model="blog.slug" required class="w3-input w3-border w3-round-large" placeholder="Slug">
             </div>
              <!-- Image Upload -->
              <div>
                <input type="file" name="" id="image" class="w3-input w3-border w3-round-large" @change="handleImageUpload" accept="image/*" >
              </div>
             <!--Description-->
            <div>
              <label for="content">Content</label>
              <!-- <input type="text" id="content" v-model="blog.content" required class="w3-input w3-border w3-round-large" placeholder="Description"> -->
              <textarea name="content" id="content" v-model="blog.content" class="w3-input w3-border w3-round-large" placeholder="Content..."></textarea>
            </div>

            <div>
              <label for="excerpt">Excerpt</label>
              <textarea name="excerpt" id="excerpt" v-model="blog.excerpt" class="w3-input w3-border w3-round-large" placeholder="Excerpt cannot exceed 300 characters"></textarea>
            </div>

            <div>
              <label for="tags">Tags</label>
              <input type="text" id="tags" v-model="blog.tags" class="w3-input w3-border w3-round-large" placeholder="Tags">
            </div>
            <!-- Seo -->
            <div>
              <label for="seoTitle">SEO Title</label>
              <input type="text" id="seoTitle" v-model="blog.seo.title" class="w3-input w3-border w3-round-large" placeholder="SEO Title">
            </div>
            <div>
              <input type="text" id="seoDescription" v-model="blog.seo.description" class="w3-input w3-border w3-round-large" placeholder="SEO Description">
            </div>
            <div>
              <input type="text" id="seoKeywords" v-model="blog.seo.keywords" class="w3-input w3-border w3-round-large" placeholder="SEO Keywords">
            </div>
            <div>
              <label for="status">Status</label>
              <select name="status" id="status" v-model="blog.status" required class="w3-select w3-border w3-round-large">
                <option value="" disabled selected>Select Status</option>
                <option value="draft">Draft</option>
                <option value="published">Published</option>
                <option value="archived">Archived</option>
              </select>
            </div>

             <!--Submit Button-->
            <p>
              <button type="submit" class="w3-button w3-green w3-round-large">Submit</button>
            </p>

        </form>
    </div>
</template>
<style></style>