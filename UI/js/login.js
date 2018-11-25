const loginForm = document.getElementById('login-form');
const loginName = document.querySelector('#login-form #username');
const loginPassw = document.querySelector('#login-form #passw');


import {logoutUser, url_base, showMessage} from './lib.js';
logoutUser();
showMessage();
// console.log(showMessage);


loginForm.addEventListener('submit', getTokenFunction);


if(localStorage.getItem('logged_in') == 'True'){
    localStorage.setItem('success', "Success! Logged in");
    window.location.href='./UI/store.html';
  };


function getTokenFunction(e) {
    e.preventDefault();

    let username = loginName.value;
    let password = loginPassw.value;


    const url = url_base + '/login';
    fetch(url, {
        "async": true,
        "crossDomain": true,
        "url": url,
        "method": "POST",
        "headers": {
            "Content-Type": "application/json",
            "Cache-Control": "no-cache"
        },
        "body":JSON.stringify({
            "username": username,
        "password": password})
      })
      .then((res) => res.json())
      .then((data) => {
        console.log(data)
        if (data.Error){
            alert(data.Error);
            localStorage.setItem('error', data.Error);
        }
        else{
            localStorage.setItem('access_token', data.access_token);
            localStorage.setItem('user_role', data.role);
            localStorage.setItem('username', username);
            localStorage.setItem('success', "Success! Logged in");
            localStorage.setItem('logged_in', 'True');
            window.location.href='./UI/store.html';
        }
        })
    }

