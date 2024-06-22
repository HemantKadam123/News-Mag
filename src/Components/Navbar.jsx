import { useDispatch } from 'react-redux';
import { setCategory, setSearch } from '../newsSlice';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    dispatch(setSearch(searchTerm));
    navigate('/');
  };

  const handleCategoryClick = (category) => {
    dispatch(setCategory(category));
    navigate('/');
  };

  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary" data-bs-theme="dark">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/"><span className="badge bg-light text-dark fs-4">NewsLetter</span></Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            {['technology', 'business', 'health', 'sports', 'entertainment'].map(category => (
              <li className="nav-item" key={category}>
                <div className="nav-link" onClick={() => handleCategoryClick(category)}>{category.charAt(0).toUpperCase() + category.slice(1)}</div>
              </li>
            ))}
            <li className="nav-item">
              <Link className="nav-link" to="/favorites">Favorites</Link>
            </li>
          </ul>
          <form className="d-flex ms-auto" onSubmit={handleSearch}>
            <input
              className="form-control me-2"
              type="search"
              placeholder="Search"
              aria-label="Search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button className="btn btn-outline-success" type="submit">Search</button>
          </form>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;