import { useDispatch, useSelector } from 'react-redux';
import { toggleFavorite } from '../newsSlice';
import { Link } from 'react-router-dom';
import image from '../assets/newsDefault.jpg';

const NewsItem = ({ article }) => {
  const dispatch = useDispatch();
  const favorites = useSelector(state => state.news.favorites);
  const isFavorite = favorites.some(fav => fav.url === article.url);

  const handleToggleFavorite = () => {
    dispatch(toggleFavorite(article));
  };

  return (
    <div className="card h-100">
      <img src={article.urlToImage || image} className="card-img-top" alt={article.title} style={{ height: '200px', objectFit: 'cover' }} />
      <div className="card-body d-flex flex-column">
        <h5 className="card-title">{article.title}</h5>
        <p className="card-text">{article.description ? article.description.slice(0, 100) + '...' : "No description available."}</p>
        <div className="mt-auto">
          <Link to={`/article/${encodeURIComponent(article.title)}`} className="btn btn-primary me-2">Read More</Link>
          <button onClick={handleToggleFavorite} className="btn btn-outline-secondary">
            {isFavorite ? '♥' : '♡'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default NewsItem;