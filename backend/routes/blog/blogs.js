const { blogService } = require("../../services")
const router = require("express").Router()

// GET /blog - Tüm blogları listele (filtreleme ve sıralama parametreleri eklenebilir)
router.get('/', async (req, res, next) => {
    try {
        const { page = 1, limit = 100, sort = {} } = req.query; // Sayfalama ve sıralama parametreleri
        const blogs = await blogService.load(page, limit, sort);
        res.send(blogs);
    } catch (error) {
        next(error);
    }
});

// Belirli bir blog ID'sine göre blog'u güncelleme endpoint'i (PUT)
router.put('/blogId', async (req, res) => {
    const blogId = req.params.blogId;
    const updatedBlogData = req.body;
    try {
        const result = await blogService.update(blogId, updatedBlogData)
        res.send(result)
    } catch (error) {
        res.status(500).send(`Error updating blog with ID ${blogId}: ${error.message}`);
    }
})

// POST /blog - Yeni öğe oluştur
router.post('/', async (req, res ) => {
    try {
        const blog = await blogService.insert(req.body);
        res.status(201).send(blog);
    } catch (error) {
        res.status(500).send(error.message)
    }
});

// GET /blogs/:blogId - ID'ye göre öğe getir
router.get('/:blogId', async (req, res, next) => {
    try {
        const blog = await blogService.find(req.params.blogId);
        if (!blog) {
            return res.status(404).send("Blog not found");
        }
        res.send(blog);
    } catch (error) {
        next(error);
    }
});

// PATCH /blogs/:blogId - Öğe bilgilerini güncelle
router.patch('/:blogId', async (req, res, next) => {
    try {
        const { blogId } = req.params;
        const updatedData = req.body

        await blogService.update(blogId, updatedData)
        res.status(200).send("Blog updated successfully")
    } catch (error) {
        next(error)
    }
});

// DELETE /blogs/:blogId - Öğeyi sil
router.delete('/:blogId', async (req, res, next) => {
    const blogId = req.params.itemId;
    try {
        const result = await blogService.removeBy('_id', blogId);
        res.send(result);
    } catch (error) {
        next(error);
    }
});


module.exports = router
