
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as solidHeart } from "@fortawesome/free-solid-svg-icons";
import { faHeart as regularHeart } from "@fortawesome/free-regular-svg-icons";
import "./FavoriteBtn.css";

export default function FavoriteBtn({ onClick, isFavorite }) {
  return (
    <button
      className={`favorite-toggle-btn${isFavorite ? " active" : ""}`}
      onClick={onClick}
      aria-pressed={isFavorite}
      aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
      title={isFavorite ? "Remove from favorites" : "Add to favorites"}
      type="button"
    >
      <FontAwesomeIcon
        icon={isFavorite ? solidHeart : regularHeart}
        className="fa-heart-animate"
        size="2x"
      />
    </button>
  );
}
