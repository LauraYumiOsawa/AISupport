import React from 'react';
import '../styles/Admin.css';

function Admin() {
  return (
    <div className="Admin">
      <h1>Admin Panel</h1>
      <div className="Admin-settings">
        <p>Here you can configure the chat settings.</p>
        {/* Adicione mais configurações conforme necessário */}
      </div>
    </div>
  );
}

export default Admin;