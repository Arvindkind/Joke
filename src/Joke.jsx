import { useEffect, useCallback } from "react";
import "./Joke.css";
import ErrorMsg from "./ErrorMsg";
import useJoke from "./useJoke";
import LikeBtn from "./component/likeJoke/LikeBtn";
import FavoriteBtn from "./component/favoriteBTn/FavoriteBtn";
import UnfavoriteBtn from "./component/unfavoriteBtn/Unfavorite";
import ShareBtn from "./component/shareBtn/ShareBtn";
import DarkModeToggle from "./component/toggledarkModeBtn/DarkModeToggle";

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
    favorites,
    setFavorites,
    showFavMsg,
    setShowFavMsg,
    category,
    setCategory,
    darkMode,
    setDarkMode,
  } = useJoke();
  // const url = "https://official-joke-api.appspot.com/random_joke";
  const url = `https://official-joke-api.appspot.com/jokes/${category}/random`;

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
      // setJoke({ setup: jsonResponse.setup, punchline: jsonResponse.punchline });
      const jokeData = Array.isArray(jsonResponse)
        ? jsonResponse[0]
        : jsonResponse;
      setJoke({ setup: jokeData.setup, punchline: jokeData.punchline });
      setHistory((prev) => [
        ...prev,
        {
          setup: jokeData.setup,
          punchline: jokeData.punchline,
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

  //save favorites
  useEffect(() => {
    localStorage.setItem("joke-favorites", JSON.stringify(favorites));
  }, [favorites]);

  useEffect(() => {
    localStorage.setItem("joke-dark-mode", JSON.stringify(darkMode));
    if (darkMode) {
      document.body.classList.add("joke-dark");
    } else {
      document.body.classList.remove("joke-dark");
    }
  }, [darkMode]);

  const saveToFavorites = () => {
    if (
      joke.setup &&
      !favorites.some(
        (fav) => fav.setup === joke.setup && fav.punchline === joke.punchline
      )
    ) {
      setFavorites([...favorites, joke]);
      setShowFavMsg(true);
      setTimeout(() => setShowFavMsg(false), 1500);
    }
  };

  const totalJokesFetched = history.length;

  return (
    <>
      <DarkModeToggle darkMode={darkMode} setDarkMode={setDarkMode} />
      <div className="joke-container">
        <h3 style={{ color: "blue" }}>JOKE</h3>
        <div style={{ fontWeight: 500, color: "#f59e42", marginBottom: 10 }}>
          Total Jokes Fetched: {totalJokesFetched}
        </div>
        {loading && <h2 className="joke-setup">Loading...</h2>}
        {!loading && (
          <>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="joke-select"
            >
              <option value="general">General</option>
              <option value="programming">Programming</option>
              <option value="knock-knock">Knock-Knock</option>
            </select>
            <h2 className="joke-setup" style={{ color: "#00796b" }}>
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
              <br />
              <FavoriteBtn onClick={saveToFavorites} isFavorite={favorites} />
              {showFavMsg && (
                <div className="fav-msg" style={{ color: "green" }}>
                  Your favorite is added!
                </div>
              )}
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
        <div className="joke-container" style={{ marginTop: "30px" }}>
          <h3 style={{ color: "#ff9800" }}>Favorite Jokes</h3>
          <ul>
            {favorites.map((item, idx) => (
              <li key={idx} style={{ marginBottom: "10px" }}>
                <strong style={{ color: "#00796b" }}>{item.setup}</strong>
                <br />
                <span style={{ color: "#00796b" }}>{item.punchline}</span>
                <br />
                <br />
                <UnfavoriteBtn
                  joke={item}
                  favorites={favorites}
                  setFavorites={setFavorites}
                />

                <ShareBtn joke={item} />
              </li>
            ))}
          </ul>
        </div>
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
