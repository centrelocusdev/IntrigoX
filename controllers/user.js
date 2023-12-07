const User = require("../models/User");
const fs = require("fs");
const path = require("path");
const AVATAR_PATH = path.join("/public/image");
const AWS = require('aws-sdk');
const Bonus = require("../models/bonus");

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

const s3 = new AWS.S3({
  credentials: {
      accessKeyId: process.env.ACCESS_KEY,
      secretAccessKey: process.env.SECRET_ACCESS_KEY
  },
  region: process.env.REGION
})

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
        fs.unlinkSync(path.join(__dirname, '..' ,`/public/image/${user.avatar}`));
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
const updateUserProfileWithS3 = async(req,res)=> {
  try{
    // console.log(req.file);
    let user = req.user;
    if(!user){
      throw new Error("Authorization failed!");
    }

    if(!req.file.originalname){
      throw new Error('file is not present');
    }
// console.log(1);
  const updatedUser = await User.updateOne(
    { _id: user.id },
    {
      $set: {
        avatar: req.file.originalname
      },
    }
  );
 
  user = await User.findById({_id: user._id});

  let output;
  s3.listObjects({Bucket: process.env.BUCKET_PROFILE_PICTURE})
  .promise()
  .then(data => {
    let baseurl = 'https://intrigox-userprofilepictures.s3.ap-south-1.amazonaws.com/'
    output = data.Contents.filter(e => {return e.Key === user.avatar}).map(e=> baseurl + e.Key);
    if(output.length<=0){
      throw new Error("Image not found!");
    }
    res.status(200).json({
      status: "success",
      message: "Image has been updated successfully!",
      data: user,
      image: output
    });        
    })

  // console.log(req.files);
  
    // res.status(200).json({
    //   status: "success",
    //   message: "Image has been updated successfully!"
    // })

  }catch (err) {
    res.status(400).send({ status: "error", message: err.message });
  }
}



const userData = async (req, res)=> {
    try{
        const user = req.user;
        if (!user) {
            throw new Error("Authrization failed!");
          }
          if(user.authType === 'Email'){
            let output;
            s3.listObjects({Bucket: process.env.BUCKET_PROFILE_PICTURE})
            .promise()
            .then(data => {
              let baseurl = 'https://intrigox-userprofilepictures.s3.ap-south-1.amazonaws.com/'
              output = data.Contents.filter(e => {return e.Key === user.avatar}).map(e=> baseurl + e.Key);
              if(output.length<=0){
                throw new Error("Image not found!");
              }
              res.status(200).json({
                status: "success",
                data: user,
                image: output
              });
              })
          }else if(user.authType === 'Google');{
            res.status(200).json({
              status: "success",
              data: user,
              image: user.avatar
            });  
          }
          
         

    }catch (err) {
    res.status(400).send({ status: "error", message: err.message });
  }
}

const updateCumulativeScoreOrCurrentRunningScore = async (req, res)=> {
  try{
    const getCummulativeScore = req.body.cummulativeScore;
    const getCurrentRunningScore = req.body.currentRunningScore;
    const user = req.user;

    if(!user){
      throw new Erro('Authorization failed!');
    }

    if((getCummulativeScore === undefined || getCummulativeScore === null) && (getCurrentRunningScore === undefined || getCurrentRunningScore === null)){
      throw new Error('kindly provide any of the 2 scores!');
    }

    // Updatign Cummulative Score
    if(getCummulativeScore || getCummulativeScore === 0){
      const updatedUser = await User.updateOne({_id: user._id} , {
        $set: {
          cummulativeScore: getCummulativeScore
        }
      })
    }

    // Update Current RunningScore
    if(getCurrentRunningScore || getCurrentRunningScore === 0){
      const updatedUser = await User.updateOne({_id: user._id} , {
        $set: {
          currentScore: getCurrentRunningScore
        }
      })
    }

    // Check if the score of the user is valid for any new bonus if yes so add that bonus in user db
    const newUser = await User.findById({_id: user._id});
    const userCummulativeScore = newUser.cummulativeScore;

    const bonuses = await Bonus.find({});

    let validBonuses = bonuses.filter((bonus) => {
      return userCummulativeScore >= bonus.targetScore
    }).map((item) => {
      return item.bonus
    })

    for(let i = 0;i<validBonuses.length;i++){
      let isBonusPresent = false;
      for(let j = 0;j<newUser.bonuses.length;j++){
        if(validBonuses[i] === newUser.bonuses[j]){
          isBonusPresent = true;
        }
      }
      if(!isBonusPresent){
        newUser.bonuses.push(validBonuses[i]);
        await newUser.save();
      }
    }

    res.status(200).json({
      status: "success",
      message: "Score has been updated!"
    })

    

  }catch(err){
    res.status(400).json({
      status: "Error",
      message: err.message
    })
  }
}

module.exports = { updateUserLevel, updateUserProfilePicture, userData , updateUserProfileWithS3 , updateCumulativeScoreOrCurrentRunningScore };
