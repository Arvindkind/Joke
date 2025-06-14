
import "./LikeBtn.css";

export default function LikeBtn({ likes, dislikes, onLike, onDislike }) {

    
  return (
    <div className="like-btn-group">
      <button className="like-btn like" onClick={onLike}>
        👍 Like <span>{likes}</span>
      </button>
      <button className="like-btn dislike" onClick={onDislike}>
        👎 Dislike <span>{dislikes}</span>
      </button>
    </div>
  );
}