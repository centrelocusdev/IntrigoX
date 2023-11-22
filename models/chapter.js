import mongoose from 'mongoose';

const chapterSchema = new mongoose.Schema({
    name: String,
    paragraphs: Array
})

const Chapter = mongoose.model('Chapter' , chapterSchema);
module.exports = Chapter;