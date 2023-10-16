const Blog = require('../models/blog');
const User = require('../models/user');

function getAllBlogs(req, res) {
    Blog.find()
        .then((blogs) => {
            res.status(200).json(blogs);
        })
        .catch((error) => {
            res.status(500).json({ error: error });
        });
}

function getAllBlogsOfUser(req, res) {
    const author = req.params.author;
    Blog.find({ author: author, isPublished: true })
        .then((blogs) => {
            res.status(200).json(blogs);
        })
        .catch((error) => {
            res.status(500).json({ error: error });
        });
}

function createBlog(req, res) {
    const blog = new Blog({
        category: req.body.category,
        title: req.body.title,
        subtitle: req.body.subtitle,
        content: req.body.content,
        conclusion: req.body.conclusion,
        thumbnail: req.body.thumbnail,
        tags: req.body.tags,
        author: req.body.author,
    });

    User.findById(blog.author)
        .then((user) => {
            if (!user) {
                return res.status(401).json({ error: { message: "This user is not registered" }});
            } else if (!user.verified) {
                return res.status(401).json({ error: { message: "Please verify your email first" }});
            } else {
                blog.save()
                    .then((result) => {
                        res.status(201).json({
                            message: "Blog created successfully",
                            createdBlog: result,
                        });
                    })
                    .catch((error) => {
                        res.status(500).json({ error: error });
                    });
            }
        })
        .catch((error) => {
            return res.status(500).json({ error: error });
        });
}


function publishBlog(req, res) {
    const id = req.params.id;
    Blog.findByIdAndUpdate(id, { isPublished: true })
        .then((result) => {
            res.status(200).json({
                message: "Blog published successfully",
            });
        })
        .catch((error) => {
            res.status(500).json({ error: error });
        });
}

function getAllPublishedBlogs(req, res) {
    Blog.find({ isPublished: true })
        .then((blogs) => {
            res.status(200).json(blogs);
        })
        .catch((error) => {
            res.status(500).json({ error: error });
        });
}

function getAllPublicBlogs(req, res) {
    Blog.find({ isPublished: true, reviewed: true })
        .then((blogs) => {
            res.status(200).json(blogs);
        })
        .catch((error) => {
            res.status(500).json({ error: error });
        });
}

function getBlogById(req, res) {
    const id = req.params.id;
    Blog.findById(id)
        .then((blog) => {
            if (blog) {
                res.status(200).json(blog);
            } else {
                res.status(404).json({ message: "Blog not found" });
            }
        })
        .catch((error) => {
            res.status(500).json({ error: error });
        });
}


function acceptBlog(req, res) {
    const id = req.params.id;
    Blog.findByIdAndUpdate(id, { reviewed: "true" })
        .then((result) => {
            res.status(200).json({
                message: "Blog accepted successfully",
            });
        })
        .catch((error) => {
            res.status(500).json({ error: error });
        });
}

function rejectBlog(req, res) {
    const id = req.params.id;
    Blog.findByIdAndUpdate(id, { reviewed: "rejected" })
        .then((result) => {
            res.status(200).json({
                message: "Blog rejected successfully",
            });
        })
        .catch((error) => {
            res.status(500).json({ error: error });
        });
}


module.exports = {
    getAllBlogs,
    getAllBlogsOfUser,
    createBlog,
    publishBlog,
    getAllPublishedBlogs,
    getBlogById,
    getAllPublicBlogs,
    acceptBlog,
    rejectBlog
};