const express = require('express');
const app = express();
const PORT = 3000;
const connection = require(`./database/connection`)

//const blogsRouter = require('./routes/blogs')

app.listen(PORT, () => {
    console.log(`Server is running on port http://localhost:${PORT}`)
})

app.get('/', (req, res) => {
    res.send('Welcome to my BLOG API');
})

app.get('/api/posts', (req, res) => {

    const sql = 'SELECT * FROM POSTS';
    connection.query(sql, (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        console.log(err);
        console.log(results);
        res.json(results);
    })

})

app.delete('/api/posts/:id', (req, res) => {
    const sql = 'DELETE FROM `blog_sql_exercise`.`posts` WHERE (`id` = ?);'
    const postId = Number(req.params.id);

    //console.log(sql, postId)

    connection.query(sql, [postId], (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        console.log(`Deleted post with id ${postId}`);
        return res.json(results.serverStatus)
    })
})

app.get('/api/posts/:id', (req, res) => {
    const sql = 'SELECT posts.id, posts.title, posts.content, posts.image, tags.label FROM posts JOIN post_tag ON post_tag.post_id = posts.id JOIN tags ON tags.id = post_tag.tag_id WHERE posts.id = ?;'
    /* const tagsSql = 'SELECT * FROM tags WHERE id = ?' */
    const blogId = Number(req.params.id);

    connection.query(sql, [blogId], (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        if (results.length === 0) {
            return res.status(404).json({ message: 'post not found' });
        }
        console.log(results)
        res.json(results);

        /* connection.query(tagsSql, [blogId], (tagsErr, tagsResults) => {
            if (tagsErr) return res.status(500).json({ error: tagsErr.meggage })
            const thisTag = { ...results[0], tagsResults };
            res.json(thisTag);

        }) */
    })

})




//app.use('/blogs', blogsRouter);