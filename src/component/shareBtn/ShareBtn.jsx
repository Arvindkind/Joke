import "./ShareBtn.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShareNodes } from "@fortawesome/free-solid-svg-icons";

export default function ShareBtn({ joke }) {
  const handleShare = () => {
    const text = `${joke.setup ? joke.setup + " " : ""} - ${
      joke.punchline ? joke.punchline : ""
    }`;
    if (navigator.share) {
      navigator.share({
        title: "Funny Joke",
        text,
      });
    } else {
      navigator.clipboard.writeText(text);
      alert("Joke copied to clipboard!");
    }
  };

  return (
    <button className="share-btn" onClick={handleShare} title="Share this joke">
      <FontAwesomeIcon icon={faShareNodes} className="share-icon" />
      <span className="share-text">Share</span>
    </button>
  );
}
