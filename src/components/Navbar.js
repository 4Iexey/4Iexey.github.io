import React from "react";
import { Link } from "react-router-dom";
import styles from "../styles/navbar.module.css";

export default function Navbar() {
  return (
    <nav className={styles.nav}>
      <img src="/house4.png" alt="house on chicken legs" />
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/projects">Projects</Link></li>
        <li><Link to="/about">About</Link></li>
        <li><Link to="/contact">Contact</Link></li>
      </ul>
    </nav>
  );      
}