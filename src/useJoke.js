import { useState } from "react";

export default function useJoke() {
  const [joke, setJoke] = useState({});
  const [punchlineds, setPunchlines] = useState(false);
  const [history, setHistory] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);
  
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
  };
}
