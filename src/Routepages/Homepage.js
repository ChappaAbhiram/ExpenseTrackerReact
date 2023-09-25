import React from "react";
import { Link } from "react-router-dom";
import classes from './Home.module.css';

const Homepage = () => {
  return (
    <section className={classes.home}>
        <span>Welcome to Expense Tracker</span>
        <div style={{color : 'white'}}>Profile incomplete<Link to="/profile"> Complete your Profile</Link></div>
    </section>
  );
}

export default Homepage;

