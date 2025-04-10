
import React from 'react';
import { Link } from 'react-router-dom';
import Layout from '../components/common/Layout';
import './NotFoundPage.css';

const NotFoundPage = () => {
  return (
    <Layout>
      <div className="not-found-container">
        <div className="not-found-content">
          <h1 className="not-found-title">404</h1>
          <h2 className="not-found-subtitle">Page Not Found</h2>
          <p className="not-found-message">
            The page you are looking for doesn't exist or has been moved.
          </p>
          <Link to="/" className="btn btn-primary">
            Go to Homepage
          </Link>
        </div>
      </div>
    </Layout>
  );
};

export default NotFoundPage;
