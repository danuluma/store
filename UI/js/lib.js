export function logoutUser(){
    const logoutBtn = document.getElementById('logout');
    logoutBtn.addEventListener('click', function(){
        let me = localStorage.getItem('access_token');
        if (me != null){
            localStorage.removeItem('access_token');
            localStorage.removeItem('cart');
            localStorage.setItem('success', "Logged out Successfully!");
            localStorage.setItem('logged_in', 'False');
            window.location.href='../index.html';
        }
        else {
            // alert("Not logged in")
            localStorage.setItem('error', "Not logged in!");
            window.location.href='../index.html';
        }
    });


    // console.log(logoutBtn);
};

export function showMessage(){
    let error = localStorage.getItem('error');
    let success = localStorage.getItem('success')
    const page = document.querySelector('section .container');
    let div = document.createElement("div"); 
    let para = document.createElement("P");
    console.log(error);
    
    if (error){
        let text = document.createTextNode(error);  
        div.classList.add("error")
        div.appendChild(para);     
        para.appendChild(text);                                          
        page.insertBefore(div, page.children[0]); 
        setTimeout(removenotif, 3000);
        console.log(page);
    }
    if (success){
        let text = document.createTextNode(success);  
        div.classList.add("success")
        div.appendChild(para);     
        para.appendChild(text);                                          
        page.insertBefore(div, page.children[0]);
        setTimeout(removenotif, 3000);
        console.log(page);
    }
    function removenotif(){
        page.removeChild(page.children[0]);
    }
    
    localStorage.removeItem('error');
    localStorage.removeItem('success');
    
}

export const url_base = 'http://localhost:5000/api/v2';
// export const url_base = 'https://dannstore.herokuapp.com/api/v2';
