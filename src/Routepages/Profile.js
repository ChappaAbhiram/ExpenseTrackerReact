import { useRef , useEffect} from "react";
import React from "react";
import classes from './Profile.module.css';
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useState } from "react";
const Profile = ()=> {
    const islogIn = useSelector(state=>state.auth.isLoggedin);
    const token = useSelector(state=>state.auth.token);
    const [displayName, setDisplayName] = useState('');
    const [photoUrl, setPhotoUrl] = useState('');
    const Fullnameinputref = useRef();
    const ProfileURLinputref = useRef();
    const history = useNavigate();
    useEffect(() => {
        if (islogIn) {
            fetch("https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyBa1t8g-1UL2YeO6OIh4jJAydUnoaNH_fs", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    idToken: token
                })
            }).then(resp => {
                if (resp.ok) {
                    return resp.json();
                } else {
                    return resp.json().then(data => {
                        let errorMessage = 'Authentication failed!';
                        console.log(data);
                        if (data && data.error && data.error.message) {
                            errorMessage = data.error.message;
                        }
                        alert(errorMessage);
                    })
                }
            }).then(data => {
                console.log(data);
                if (data.users[0].displayName && data.users[0].photoUrl) {
                    setDisplayName(data.users[0].displayName);
                    setPhotoUrl(data.users[0].photoUrl);
                }
            });
        }
    }, [islogIn, token]);
    const url= "https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyBa1t8g-1UL2YeO6OIh4jJAydUnoaNH_fs";
    const submitHandler = (event)=>{
        event.preventDefault();
        fetch(url,{
            method : 'POST',
            headers : {
            'Content-Type' : 'application/json'
            },
            body : JSON.stringify({
                idToken: token,
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
            history("/home",{replace : true})

        }).catch(err=>{
                alert(err.message);
              }
        )


    }
    return (islogIn && (
        <React.Fragment>
            <form onSubmit={submitHandler} className={classes.inputform}>
                <h1>Profile details</h1>
                <label htmlFor="fullname">Full Name</label>
                <input
                    type='text'
                    id='fullname'
                    ref={Fullnameinputref}
                    defaultValue={displayName} // Set the default value to display name
                />
                <label htmlFor="profilepicurl">Enter your Profile pic URL</label>
                <input
                    type='text'
                    id='profilepicurl'
                    ref={ProfileURLinputref}
                    defaultValue={photoUrl} // Set the default value to profile picture URL
                />
                <button type="submit">Update</button>
            </form>
            {photoUrl && displayName && ( // Render profile picture and name if available
                <div className={classes.profileDetails}>
                    <img src={photoUrl} alt="Profile" />
                    <p className={classes.para}>{displayName}</p>
                </div>
            )}
        </React.Fragment>)
    )

}
export default Profile;