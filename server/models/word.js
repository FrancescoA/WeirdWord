const mongoose = require("mongoose");

const wordSchema = new mongoose.Schema({
  word: String,

  phonetics: {
    text: String,
    audio: String
  },

  meanings: [{
    partOfSpeech: String,
    definitions: [{
      definition: String,
      example: String,
      synonyms: [String],
      antonyms: [String]
    }]
  }],

  isSaved: Boolean
});


const Word = mongoose.model("Word", wordSchema);
module.exports = Word;