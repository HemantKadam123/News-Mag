import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchNews, nextPage, previousPage } from '../newsSlice';
import NewsItem from './NewsItem';

const NewsBoard = () => {
  const dispatch = useDispatch();
  const { articles, currentPage, totalResults, category, search, status, error } = useSelector(state => state.news);

  useEffect(() => {
    console.log('Fetching news with:', { category, currentPage, search });
    dispatch(fetchNews({ category, page: currentPage, search }));
  }, [category, currentPage, search, dispatch]);

  console.log('Current state:', { articles, status, error });

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  if (status === 'failed') {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">Latest <span className="badge bg-danger">News</span></h2>
      {articles.length === 0 ? (
        <p className="text-center">No news available.</p>
      ) : (
        <div className="row">
          {articles.map((article, index) => (
            <div className="col-md-4 mb-4" key={index}>
              <NewsItem article={article} />
            </div>
          ))}
        </div>
      )}
      <nav aria-label="Page navigation">
        <ul className="pagination justify-content-center">
          <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
            <button className="page-link" onClick={() => dispatch(previousPage())} disabled={currentPage === 1}>
              Previous
            </button>
          </li>
          <li className="page-item">
            <span className="page-link">Page {currentPage}</span>
          </li>
          <li className={`page-item ${currentPage * 10 >= totalResults ? 'disabled' : ''}`}>
            <button className="page-link" onClick={() => dispatch(nextPage())} disabled={currentPage * 10 >= totalResults}>
              Next
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default NewsBoard;