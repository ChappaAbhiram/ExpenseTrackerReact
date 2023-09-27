import React from "react";
import { Link } from "react-router-dom";
import classes from './Home.module.css';

const Homepage = () => {
    const verifyEmailHandler = () =>{
        fetch("https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyBa1t8g-1UL2YeO6OIh4jJAydUnoaNH_fs",{
            method : "POST",
            headers : {
                "Content-Type" : "application/json"
            },
            body : JSON.stringify({
                requestType : "VERIFY_EMAIL",
                idToken : localStorage.getItem("token")
            })
        }).then(res=>{
            if(res.ok){
                return res.json();
            }
            else{
                return res.json().then(data=>{
                //  if(data && data.error && data.error.message){
                //     console.log(data.error.message);
                //     alert(data.error.message); }
                console.log(data);
                })
            }
        }).then(data=>{
            console.log(data);
        })
    }
  return (
    <div>
    <section className={classes.home}>
        <span>Welcome to Expense Tracker</span>
        <div style={{color : 'white'}}>Profile incomplete<Link to="/profile"> Complete your Profile</Link></div>
    </section>
    <div className={classes.but}><button onClick={verifyEmailHandler} className={classes.innerbut} >Verify Email</button></div>
    </div>
  );
}

export default Homepage;

