import React from 'react';

function Privacy() {
  return (
    <div className="page-container">
      <h1>Privacy Policy</h1>
      <p>Last updated: {new Date().toLocaleDateString()}</p>
      
      <section>
        <h2>Information We Collect</h2>
        <p>We collect information that you provide directly to us when using our services...</p>
      </section>
      
      <section>
        <h2>How We Use Your Information</h2>
        <p>We use the information we collect to provide and improve our services...</p>
      </section>
      
      {/* Add more sections as needed */}
    </div>
  );
}

export default Privacy; 