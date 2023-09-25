import { useRef } from "react";
import React from "react";
import classes from './Profile.module.css';
import { useNavigate } from "react-router-dom";
const Profile = ()=> {
    const Fullnameinputref = useRef();
    const ProfileURLinputref = useRef();
    const history = useNavigate();
    const url= "https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyBa1t8g-1UL2YeO6OIh4jJAydUnoaNH_fs";
    const submitHandler = (event)=>{
        event.preventDefault();
        fetch(url,{
            method : 'POST',
            headers : {
            'Content-Type' : 'application/json'
            },
            body : JSON.stringify({
                idToken: `${localStorage.getItem("token")}`,
                displayName: Fullnameinputref.current.value,
                photoUrl: ProfileURLinputref.current.value,
                 returnSecureToken: 'true'
            })
        }).then(res=>{
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
        }).then(data=>{
            alert("Successfully updated User details");
            console.log(data);
            Fullnameinputref.current.value = '';
            ProfileURLinputref.current.value='';
            history("/home");

        }).catch(err=>{
                alert(err.message);
              }
        )


    }
    return (<React.Fragment>
    <form onSubmit={submitHandler} className={classes.inputform}>
        <label htmlFor = "fullname" >Full Name</label>
        <input
        type='text'
        id = 'fullname'
        ref = {Fullnameinputref}
         / >
        <label htmlFor = "profilepicurl" >Enter your Profile pic URL</label>
        <input
        type='text'
        id= 'profilepicurl'
        ref = {ProfileURLinputref}
        / >
        <button type="submit">Update</button>
    </form>  
    </React.Fragment>  
    )

}
export default Profile;