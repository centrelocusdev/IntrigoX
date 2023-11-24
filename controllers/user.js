const User = require("../models/User");
const fs = require("fs");
const path = require("path");
const AVATAR_PATH = path.join("/public/image");

const updateUserLevel = async (req, res) => {
  try {
    const user = req.user;
    const level = req.body.level;
    if (!user || !level) {
      throw new Error("verification failed!");
    }
    const updatedUser = await User.updateOne(
      { _id: user._id },
      {
        $set: {
          level: level,
        },
      }
    );
    res.status(200).json({
      status: "success",
      message: "Level has been updaed successfully!",
    });
  } catch (err) {
    res.status(400).send({ status: "error", message: err.message });
  }
};

const updateUserProfilePicture = async (req, res) => {
  const user = req.user;
  // const id = "655e0bad7114b6000872cd0c";
  // console.log("in the file controller");
  // const user = await User.findById({_id: id});
  // console.log(user);
  try {
    if (!user) {
      throw new Error("Authrization failed!");
    }
    if (req.file) {
      if (user.avatar) {
        // console.log("in the user.avatar");
        // console.log(__dirname);
        // console.log(path.join(__dirname ,'..', '/public/image' , user.avatar));
        fs.unlinkSync(`./public/image/${user.avatar}`);
      }

      const updatedUser = await User.updateOne(
        { _id: user.id },
        {
          $set: {
            avatar: req.file.filename,
          },
        }
      );
      res.status(200).json({
        status: "success",
        message: "Profile Picture has been updated successfully!",
      });
      // console.log(updatedUser);
    }
  } catch (err) {
    res.status(400).send({ status: "error", message: err.message });
  }
};

const userData = async (req, res)=> {
    try{
        const user = req.user;
        if (!user) {
            throw new Error("Authrization failed!");
          }
          res.status(200).json({
            status: "success",
            data: user
          });

    }catch (err) {
    res.status(400).send({ status: "error", message: err.message });
  }
}

module.exports = { updateUserLevel, updateUserProfilePicture, userData };
