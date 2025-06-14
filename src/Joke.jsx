import { useEffect, useCallback } from "react";
import "./Joke.css";
import ErrorMsg from "./ErrorMsg";
import useJoke from "./useJoke";
import LikeBtn from "./component/likeJoke/LikeBtn";

export default function Joke() {
  const {
    joke,
    setJoke,
    punchlineds,
    setPunchlines,
    history,
    setHistory,
    error,
    setError,
    loading,
    setLoading,
    copied,
    setCopied,
  } = useJoke();
  const url = "https://official-joke-api.appspot.com/random_joke";

  const getNewJoke = useCallback(async () => {
    setLoading(true);
    setError(null);
    setJoke({});
    setPunchlines(false);
    setCopied(false);
    try {
      let response = await fetch(url);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      let jsonResponse = await response.json();
      setJoke({ setup: jsonResponse.setup, punchline: jsonResponse.punchline });
      setHistory((prev) => [
        ...prev,
        {
          setup: jsonResponse.setup,
          punchline: jsonResponse.punchline,
          likes: 0,
          dislikes: 0,
        },
      ]);
    } catch (error) {
      setError(error.message);
      setJoke({ punchline: "Joke not found" });
    } finally {
      setLoading(false);
    }
  }, [
    setLoading,
    setError,
    setJoke,
    setPunchlines,
    setCopied,
    setHistory,
    url,
  ]);

  const handleCopy = () => {
    const text = `${joke.setup ? joke.setup + " " : ""}${
      joke.punchline ? joke.punchline : ""
    }`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  useEffect(() => {
    getNewJoke();
  }, [getNewJoke]);

  

 

  return (
    <>
      <div className="joke-container">
        <h3 style={{ color: "blue" }}>JOKE</h3>
        {loading && <h2 className="joke-setup">Loading...</h2>}
        {!loading && (
          <>
            <h2 className="joke-setup">
              {joke.setup}
              <ErrorMsg ErrorMsg={error} />
            </h2>
            <button
              onClick={() => setPunchlines(!punchlineds)}
              className="joke-button"
            >
              {punchlineds ? "Hide Punchline" : "Show Punchline"}
            </button>
            <br />
            {!!punchlineds && (
              <h2 className="joke-punchline">{joke.punchline}</h2>
            )}
            <button onClick={getNewJoke} className="joke-button">
              Get Joke
            </button>
            <button
              onClick={handleCopy}
              className="joke-button"
              style={{ marginLeft: "10px" }}
            >
              {copied ? "Copied!" : "Copy Joke"}
            </button>
          </>
        )}
      </div>

      <div className="joke-container" style={{ marginTop: "30px" }}>
        <h3 style={{ color: "#00796b" }}>Joke History</h3>
        <ul>
          {history.map((item, idx) => (
            <li key={idx} style={{ marginBottom: "10px" }}>
              <strong style={{ color: "#00796b" }}>{item.setup}</strong>
              <br />
              <span style={{ color: "#00796b" }}>{item.punchline}</span>
              <LikeBtn
                likes={item.likes}
                dislikes={item.dislikes}
                onLike={() => {
                  setHistory((history) =>
                    history.map((joke, i) =>
                      i === idx ? { ...joke, likes: joke.likes + 1 } : joke
                    )
                  );
                }}
                onDislike={() => {
                  setHistory((history) =>
                    history.map((joke, i) =>
                      i === idx
                        ? { ...joke, dislikes: joke.dislikes + 1 }
                        : joke
                    )
                  );
                }}
              />
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

// Like/Dislike Jokes:
// Add buttons to let users like or dislike a joke and keep count.

// Save Favorite Jokes:
// Let users save jokes to a favorites list (store in state or localStorage).

// Share Joke:
// Add a button to share the joke on social media or copy a shareable link.

// Category Selection:
// Fetch jokes by category (if the API supports it) and let users pick a category.

// Dark Mode:
// Add a toggle to switch between light and dark themes.

// Show Total Jokes Fetched:
// Display a counter for how many jokes have been fetched in this session.
