import React , {useState,useEffect} from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import classes from './Home.module.css';
import ExpenseForm from "../components/ExpenseForm";
import ExpenseList from "../components/Expenses/ExpenseList";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { authActions } from "../store/auth";
import { expenseActions } from "../store/expense";
import { fetchExpenses } from "../store/expense";
import { themeActions } from "../store/theme";


const Homepage = () => {
    const history =  useNavigate();
    // const isLoggedIn = useSelector(state=>state.auth.isLoggedin);
    const storedToken = localStorage.getItem("token");
    const [isEditing,setIsEditing] = useState(false);
    const token = useSelector(state=>state.auth.token);
    const expenses = useSelector(state=>state.expense.expensesData);
    const dispatch = useDispatch();
useEffect(()=>{
    dispatch(fetchExpenses());
},[dispatch])
const startEditingHandler = () =>{
    setIsEditing(true);
}
const stopEditingHandler = ()=>{
    setIsEditing(false);
}
    const logOutHandler = () =>{
        dispatch(authActions.switchmode());
        dispatch(authActions.logout());
        dispatch(themeActions.disablePremium());
        dispatch(themeActions.disableTheme());
        localStorage.removeItem("token");
        localStorage.removeItem("email")
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
                idToken : token
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
    if (!storedToken) {
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
        <Link to="/profile">Profile</Link>
        <button onClick={verifyEmailHandler} className={classes.innerbut} >Verify Email</button>
        <button className={classes.innerbut} onClick={logOutHandler}>Logout</button>
    </section>

    <div className={classes.newexpense}>
        {!isEditing && <button onClick={startEditingHandler}>Add New Expense</button>}
        {isEditing && <ExpenseForm onCancel={stopEditingHandler} />}
        </div>
      <ExpenseList />
    </div>
    )
    
}

export default Homepage;

