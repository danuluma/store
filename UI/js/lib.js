export function logoutUser(){
    const logoutBtn = document.getElementById('logout');
    logoutBtn.addEventListener('click', function(){
        let me = localStorage.getItem('access_token');
        if (me != null){
            localStorage.removeItem('access_token');
            localStorage.removeItem('cart');
            // console.log(me);
            // setTimeout ( function(){
            alert("Logged out successfully!");
            // });
            localStorage.setItem('logged_in', 'False');
            window.location.href='index.html';
        }
        else {
            // alert("Not logged in")
            window.location.href='index.html';
        }
    });


    // console.log(logoutBtn);
};

export const url_base = 'http://localhost:5000/api/v2';
