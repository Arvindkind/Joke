import { useState } from "react";

export default function useJoke() {
  const [joke, setJoke] = useState({});
  const [punchlineds, setPunchlines] = useState(false);
  const [history, setHistory] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);
  const [favorites, setFavorites] = useState(() => {
    const stored = localStorage.getItem("joke-favorites");
    return stored ? JSON.parse(stored) : [];
  });
  const [showFavMsg, setShowFavMsg] = useState(false);

  return {
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
  };
}
