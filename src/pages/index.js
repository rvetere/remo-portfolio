import React from 'react';
import Link from 'gatsby-link';
import Hero from './components/Hero';
import Background from './components/Background';

import './index.css';

const IndexPage = () => (
  <div className="index-page">
    <div className="card">
      <h1 className="hero-title">remo<br />vetere</h1>
      <p>
        super active developer, full of fancy ideas, javascript-enthusiast, series/movie-lover and always available for a good discussion ;)
      </p>
    </div>

    <Background />

    {/*
      <Hero />
      <Link to="/page-2/">Go to page 2</Link>
    */}
  </div>
)

export default IndexPage
