// SearchComponent.js
import React, { useState } from 'react';
import axios from 'axios';
import '../search.css'; // Import the CSS file

const SearchComponent = (props) => {
  const token = props.token
  console.log(token)
  const [query, setQuery] = useState('');
  const [results, setResults] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSearch = async () => {
    try {
      setLoading(true); // Set loading state to true while fetching results

      const response = await axios.get(`http://localhost:5000/search?text=${query}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }});
        response.access_token && props.setToken(response.access_token)
      setResults(response.data);
    } catch (error) {
      console.error(error);
      // Check if the error has a response with data
      if (error.response && error.response.data) {
        // Set the error state with the error message from the server
        setError(error.response.data.error || 'An error occurred while fetching results.');
      } else {
        // Set a generic error message for other types of errors
        setError('An error occurred while fetching results. Please try again.');
      }
    }  finally {
      setLoading(false); // Set loading state to false once results are fetched
    }
  };

  const handleClear = () => {
    setQuery('');
    setResults('');
    setError('')
  };

  return (
    <div className="search-container">
      <input
        className="search-input"
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Enter your search query"
      />
      <div className="button-container">
        <button className="search-button" onClick={handleSearch}>
          Search
        </button>
       <button className="clear-button" onClick={handleClear}>
        Clear
      </button>
    </div>

      {loading && <div className="loader">Loading...</div>}

      <div className="results-container">
        <p className="results-text">Results:</p>
        <div className="results-content">{results}</div>
      </div>
      {error && <div className="error-message">{error}</div>}
    </div>
  );
};

export default SearchComponent;
