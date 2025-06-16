import "./Unfavorite.css";

export default function UnfavoriteBtn({ joke, favorites, setFavorites }) {
  const handleUnfavorite = () => {
    const updatedFavorites = favorites.filter(
      (fav) => !(fav.setup === joke.setup && fav.punchline === joke.punchline)
    );
    setFavorites(updatedFavorites);
    localStorage.setItem("joke-favorites", JSON.stringify(updatedFavorites));
  };

  return (
    <>
      <button
        className="unfavorite-btn"
        onClick={handleUnfavorite}
        title="Remove form favorites"
        type="button"
      >
        <span className="unfavorite-heart">&#10084;</span> Unfavorite
      </button>
    </>
  );
}
