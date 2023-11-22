const User = require('../models/User');

const updateUserLevel = async(req, res)=> {
try{
    const user = req.user;
    const level = req.body.level;
    if(!user || !level){
        throw new Error ("verification failed!");
    }
    const updatedUser = await User.updateOne({_id: user._id} , {
        $set: {
            level: level
        }
    })
res.status(200).json({
    status: 200,
    message: "Level has been updaed successfully!"
})
}catch(err){
    res.status(400).send({ status: "error", message: err.message });}
}

module.exports = { updateUserLevel};
