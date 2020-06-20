
const algoliasearch = require('algoliasearch');
require('dotenv').config()
const client = algoliasearch(process.env.APP_KEY, process.env.ADMIN_KEY);
const index = client.initIndex(process.env.SEARCH_ONLY_KEY)
const router = require("express").Router();
//Function providing product search functionality 
router.get('/', (req, res, next) => {
  if (req.query.query) {
    index.search({
      query: req.query.query,
     
    }, (err, content) => {
      res.json({
        success: true,
        message: "Here is your search",
        status: 200,
        content: content,
        search_result: req.query.query
      });
    });
  }
});
module.exports = router;
