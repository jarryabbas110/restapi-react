const express = require('express');
const router = express.Router();
const Post = require('../models/Post')


//get all the posts
router.get('/', async (req, res) => {
    try{
        const posts = await Post.find();
        res.json(posts);
    }catch(err){
        res.json({message: err})
    }
});


router.post('/', async (req,res) => {
    const post = new Post({
        title: req.body.title,
        description: req.body.description
    });
    try{
    const savedpost = await post.save()
    res.json(savedpost);
    }catch(err){
        res.json({message: err})
    }
});

//get specific post

router.get('/:postId', async (req, res) => {
    try{
    const post = await Post.findById(req.params.postId)
    res.json(post);
    }catch(err){
        res.json({message: err});
    }

})

//delete

router.delete('/:postId', async (req, res) => {
    try{
        const postDelete = await Post.remove({ _id: req.params.postId})
        res.json(postDelete);
    }catch(err){
        res.json({message: err});
    }
})

router.patch('/:postId', async (req,res) => {
    try{
        const updatingPost = await Post.updateOne({ _id: req.params.postId}, {$set: {title: req.body.title}})
        res.json(updatingPost);
    }catch(err){
        res.json({message: err});
    }
})

module.exports = router;