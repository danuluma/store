const loginForm = document.getElementById('login-form');
const loginName = document.querySelector('#login-form #username');
const loginPassw = document.querySelector('#login-form #passw');



loginForm.addEventListener('submit', getTokenFunction);



const url_base = 'http://localhost:5000/dann/api/v2'
// const url_base = 'https://dannstore.herokuapp.com/'

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
        "url": "http://localhost:5000/dann/api/v2/login",
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
        localStorage.setItem('username', username);
        me = localStorage.getItem('username');
        console.log(me)
        if (me) {
            window.location.href='product.html'
        }
        else{
            alert("Wrong details, try again")
        }
        })
    }
    

