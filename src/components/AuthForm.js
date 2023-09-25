import { useState, useRef  } from 'react';
 import {NavLink} from 'react-router-dom';
// import AuthContext from '../../store/AuthContext';
import classes from './AuthForm.module.css';
import { useNavigate } from 'react-router-dom';
const AuthForm = () => {
  const history = useNavigate();
  const emailInputref = useRef();
  const passwordInputref = useRef(); 
  const confirmPasswordref = useRef();

//   const authctx = useContext(AuthContext);
  const [isLogin, setIsLogin] = useState(false);
  const [isLoading,setIsLoading] = useState(false);

  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };
  const submitHandler = (event)=>{
  event.preventDefault();
  const enteredEmail = emailInputref.current.value;
  const enteredPassword = passwordInputref.current.value;
  let confirmPassword;
  if(!isLogin){
  confirmPassword = confirmPasswordref.current.value;
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
      localStorage.setItem('token',data.idToken);
      history('/home');
    //   localStorage.setItem('email',data.email);
    } else {
     console.log("User Successfully Signed up");
     alert("User Successfully Signed up");
      history('/');
    }
  })
  .catch(err=>{
    alert(err.message);
  });
  }

  return (
    <section className={classes.auth}>
      <h1>{isLogin ? 'Login' : 'Sign Up'}</h1>
      <form onSubmit={submitHandler}>
        <div className={classes.control}>
          <label htmlFor='email'>Your Email</label>
          <input type='email' id='email' required ref={emailInputref}/>
        </div>
        <div className={classes.control}>
          <label htmlFor='password'>Your Password</label>
          <input
            type='password'
            id='password'
            required
            ref={passwordInputref}
          />
        </div>
        {!isLogin && (<div className={classes.control}>
          <label htmlFor='confirmpassword'>Confirm Password</label>
          <input
            type='password'
            id='confirmpassword'
            required
            ref={confirmPasswordref}
          />
        </div>)
}
        <div className={classes.actions}>
          {!isLoading && <button>{isLogin ? 'Login' : 'Create Account'}</button>}
          {!isLoading && <NavLink to='/home'>{isLogin ? 'Change password' : ''}</NavLink>}
          {isLoading && <p>Sending Request.....</p>}
          <button
            type='button'
            className={classes.toggle}
            onClick={switchAuthModeHandler}
          >
            {isLogin ? 'Create new account' : 'Login with existing account'}
          </button>
        </div>
      </form>
    </section>
  );
};

export default AuthForm;