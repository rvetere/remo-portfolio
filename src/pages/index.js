import React from 'react'
import Link from 'gatsby-link'
import Hero from './components/Hero'

const IndexPage = () => (
  <div style={{ height: '100%' }}>
    <Link to="/page-2/">Go to page 2</Link>

    <Hero />
  </div>
)

export default IndexPage
