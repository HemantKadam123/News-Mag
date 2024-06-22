import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

const ArticleDetail = () => {
  const { title } = useParams();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const articles = useSelector(state => state.news.articles);

  useEffect(() => {
    const decodedTitle = decodeURIComponent(title);
    const foundArticle = articles.find(a => a.title === decodedTitle);
    if (foundArticle) {
      setArticle(foundArticle);
      setLoading(false);
    } else {
      const fetchArticle = async () => {
        try {
          const apiKey = import.meta.env.VITE_API_KEY;
          const response = await fetch(`https://newsapi.org/v2/everything?q=${encodeURIComponent(decodedTitle)}&apiKey=${apiKey}`);
          const data = await response.json();
          if (data.articles && data.articles.length > 0) {
            setArticle(data.articles[0]);
          } else {
            setArticle(null);
          }
          setLoading(false);
        } catch (error) {
          console.error('Error fetching the article:', error);
          setLoading(false);
        }
      };
      fetchArticle();
    }
  }, [title, articles]);

  if (loading) return <div className="container mt-4">Loading...</div>;
  if (!article) return <div className="container mt-4">Article not found</div>;

  return (
    <div className="container mt-4">
      <h2 className="mb-4">{article.title}</h2>
      {article.urlToImage && <img src={article.urlToImage} alt={article.title} className="img-fluid mb-4" />}
      <p>{article.content || article.description}</p>
      <p><strong>Published at:</strong> {new Date(article.publishedAt).toLocaleString()}</p>
      <p><strong>Author:</strong> {article.author || 'Unknown'}</p>
      <a href={article.url} className="btn btn-primary mt-3" target="_blank" rel="noopener noreferrer">Read Original Article</a>
    </div>
  );
};

export default ArticleDetail;