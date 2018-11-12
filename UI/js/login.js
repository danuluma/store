const loginForm = document.getElementById('login-form');
const loginName = document.querySelector('#login-form #username');
const loginPassw = document.querySelector('#login-form #passw');
const retinfo = document.querySelector('#show-info');



loginForm.addEventListener('submit', getTokenFunction);



const url_base = 'http://localhost:5000/api/v2'
// const url_base = 'https://dannstore.herokuapp.com/api/v2'

function getTokenFunction(e) {
    let element;
    let username = loginName.value;
    let password = loginPassw.value;

    element = e;
    e.preventDefault();
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
        body:JSON.stringify({
            "username": username,
        "password": password})
      })
      .then((res) => res.json())
      .then((data) => {
        localStorage.setItem('access_token', data.access_token);
        localStorage.setItem('user_role', data.role);
        localStorage.setItem('username', username);

        localStorage.setItem('logged_in', 'True');
        // let me = localStorage.getItem('access_token');
        // info = '<h3> </h3>'
        // if (data.access_token) {
        //     alert("Signed in successfully");
            // setTimeout(function () {
                window.location.href='store.html';
                // alert("Signed in successfully");
            // }, 10000);
    
        // }
        // else{
        //     info += `Wrong username or password`;
        //     retinfo.innerHTML = info;
        // }
        })
    }

