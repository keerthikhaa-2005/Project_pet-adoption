import React from 'react';
import { Link } from 'react-router-dom';

const Navigation = () => {
  return (
    <nav style={{
      padding: '1rem',
      backgroundColor: '#f8f9fa',
      marginBottom: '2rem'
    }}>
      <ul style={{
        listStyle: 'none',
        display: 'flex',
        gap: '2rem',
        margin: 0,
        padding: 0
      }}>
        <li>
          <Link to="/" style={{ textDecoration: 'none', color: '#333' }}>Available Pets</Link>
        </li>
        <li>
          <Link to="/adopted" style={{ textDecoration: 'none', color: '#333' }}>Adopted Pets</Link>
        </li>
        <li>
          <Link to="/add" style={{ textDecoration: 'none', color: '#333' }}>Add New Pet</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;
