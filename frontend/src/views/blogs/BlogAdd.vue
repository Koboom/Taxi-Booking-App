<template>
  <div class="w3-container w3-hide-small w3-hide-medium w3-border w3-border-green w3-round-large w3-light-grey w3-round">
    <div class="w3-container">
      <p>{{ blogs.length }}</p>
    </div>
    <div class="w3-container w3-pale-green">
      <div id="quill-output" v-html="outputContent"></div>
    </div>
    <div class="w3-container w3-pale-blue">
      <div id="quill-output" v-html="blog.content"></div>
    </div>
    <form @submit.prevent="submitBlogform" class="w3-form">
      <div>
        <label for="title">Title</label>
        <input type="text" id="title" v-model="blog.title" required class="w3-input w3-border w3-round-large" placeholder="Title">
      </div>
      <div>
        <label for="author">Author</label>
        <input type="text" id="author" v-model="blog.author" required class="w3-input w3-border w3-round-large" placeholder="Author">
      </div>
      <div>
        <label for="slug">Slug</label>
        <input type="text" id="slug" v-model="blog.slug" required class="w3-input w3-border w3-round-large" placeholder="Slug">
      </div>
      <div>
        <input type="file" id="image" class="w3-input w3-border w3-round-large" @change="handleImageUpload" accept="image/*">
      </div>
      <div class="w3-container">
        <label for="content">Content</label>
        <div id="quill-editor"></div>
      </div>
      <div>
        <label for="excerpt">Excerpt</label>
        <textarea id="excerpt" v-model="blog.excerpt" class="w3-input w3-border w3-round-large" placeholder="Excerpt cannot exceed 300 characters"></textarea>
      </div>
      <div>
        <label for="tags">Tags</label>
        <input type="text" id="tags" v-model="blog.tags" class="w3-input w3-border w3-round-large" placeholder="Tags">
      </div>
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
        <select id="status" v-model="blog.status" required class="w3-select w3-border w3-round-large">
          <option value="" disabled selected>Select Status</option>
          <option value="draft">Draft</option>
          <option value="published">Published</option>
          <option value="archived">Archived</option>
        </select>
      </div>
      <p>
        <button type="submit" class="w3-button w3-green w3-round-large">Submit</button>
      </p>
    </form>
  </div>
</template>

<script>
import { useCounterStore } from '@/stores/counter';
import { mapActions } from 'pinia';
import Quill from 'quill';
import 'quill/dist/quill.core.css';
import 'quill/dist/quill.snow.css';

export default {
  data() {
    return {
      outputContent:"",
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
      },
      quill: null,
    };
  },
  async mounted() {
    await this.updateBlogs();
    this.quill = new Quill('#quill-editor', {
      modules: {
        toolbar: [
          ['bold', 'italic', 'underline', 'strike'],
          [{ 'header': [1, 2, 3, false] }],
          ['blockquote', 'code-block'],
          [{ 'list': 'ordered' }, { 'list': 'bullet' }],
          [{ 'script': 'sub' }, { 'script': 'super' }],
          [{ 'indent': '-1' }, { 'indent': '+1' }],
          [{ 'direction': 'rtl' }],
          [{ 'color': [] }, { 'background': [] }],
          [{ 'font': [] }],
          [{ 'align': [] }],
          ['link', 'image', 'video', 'formula'],
          ['clean'],
        ],
      },
      theme: 'snow',
    });

    this.quill.on('text-change', () => {
      this.blog.content = this.quill.root.innerHTML
      this.outputContent = this.quill.root.innerHTML
    });
  },
  methods: {
    ...mapActions(useCounterStore, ["fetchBlogs", "addBlog"]),
    async updateBlogs() {
      this.blogs = await this.fetchBlogs();
    },
    handleImageUpload(event) {
      const file = event.target.files[0];
      const supportedTypes = ['image/svg+xml', 'image/png', 'image/jpeg', 'image/jpg', 'image/webp'];
      const maxSizeInMb = 5;
      const maxSizeInBytes = maxSizeInMb * 1024 * 1024;

      if (file && supportedTypes.includes(file.type)) {
        if (file.size > maxSizeInBytes) {
          alert(`File size should not exceed ${maxSizeInMb}`);
          return;
        }

        const reader = new FileReader();
        reader.onload = (e) => {
          this.blog.coverImage = e.target.result;
        };
        reader.onerror = () => {
          alert("There was an error reading the file. Please try again.");
        };
        reader.readAsDataURL(file);
      } else if (file) {
        alert("Please select an image file (.svg, .png, .jpeg, .jpg, .webp).");
      }
    },
    async submitBlogform() {
      try {
        await this.addBlog(this.blog);
        alert("Blog added successfully");
        this.blogs.push({ ...this.blog });
        await this.updateBlogs();
        this.resetBlogForm();
      } catch (error) {
        console.error(error);
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
      };
    },
    renderHtml(deltaJson) {
      try {
        const delta = new Delta(JSON.parse(deltaJson));
        return renderHtml(delta);
      } catch (e) {
        console.error("Error rendering Delta JSON:", e);
        return "";
      }
    },
  },
};
</script>

<style scoped>
/* Stiller buraya */
</style>