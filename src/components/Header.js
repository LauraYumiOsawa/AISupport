import React from "react";
import '../styles/Header.css';

const Header = () => {
  return (
    <header style={styles.header}>
      <h1>AISupport</h1>
    </header>
  );
};

const styles = {
  header: {
    backgroundColor: "#f1f1f1",
    color: "Black",
    padding: "5px",
    textAlign: "left",
    
  },
};

export default Header;
