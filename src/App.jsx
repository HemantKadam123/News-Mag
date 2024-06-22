import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './Components/Navbar';
import NewsBoard from './Components/NewsBoard';
import Favorites from './Components/Favorites';
import ArticleDetail from './Components/ArticleDetail';

const App = () => {
  return (
    <Router>
      <div>
        <Navbar />
        <Routes>
          <Route path="/" element={<NewsBoard />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/article/:title" element={<ArticleDetail />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;