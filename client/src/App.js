import {useState, useEffect} from "react"; 
import axios from "axios";

function App() {
  const [wordList, setWordList] = useState([]);

  useEffect(() => {
    fetchRandomWord();
  }, []);

  const fetchRandomWord = async () => {
    let wordData = await axios.get("http://localhost:3000/random");
    wordData = JSON.parse(wordData.data.body);
    setWordList([...wordList, wordData.word]);
  }

  const saveWord = async (word) => {
    axios.post("http://localhost:3000/words", {
      [word]: word
    })
    let wordData = await axios.get("http://localhost:3000/words");
    console.log(wordData);

  }
  
  return (
    <div className="App">
      <button
        onClick={() => {fetchRandomWord()}}>
        Load a random word
      </button>
      {wordList && wordList.map(word => {
        return (
          <div>
            <h2>{word}</h2>
            <button
              onClick={() => {saveWord(word) /*corretto? sembra non essere presente la parola dentro il corpo */}}> 
              Save Word
            </button>
          </div>
        )
      })}
    </div>
  );
}

export default App;


// precaricare l'oggetto spedito dal backend con i dati del dizionario, se presenti!