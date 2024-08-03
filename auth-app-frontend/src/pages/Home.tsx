import React from 'react';
import AppHeader from '../components/AppHeader';
import '../styles/Home.css'

const Home: React.FC = () => {

  return (
    <div className="app-page">
      <AppHeader title="Welcome" />
      <main className="app-container">
        <h1 className="welcome">Welcome to Application</h1>
        <p className="description">
          Ut velit est quam dolor ad a aliquid qui aliquid. Sequi ea ut et est quaerat sequi nihil ut
          aliquam. Occaecati alias dolorem mollitia ut. Similique ea voluptatem. Esse doloremque accusamus
          repellendus deleniti vel. Minus et tempore modi architecto.
        </p>
        <button className="read-more-button">Read More</button>
      </main>
    </div>
  );
};

export default Home;