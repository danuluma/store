const loginForm = document.getElementById('login-form');
const loginName = document.querySelector('#login-form #username');
const loginPassw = document.querySelector('#login-form #passw');


import {logoutUser, url_base, showMessage} from './lib.js';
logoutUser();
showMessage();
// setTimeout(showMessage, 3000);



loginForm.addEventListener('submit', getTokenFunction);




// const url_base = 'https://dannstore.herokuapp.com/api/v2'
// console.log(url_base)
if(localStorage.getItem('logged_in') == 'True'){
    window.location.href='./UI/store.html';
    // alert("Please log in first")
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
        // let me = localStorage.getItem('access_token');
        console.log(data)
        if (data.Error){
            alert(data.Error);
            localStorage.setItem('error', data.Error);
            // <div><p>Successfully logged in </p></div>
        }
        else{
            localStorage.setItem('access_token', data.access_token);
            localStorage.setItem('user_role', data.role);
            localStorage.setItem('username', username);
            localStorage.setItem('success', "Success! Logged in");

            localStorage.setItem('logged_in', 'True');
            window.location.href='./UI/store.html';
        }
        // info = '<h3> </h3>'
        // if (data.access_token) {
        //     alert("Signed in successfully");
            // setTimeout(function () {
                // window.location.href='store.html';
                // alert("Signed in successfully");
            // }, 10000);

        // }
        // else{
        //     info += `Wrong username or password`;
        //     retinfo.innerHTML = info;
        // }
        })
    }

