const Blog = require("../../models/blog/blog")
const BaseService = require("../base-service")

class BlogService extends BaseService {
    async findBlogById(blogId) {
        return this.findById(blogId)
    }
}

module.exports = new BlogService(Blog)
