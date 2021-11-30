const bcrypt = require('bcrypt');

const jwt = require('jsonwebtoken');

const Post = require("../models/Post");

const userPosts = () =>{

    const addPost = async (req,res) =>{
       
            let {title,description} = req.body;
            let user_id = req.token.id;
            let uc = await Post.create({title,description,user_id});
            res.json({message:"Post added successfully."});

         }
        
    const getAllPosts = async (req, res) => {
        let postsData = await Post.findAll({});
        res.json({users:postsData})
    }

    const getPostById = async (req, res) => {
        const id = req.params.id;
        let pd = await Post.findOne({where:{id}})
    }

    const removePost = async (req,res)=>{
        let id = req.params.id;
        if(id != req.token.id){
            res.json({message:"User can't delete other user"});
        }
        await Post.destroy({where:{id}});
        res.json({message:"post deleted successfully"});
    };

    const updatePost = async (req,res)=>{
        const {title,description} = req.body;
        const {id} = req.params.id;
        if(id != req.token.id){
            res.json({message:"User can't update other user post"});
        }else{
            await Post.update({title,description}, {where:{id}});
            res.json({message:"post successfully updated"});
        }
    

    }
    

    return {addPost,getAllPosts,getPostById,removePost,updatePost};
}

module.exports = userPosts;

