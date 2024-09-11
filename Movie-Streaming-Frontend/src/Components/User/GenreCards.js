import React from "react";
import { Link } from "react-router-dom";
import "../../Assets/Styles/GenreCards.css";
import action from "../../Assets/Images/action.png";
import drama from "../../Assets/Images/drama.png";
import comedy from "../../Assets/Images/comedy.png";
import horror from "../../Assets/Images/horror.png";
import romantic from "../../Assets/Images/romantic.png";
import doc from "../../Assets/Images/documentary.png";

function GenreCards({ genre }) {
  let img;
  let newGenre;

  switch (genre) {
    case "Action Movies":
      img = action;
      newGenre='Action';
      break;
    case "Drama Movies":
      img = drama;
      newGenre='Drama'
      break;
    case "Comedy Movies":
      img = comedy;
      newGenre='Comedy'
      break;
    case "Horror Movies":
      img = horror;
      newGenre='Horror'
      break;
    case "Romantic Movies":
      img = romantic;
      newGenre='Romantic'
      break;
    case "Documentaries Movies":
      img = doc;
      newGenre='Documentary'
      break;
    default:
      img = null;
      break;
  }

  return (
    <div className="support_view_movies">
      <Link to={`/user_view_movie_by_genre/${newGenre}`} className="nav-link" >
        <div className="genre_cards">
          <div className="genre_cards_img">
            {img ? (
              <img src={img} alt={`${genre} genre`} />
            ) : (
              <p>Image not available</p>
            )}
          </div>
          <div className="support_view_movies_cards_title">
            <p>{genre}</p>
          </div>
          {/* <div className="support_view_movies_cards_actions">
          <div className="support_view_movies_cards_actions_view">
            <Link
              // to={`/admin_view_single_approved_movies/${movie._id}/${movie.thumbnail.filename}`}
            >
              <p>
                <i className="ri-eye-line"></i> View
              </p>
            </Link>
          </div>
        </div> */}
        </div>
      </Link>
    </div>
  );
}

export default GenreCards;
