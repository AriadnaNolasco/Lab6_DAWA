import postService from "../services/postService.js";

class PostController {
    async create(req, res) {
        const { userId, title, content, hashtags, imageUrl } = req.body;
        const postData = {
            title,
            content,
            hashtags: hashtags ? hashtags.split(",").map(tag => tag.trim()) : [],
            imageUrl
        };
        await postService.createPost(userId, postData);
        res.redirect("/posts");
    } catch(error) {
        res.status(400).send(error.message);
    }

    async getAll(req, res) {
        try {
            const posts = await postService.getPosts();
            console.log(posts);
            res.render("posts/posts", { posts }); // Renderiza la vista posts/index.ejs
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    renderNewForm(req, res) {
        res.render("posts/new");
    }

    async renderEditForm(req, res) {
        try {
            const post = await postService.getPostById(req.params.id);
            res.render("posts/edit", { post });
        } catch (error) {
            res.status(404).send("Post no encontrado");
        }
    }

    async update(req, res) {
        try {
            const { title, content, hashtags, imageUrl } = req.body;
            const postData = {
                title,
                content,
                hashtags: hashtags ? hashtags.split(",").map(tag => tag.trim()) : [],
                imageUrl
            };
            await postService.updatePost(req.params.id, postData);
            res.redirect("/posts");
        } catch (error) {
            res.status(400).send(error.message);
        }
    }

    async delete(req, res) {
        try {
            await postService.deletePost(req.params.id);
            res.redirect("/posts");
        } catch (error) {
            res.status(500).send(error.message);
        }
    }
}

export default new PostController();
