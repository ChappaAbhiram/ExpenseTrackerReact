import { useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import classes from './AuthForm.module.css';
import { authActions } from '../store/auth';
// import expenseimage from '../assets/expenseimage';
import { Fragment } from 'react';
const AuthForm = () => {
  const dispatch = useDispatch();
  const history = useNavigate();
  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const confirmPasswordRef = useRef();

  const isLogin = useSelector((state) => state.auth.isLoggedin);
  const userId = useSelector(state=>state.auth.userId);
  const [isLoading,setIsLoading] = useState(false);
  const [forgotPassword,setforgotPassword] = useState(false);

  const switchAuthModeHandler = () => {
    dispatch(authActions.switchmode());
    setforgotPassword(false);
  };
  const submitHandler = (event)=>{
  event.preventDefault();
  const enteredEmail = emailInputRef.current.value;
  const enteredPassword = passwordInputRef.current.value;
  let confirmPassword;
  if(!isLogin){
  confirmPassword = confirmPasswordRef.current.value;
  }
  setIsLoading(true);
  let url;
  if(isLogin){
    url = "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBa1t8g-1UL2YeO6OIh4jJAydUnoaNH_fs"
  }
  else{
    url = "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBa1t8g-1UL2YeO6OIh4jJAydUnoaNH_fs"
  }
  if(!isLogin && enteredPassword!==confirmPassword){
    alert("Passwords missmatch");
    setIsLoading(false);
    return;
  }
  fetch(url,
  {
    method : 'POST',
    body : JSON.stringify({
      email : enteredEmail ,
      password : enteredPassword ,
      returnSecureToken : true
    }),
    headers : {
      'Content-Type' : 'application/json'
    }
  }
  ).then(res=>{
    setIsLoading(false);
    if(res.ok){
      return res.json();
}
    else{
     return res.json().then(data=>{
      let errorMessage = 'Authentication failed!';
      console.log(data);
      if(data && data.error && data.error.message){
      errorMessage = data.error.message;
      }
      throw new Error(errorMessage);
     });
    }
  }).then(data =>{
    if (isLogin) {
      console.log(data);
    //   authctx.login(data.idToken,data.email);
    localStorage.setItem("token",data.idToken);
    // console.log(enteredEmail);
    localStorage.setItem("email",enteredEmail);
     dispatch(authActions.login({ token: data.idToken, userId: enteredEmail }))
      history('/home',{replace : true});
    //   localStorage.setItem('email',data.email);
    } else {
     console.log("User Successfully Signed up");
     alert("User Successfully Signed up");
      history('/',{replace : true});
    }
  })
  .catch(err=>{
    alert(err.message);
  });
  }
 const forgotpasswordHandler = (e)=>{
  e.preventDefault();
  setforgotPassword(true);
  dispatch(authActions.switchmode())
 }
 const sendLinkHandler = (e)=>{
  e.preventDefault();
  setIsLoading(true);
  fetch("https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyBa1t8g-1UL2YeO6OIh4jJAydUnoaNH_fs",{
    method : "POST",
    headers : {
      "Content-Type" : "application/json"
    },
    body : JSON.stringify({
      email : userId,
      requestType : "PASSWORD_RESET"
    })
  }).then(res=>{
    if(res.ok){
      return res.json();
    }
    else{
      return res.json().then(data=>{
        if(data && data.error && data.error.message){
          alert(`${data.error.message}`)
        }
      })
    }
  }).then(data=>{
    console.log(data);
    setIsLoading(false);
  })
 }
  return (
    <Fragment>
    <div className={classes.outerBox}>
      <h1 className={classes.welcome}>Welcome to Expense Tracker</h1>
      <div className={classes.innerBox}>
        <h1 className={classes.heading}>{isLogin ? 'Login' : !forgotPassword ? 'Sign Up' : ''}</h1>
        <form onSubmit={submitHandler}>
          <div className={classes.control}>
            {!forgotPassword && <label htmlFor='email'>Your Email</label>}
            {forgotPassword && <label htmlFor='email'>Enter Your Registered email</label>}
            <input type='email' id='email' required ref={emailInputRef}/>
          </div>
          {!forgotPassword && (<div className={classes.control}>
            <label htmlFor='password'>Your Password</label>
            <input
              type='password'
              id='password'
              required
              ref={passwordInputRef}
            />
          </div>)}
          {!isLogin && !forgotPassword && (<div className={classes.control}>
            <label htmlFor='confirmpassword'>Confirm Password</label>
            <input
              type='password'
              id='confirmpassword'
              required
              ref={confirmPasswordRef}
            />
          </div>)
          }
          <div className={classes.actions}>
            {!isLoading && !forgotPassword && <button className={classes.titlebutton}>{isLogin ? 'Login' : 'Create Account'}</button>}
            {!isLoading && !forgotPassword && isLogin && (
  <button className={classes.linkButton} onClick={forgotpasswordHandler}>
    Forgot password
  </button>
)}
            {!isLoading && forgotPassword && <button onClick = {sendLinkHandler}>Send Link</button>}
            {isLoading && <p>Sending Request.....</p>}
            <button
              type='button'
              className={classes.toggle}
              onClick={switchAuthModeHandler}
            >
              {isLogin && !forgotPassword ? 'Create new account' : 'Login with existing account'}
            </button>
          </div>
        </form>
      </div>
    </div>
    </Fragment>
  );
};

export default AuthForm;