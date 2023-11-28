const fetch = require("node-fetch");
var AWS = require("aws-sdk");
const {
  Chapter,
  Paragraph,
  Question,
  ObstacleQuestion,
} = require("../models/chapter");
const Bonus = require("../models/bonus");
const {
  chapterData,
  ParagraphsData,
  Question1Data,
  Question2Data,
  ObstacleQuestionsData,
} = require("../data");
const util = require("util");

exports.languageConvert = async (req, res) => {
  try {
    AWS.config.update({
      credentials: {
        accessKeyId: process.env.ACCESS_KEY,
        secretAccessKey: process.env.SECRET_ACCESS_KEY,
      },
      region: process.env.REGION,
    });
    var translate = new AWS.Translate();

    var params = {
      SourceLanguageCode: "auto",
      TargetLanguageCode: "es",
      Text: "Hello! My name is Fernando.",
    };

    translate.translateText(params, function (err, data) {
      if (err) console.log(err, err.stack);
      else console.log(data["TranslatedText"]);
    });

    res.send("success");
  } catch (err) {
    console.log(err.message);
    res.send("error");
  }
};

exports.getChaptersData = async (req, res) => {
  try {
    const getChapter = await Chapter.find({});
    const newChapter = util.inspect(getChapter, {
      depth: null,
      compact: false,
      colors: true,
    });
    console.log(newChapter[0]);
    console.log(newChapter.length);
    res.send(getChapter);
  } catch (err) {
    res.status(400).json({ status: "Error", message: err.message });
  }
};
exports.storeChaptersData = async (req, res) => {
  try {
    const Question1 = new Question(Question1Data);
    await Question1.save();
    const Question2 = new Question(Question2Data);
    await Question2.save();

    const ObstacleQuestion1 = new ObstacleQuestion(ObstacleQuestionsData[0]);
    await ObstacleQuestion1.save();
    const ObstacleQuestion2 = new ObstacleQuestion(ObstacleQuestionsData[1]);
    await ObstacleQuestion2.save();
    const ObstacleQuestion3 = new ObstacleQuestion(ObstacleQuestionsData[2]);
    await ObstacleQuestion3.save();

    let CollectionOfNewPara = [];
    let NewParagraph;
    for (let i = 0; i < ParagraphsData.length; i++) {
      NewParagraph = new Paragraph(ParagraphsData[i]);
      console.log(NewParagraph.type);
      if (NewParagraph.type === "assesment") {
        NewParagraph.questions.push(Question1);
        NewParagraph.questions.push(Question2);
      }

      if (NewParagraph.type === "obstacle") {
        NewParagraph.obstacle_questions.push(ObstacleQuestion1);
        NewParagraph.obstacle_questions.push(ObstacleQuestion2);
        NewParagraph.obstacle_questions.push(ObstacleQuestion3);
      }
      await NewParagraph.save();
      CollectionOfNewPara.push(NewParagraph);
    }
    console.log(NewParagraph);
    const newChapter = new Chapter(chapterData);
    await newChapter.save();

    for (let i = 0; i < CollectionOfNewPara.length; i++) {
      newChapter.paragraphs.push(CollectionOfNewPara[i]);
    }
    await newChapter.save();
    console.log(newChapter);
    res.send("success");
  } catch (err) {
    res.send(err.message);
  }
};

exports.saveBonusData = async (req, res) => {
  try {
    const bonusesData = [
      {
        bonus: "Bronze",
        targetScore: 20
      },
      {
        bonus: "Silver",
        targetScore: 40
      },
      {
        bonus: "Gold",
        targetScore: 60
      },
      {
        bonus: "Platinum",
        targetScore: 80
      }
    ]
    for(let i = 0;i<bonusesData.length;i++){
      const newBonuses = new Bonus(bonusesData[i]);
      await newBonuses.save();
    }

    res.send("success");
   

  } catch (err) {
    res.status(400).json({
      status: "Error",
      message: err.message,
    });
  }
};
