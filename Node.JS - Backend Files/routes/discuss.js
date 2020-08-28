const express=require('express');
const router=new express.Router();

const discussController=require('../controllers/discuss');

router.post('/discussAdd',discussController.discussionAddPost);

router.post('/initialDiscussCreate',discussController.initialDiscussCreate);

router.post('/getAllMessages',discussController.getAllMessages);

module.exports=router;