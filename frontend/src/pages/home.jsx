import React from 'react';

function Home() {
  // Placeholder variables, replace with actual data later
  const balance = 100000;  // Example value, replace with your state or props
  const users = 1500;      // Example value, replace with your state or props
  const claims = 200;      // Example value, replace with your state or props

  return (
    <div>
      {/* Header */}
      <header className="bg-primary text-white text-center py-3" id="header">
        <h1>American Insurance</h1>
      </header>

      <div className="container mt-4">
        {/* Statistics Row */}
        <div className="row text-center">
          <div className="col-md-4">
            <h3 id="total-balance">Total Balance: ${balance}</h3>
          </div>
          <div className="col-md-4">
            <h3 id="total-users">Total Users: {users}</h3>
          </div>
          <div className="col-md-4">
            <h3 id="total-claims">Total Claims: {claims}</h3>
          </div>
        </div>

        {/* Description */}
        <div className="mt-4" id="description">
          <p>The American Insurance is a non-profit insurance that does not decline customers for profits.</p>
        </div>
      </div>
    </div>
  );
}

export default Home;
