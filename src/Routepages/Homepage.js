import React , {useState} from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import classes from './Home.module.css';
import ExpenseForm from "../components/ExpenseForm";
import ExpenseList from "../components/ExpenseList";

const Homepage = () => {
    const login = localStorage.getItem("token");
    const history =  useNavigate();
    const [isLoggedIn,setIsLoggedIn] = useState(login);
    const [expenses, setExpenses] = useState([]);

    const addExpense = (newExpense) => {
        setExpenses([...expenses, newExpense]);
      };


    const logOutHandler = () =>{
        localStorage.removeItem("token");
        history("/",{replace : true});
    }
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
                alert("Successfully Sent Veification link to email");
                return res.json();
            }
            else{
                return res.json().then(data=>{
                 if(data && data.error && data.error.message){
                    console.log(data.error.message);
                    if(data.error.message === "INVALID_ID_TOKEN"){
                        alert("INVALID ID TOKEN . Please login again")
                    }
                    else{
                    alert(data.error.message);
                 }
                 }
                // console.log(data);
                })
            }
        }).then(data=>{
            console.log(data);
        })
    }
    if (!isLoggedIn) {
        return (
          <div className={classes.logout}>
            <h3>You are logged Out</h3>
            <p><Link to="/">Login Again</Link></p>
          </div>
        );
      }
    return(
    <div>
    <section className={classes.home}>
        <span>Welcome to Expense Tracker</span>
        <div style={{color : 'white'}}>Profile incomplete<Link to="/profile"> Complete your Profile</Link></div>
        <button className={classes.innerbut} onClick={logOutHandler}>Logout</button>
    </section>
    <div className={classes.but}><button onClick={verifyEmailHandler} className={classes.innerbut} >Verify Email</button></div>
    <ExpenseForm addExpense={addExpense}/>
      <ExpenseList expenses={expenses} />
    </div>
    )
    
}

export default Homepage;

