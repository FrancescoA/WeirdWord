if (process.env.NODE_ENV != "production") {
  require("dotenv").config();
}

const express = require("express");
const cors = require("cors");
const request = require('request');

const connectToDb = require("./db/connection.js");
const Word = require("./models/word.js");

const app = express();
connectToDb();
app.use(express.json());
app.use(cors());


app.get("/", (req, res) => {
  res.json({test: "Welcome to WeirdWord.com!"}); 
});

app.get("/words", async (req, res) => {
  const words = await Word.find();
  res.json({ words });
});

app.get("/words/:wordId", async (req, res) => {
  const wordId = req.params.wordId;
  const word = await Word.findById(wordId);
  res.json({ word });
})

app.post("/words", async (req, res) => {
  const word = await Word.create({
    ...req.body
  });
  res.json({ word });
});

app.delete("/words/:wordId", async (req, res) => {
  const wordId = req.params.wordId;
  await Word.deleteOne({ _id: wordId });
  res.json({ message: "the word has been removed" });
})

app.get("/random", async (req, res) => {
  request.get({
    url: 'https://api.api-ninjas.com/v1/randomword',
    headers: {
      'X-Api-Key': process.env.API_NINJAS_KEY
    },
  }, (error, response, body) => {
    if (error) return console.error('Request failed:', error);
    else if (response.statusCode != 200) return console.error('Error:', response.statusCode, body.toString('utf8'));
    else res.json({body})
  });
})


app.listen(process.env.PORT, () => {
  console.log("Listening on port", process.env.PORT)
});



// aggiungere middleware es. per stampa a console?
// put? patch?
// creare controller e separare corpo delle funzioni