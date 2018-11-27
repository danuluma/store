const regForm = document.getElementById('reg-form');
const regName = document.querySelector('#reg-form #username');
const regPassw = document.querySelector('#reg-form #passw');
const confirmPassw = document.querySelector('#reg-form #confirm_passw');
import {logoutUser, url_base, showMessage} from './lib.js';
logoutUser();
showMessage();

regForm.addEventListener('submit', signupUserFunction);

if(localStorage.getItem('logged_in') == 'False'){
    localStorage.setItem('error', "Please log in first");
    window.location.href='../index.html';
  };
  

function signupUserFunction(e) {
    let element;
    let username = regName.value;
    let password = regPassw.value;
    let confirmpassword = confirmPassw.value;
    if (password !== confirmpassword){
        localStorage.setItem('error', "Please log in first");
        showMessage();
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
            localStorage.setItem('error', JSON.stringify(data.Error));
            showMessage();
            }
        else{
            localStorage.setItem('success', "Registration successful!");
            showMessage();
        }
        })
    }

