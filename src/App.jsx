import React, { useState, useEffect } from 'react';
import { colleges as dummyColleges } from './dummyData';
import './App.css';

const App = () => {
  const [colleges, setColleges] = useState(dummyColleges.slice(0, 3)); // Initially show first 3 colleges
  const [visibleCount, setVisibleCount] = useState(7); // Set this to 7 to load 4th to 10th initially
  const [searchTerm, setSearchTerm] = useState('');
  const [sortField, setSortField] = useState('');
  const [sortOrder, setSortOrder] = useState('asc');

  useEffect(() => {
    loadMoreColleges();
  }, [visibleCount, searchTerm, sortField, sortOrder]);

  const loadMoreColleges = () => {
    let filteredColleges = dummyColleges.filter(college =>
      college.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (sortField) {
      filteredColleges = filteredColleges.sort((a, b) => {
        if (sortOrder === 'asc') {
          return a[sortField] > b[sortField] ? 1 : -1;
        } else {
          return a[sortField] < b[sortField] ? 1 : -1;
        }
      });
    }

    setColleges(filteredColleges.slice(0, visibleCount));
  };

  const handleScroll = (e) => {
    const { scrollTop, clientHeight, scrollHeight } = e.target.scrollingElement;

    if (scrollHeight - scrollTop <= clientHeight + 100) {
      setVisibleCount((prev) => prev + 10);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="App">
      <div className="search-sort-container">
        <input
          type="text"
          placeholder="Search by college name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <select
          onChange={(e) => setSortField(e.target.value)}
          value={sortField}
        >
          <option value="">Sort by...</option>
          <option value="rating">Collegedunia Rating</option>
          <option value="fees">Fees</option>
          <option value="reviews">User Reviews</option>
        </select>
        <select
          onChange={(e) => setSortOrder(e.target.value)}
          value={sortOrder}
        >
          <option value="asc">Ascending</option>
          <option value="desc">Descending</option>
        </select>
      </div>

      <div className="college-table">
        {/* Table Headings */}
        <div className="table-header">
          <div>CD Rank</div>
          <div>Colleges</div>
          <div>Course Fees</div>
          <div>Placement</div>
          <div>User Reviews</div>
          <div>Ranking</div>
        </div>

        {colleges.map((college, index) => (
          <div key={index} className="college-row">
            <div className="college-rank">
              #{college.rank}
            </div>
            <div className="college-details">
              <h2>{college.name}</h2>
              <p>{college.course}</p>
              {college.featured && <span className="featured-flag">Featured</span>}
              <button className="apply-button">Apply Now</button>
              <button className="brochure-button">Download Brochure</button>
            </div>
            <div className="college-fees">
              <p>₹ {college.fees.toLocaleString()}</p>
              <span>Per Year Fees</span>
            </div>
            <div className="college-placement">
              <p>Avg Package: ₹ {college.placement.average.toLocaleString()}</p>
              <p>Highest Package: ₹ {college.placement.highest.toLocaleString()}</p>
            </div>
            <div className="college-reviews">
              <p>{college.reviews} / 10</p>
              <span>{college.reviewsCount} User Reviews</span>
            </div>
            <div className="college-ranking">
              <p>#{college.ranking} in India</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
