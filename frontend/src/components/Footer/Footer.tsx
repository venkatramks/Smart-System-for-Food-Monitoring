// src/components/Footer/Footer.tsx

import React from 'react';
import styles from './styles.module.css';  // Create a CSS module for styling

function Footer() {
  return (
    <footer className={styles.footer}>
      <p>© {new Date().getFullYear()} Smart Fridge App. All rights reserved.</p>
      {/* Add any other footer content here (links, social media icons, etc.) */}
    </footer>
  );
}

export default Footer;