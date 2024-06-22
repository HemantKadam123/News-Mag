import { useSelector } from 'react-redux';
import NewsItem from './NewsItem';

const Favorites = () => {
  const favorites = useSelector(state => state.news.favorites);

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">Favorites</h2>
      {favorites.length === 0 ? (
        <p className="text-center">No favorite articles added yet.</p>
      ) : (
        <div className="row">
          {favorites.map((article, index) => (
            <div className="col-md-4 mb-4" key={index}>
              <NewsItem article={article} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Favorites;