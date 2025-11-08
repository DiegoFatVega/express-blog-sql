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
//app.use('/blogs', blogsRouter);