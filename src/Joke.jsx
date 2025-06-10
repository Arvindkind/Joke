import { useEffect, useState } from "react";
import "./Joke.css";

export default function Joke() {
  const [joke, setJoke] = useState({});
  const [punchlineds, setPunchlines] = useState(false);
  const url = "https://official-joke-api.appspot.com/random_joke";

  const getNewJoke = async () => {
    let response = await fetch(url);
    let jsonResponse = await response.json();
    console.log(jsonResponse);
    setJoke({ setup: jsonResponse.setup, punchline: jsonResponse.punchline });
  };
  useEffect(() => {
    async function getNewJoke() {
      let response = await fetch(url);
      let jsonResponse = await response.json();
      setJoke({ setup: jsonResponse.setup, punchline: jsonResponse.punchline });
    }
    getNewJoke();
  }, []);
  return (
    <>
      <div className="joke-container">
        <h3>JOKE</h3>
        <h2 className="joke-setup">{joke.setup}</h2>
        <button
          onClick={() => setPunchlines(!punchlineds)}
          className="joke-button"
        >
          {punchlineds ? "Hide Punchline" : "Show Punchline"}
        </button>{" "}
        <br />
        {!!punchlineds && <h2 className="joke-punchline">{joke.punchline}</h2>}
        <button onClick={getNewJoke} className="joke-button">
          Get Joke
        </button>
      </div>
    </>
  );
}
