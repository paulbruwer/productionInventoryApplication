const Users = require("../models/users");

exports.matchPassword = async (req, res, next) => {
    try {
        console.log('fetching');
        const result = await Users.find({username:req.body.username});
        if (result[0].password === req.body.password) {
            req.permissions = result[0].permissions
            next()
        }else{
            res.json({message:"Incorrect username or password"});
        }
    } catch (error) {
        res.json({message:"Incorrect username or password"});
    }
};

