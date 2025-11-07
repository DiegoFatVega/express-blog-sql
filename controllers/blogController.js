function index(req, res) {

    const sql = 'SELECT * FROM POSTS';
    connection.query(sql, (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        console.log(err);
        console.log(results);
        res.json(results);
    })
}

module.exports = {
    index
}