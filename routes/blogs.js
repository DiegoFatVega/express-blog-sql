const express = require('express');
const router = express.Router();

const blogController = require(`../controllers/blogController`);

//API routes: index
router.get('/', blogController.index)

//Route Destroy
router.delete('/:id', blogController.destroy)

module.exports = router;