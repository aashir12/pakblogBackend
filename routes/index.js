var express = require('express');
var router = express.Router();
const data = require('./users');

/* GET all data */
router.get('/', async function(req, res) {
  var allData = await data.find();
  res.json(allData);
});

/* POST delete data by ID */
router.post('/delete/:id', async (req, res) => {
  var id = req.params.id;

  try{
    var documentDel= await data.findByIdAndDelete(id);
    if(documentDel){
      res.json('Delete Success')
    }
    else{
      res.json('doc not found')
    }
  }
  catch(err){
    res.status(500).send(err)
  }
});

// Find Single Post

router.get('/single/:id', async (req, res) => {
  var id = req.params.id;

  try{
    var singleDoc= await data.findOne({_id:id});
    if(singleDoc){
      res.json(singleDoc)
    }
    else{
      res.json('doc not found')
    }
  }
  catch(err){
    res.status(500).send(err)
  }
});
// Find and Update Post

router.patch('/update/:id', async (req, res) => {
  var {id} = req.params;
  var {title,desc,content} = req.body;

  try{
    var updatePost= await data.findOneAndUpdate({_id:id},req.body,{new:true});
    if(updatePost){
      res.json(updatePost)
    }
    else{
      res.json('doc not found')
    }
  }
  catch(err){
    res.status(500).send(err)
  }
});




/* POST create new data */
router.post('/input', async (req, res) => {
  var { title, desc, content } = req.body;

  try {
    await data.create({
      title: title,
      desc: desc,
      content: content
    });

    res.json({ message: 'done' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
