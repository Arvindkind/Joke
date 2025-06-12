import { useEffect, useState } from "react";
import "./Joke.css";
import ErrorMsg from "./ErrorMsg";

export default function Joke() {
  const [joke, setJoke] = useState({});
  const [punchlineds, setPunchlines] = useState(false);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);
  const url = "https://official-joke-api.appspot.com/random_joke";

  const getNewJoke = async () => {
    setLoading(true);
    setError(null);
    setJoke({});
    setPunchlines(false);
    setCopied(false);
    console.log("Fetching a new joke...");

    try {
      let response = await fetch(url);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      console.log(response.ok);
      let jsonResponse = await response.json();
      console.log(jsonResponse);
      setJoke({ setup: jsonResponse.setup, punchline: jsonResponse.punchline });
    } catch (error) {
      setError(error.message);
      setJoke({ punchline: "Joke not found" });
    } finally {
      setLoading(false);
    }
  };
  const copyHandle = () => {
    const jokeText = `${joke.setup ? joke.setup : ""} - ${
      joke.punchline ? joke.punchline : ""
    }`;
    navigator.clipboard
      .writeText(jokeText)
      .then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000); // Reset copied state after 2 seconds
      })
      .catch((err) => console.error("Failed to copy text: ", err));
  };

  useEffect(() => {
    getNewJoke();
  }, []);
  return (
    <>
      <div className="joke-container">
        <h3 style={{ color: "blue" }}>JOKE</h3>
        {loading && <h2 className="joke-setup">Loading...</h2>}
        {!loading && (
            <h2 className="joke-setup">
              {joke.setup}
              <ErrorMsg ErrorMsg={error} />
            </h2>
          ) && (
            <>
              <h2 className="joke-setup">{joke.setup}</h2>
              <button
                onClick={() => setPunchlines(!punchlineds)}
                className="joke-button"
              >
                {punchlineds ? "Hide Punchline" : "Show Punchline"}
              </button>{" "}
              <br />
              {!!punchlineds && (
                <h2 className="joke-punchline">{joke.punchline}</h2>
              )}
              <button onClick={getNewJoke} className="joke-button">
                Get Joke
              </button>
              <br />
              <button onClick={copyHandle} className="joke-button">
                {copied ? "Copied!" : "Copy Joke"}
              </button>
            </>
          )}
      </div>
    </>
  );
}
// Copy Joke to Clipboard: Add a button to copy the current joke.
// Joke History: Show a list of previously fetched jokes.
