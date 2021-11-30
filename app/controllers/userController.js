
const bcrypt = require('bcrypt');

const jwt = require('jsonwebtoken');

const User = require("../models/User");


const userController =  ()=>{

    //const get = async (req,res)=>{
    //    const id = req.params.id;
     //   let userData = await User.findAll({where:{id}});
     //    res.json({users:userData});
     //}

    const getAll = async (req,res)=>{
        let data = await User.findAll({attributes:['id','name','email']});
        res.json({users:data})
    }

    const uniqUser = async (req,res)=>{
        let id = req.params.id; 
        let uniq = await User.findOne({attributes:['id','name','email'],where:{id}});
        res.json({user:uniq})


    }


    const add = async (req,res)=>{
        let {name,email,password} = req.body;
        let isUserExist = await User.count({where:{email}});

        if (isUserExist>0){
            res.json({message:"User alredy exits!"});
        }else if (password.length < 6){
            res.json({message:"Password must be at least 6 characters"});
        }else{
             password = await bcrypt.hash(password, 10);
            let uc = await User.create({name,email,password});
            res.json( {id:uc.id,name,email});

        }
    }

   

    const remove = async (req,res)=>{
        let id = req.params.id;
        if(id != req.token.id){
            res.json({message:"User can't delete other user"});
        }
        await User.destroy({where:{id}});
        res.json({message:"User delete successful"});
    };

    const update = async (req,res)=>{
        const {name,email} = req.body;
        const {id} = req.params;
        if(id != req.token.id){
            res.json({message:"User can't delete other user"});
        }
        await User.update({name,email}, {where:{id}});
        res.json({message:"user successfully updated"});

    }

    const userLogin = async (req,res)=>{
        const {email,password} = req.body;
        const userData = await User.findOne({where: {email}});
      
        if (!userData) {
            
            res.json({message:"Invalid user"});

        }else{

            //const isPasswordMatch = bcrypt.compare(password,udt.password ,function(err,result) {
              //  if (result){
                //    return true;
                //}else{
                //    return false;
               // }
            //});

            const isPasswordMatch = await  bcrypt.compare(password, userData.password);
            console.log(isPasswordMatch)
            if (isPasswordMatch === true) {
                const payLoad = { id:userData.id,email: userData.email,name: userData.name};
                const token = jwt.sign(payLoad, "huwbegopwr89nbvjei90");
                res.json({ token });
              } else {
                
                res.json({message:"Invalid password"});
              }
        }
    }

    

    return  {add,getAll,remove,update,uniqUser,userLogin};
}

module.exports = userController;