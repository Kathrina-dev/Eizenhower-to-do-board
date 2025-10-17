const express = require ("express");
const bcrypt = require ("bcrypt")
const prisma = require("../prisma/prisma");

const router = express.Router();

router.route("/")
    .get (async(req, res) => {
        try{
            const allUsers = await prisma.user.findMany({});   
            return res.json(allUsers);
        }catch(err){
            return res.json({error: err});
        }    
    })

router.route("/signup")
    .post (async(req, res) => {
        try{
            const saltRounds = 10;
            const user = req.body.username;
            const pwd = await bcrypt.hash(req.body.password, saltRounds); 
        
            const newUser = await prisma.user.create({ 
                data:{
                    password: pwd,
                    username: user,
                }
            });
            return res.json(newUser);
        } catch(err){
            return res.json({error: err});
        }
    })

router.route("/login")
    .post(async(req,res) => {
        try{
            const loginUser = await prisma.user.findUnique({
                where:
                {username: req.body.username}});
                const loginPwd = req.body.password

            if (!loginUser) {
                return res.status(404).json({ error: "User not found" });
            }

            const validPwd = await bcrypt.compare(loginPwd, loginUser.password);
            if (!validPwd) {
                return res.status(401).json({ error: "Incorrect password" });
            }

            // Successful login
            return res.json({ msg: "Login successful", user: loginUser, id: loginUser.id });

        } catch(err){
            console.error(err);
            return res.status(500).json({ error: err.message });
        }
    })

module.exports = router