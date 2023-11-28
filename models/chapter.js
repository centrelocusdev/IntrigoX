const mongoose = require('mongoose');
const obstacleQuestionSchema= new mongoose.Schema({
 que: {
  type: String
 },
 ans: {
  type: String
 }
})
const questionSchema = new mongoose.Schema({
  text: {
    spanish: String,
    japaneese: String,
    chineese: String,
    portuguese: String,
    arabic: String,
    english: String,
  },
  audio: {
    spanish: String,
    japaneese: String,
    chineese: String,
    portuguese: String,
    arabic: String,
    english: String,
  },
});

const paragraphSchema = new mongoose.Schema({
  type: String,
  para: String,
  pronounciationLessonAudio: String,  // This is present in one of the paragraphs
  questions: [questionSchema],
  obstacle_questions: [obstacleQuestionSchema],
  life_points: Number
});

const chapterSchema = new mongoose.Schema({
  name: String,
  paragraphs: [paragraphSchema],
});

const Chapter = mongoose.model('Chapter', chapterSchema);
const Paragraph = mongoose.model('Paragraph' , paragraphSchema);
const Question = mongoose.model("Question" , questionSchema);
const ObstacleQuestion = mongoose.model("ObstacleQuestion" , obstacleQuestionSchema);
module.exports = {Chapter, Paragraph, Question , ObstacleQuestion};
