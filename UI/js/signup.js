const regForm = document.getElementById('reg-form');
const regName = document.querySelector('#reg-form #username');
const regPassw = document.querySelector('#reg-form #passw');
const confirmPassw = document.querySelector('#reg-form #confirm_passw');
import {logoutUser, url_base} from './lib.js';
logoutUser();



// me = localStorage.getItem('access_token');
// console.log(me)

regForm.addEventListener('submit', signupUserFunction);



// const url_base = 'http://localhost:5000/api/v2'
// const url_base = 'https://dannstore.herokuapp.com/api/v2'
if(localStorage.getItem('logged_in') == 'False'){
    window.location.href='../index.html';
    // alert("Please log in first")
  };
  

function signupUserFunction(e) {
    let element;
    let username = regName.value;
    let password = regPassw.value;
    let confirmpassword = confirmPassw.value;
    if (password !== confirmpassword){
        alert("Passwords should match");
        // break;
    }

    let access_token = localStorage.getItem('access_token');
    element = e;
    e.preventDefault();
    const url = url_base + '/signup';
    fetch(url, {
        "async": true,
        "crossDomain": true,
        "url": url,
        "method": "POST",
        "headers": {
            "Authorization": "Bearer " + access_token,
            "Content-Type": "application/json",
            "Cache-Control": "no-cache"
        },
        body:JSON.stringify({
            "username": username,
        "password": password})
      })
      .then((res) => res.json())
      .then((data) => {
        // console.log(data.Error)
        if (data.Error){
            alert(data.Error);
        }
        })
    }

