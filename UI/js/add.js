const newBook = document.querySelector('body section .new-item');
import {logoutUser, url_base} from './lib.js';
logoutUser();



newBook.addEventListener('submit', uploadImage);

// console.log(newBook)
// const url_base = 'http://localhost:5000/api/v2'
// const url_base = 'https://dannstore.herokuapp.com/api/v2'

if(localStorage.getItem('logged_in') == 'False'){
    window.location.href='../index.html';
    // alert("Please log in first")
  };
  

function addBookFunction(image_url) {
    
    // alert("Hey")
    // uploadImage(document.querySelector('#new-book #image').files[0]);
    // let element;
    let title = document.querySelector('#title').value;
    let description = document.querySelector('#description').value;
    let price = document.querySelector('#price').value;
    let quantity = document.querySelector('#quantity').value;
    let min = document.querySelector('#min').value;
    // let image = document.querySelector('#image').value;
    // let image_url = 'https://res.cloudinary.com/danuluma/image/upload/v1541557642/dannstore/aaaindex.png';
    // let image_url = localStorage.getItem('image_url');
    // console.log(image_url)
    let access_token = localStorage.getItem('access_token');
    
    // element = e;
    const url = url_base + '/products';
    console.log(JSON.stringify({
        "title": title,
        "description": description,
        "category": "category",
        "price": price,
        "quantity": quantity,
        "minimum": min,
        "image_url": image_url
    }));
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
            "title": title,
            "description": description,
            "category": "category",
            "price": price,
            "quantity": quantity,
            "minimum": min,
            "image_url": image_url
        })
      })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.Error){
            alert(JSON.stringify(data.Error))
        }
        if (data.message){
            alert(JSON.stringify(data.message))
        }
        // window.location.href='add.html'
        })
    }


function uploadImage(e) {
    e.preventDefault();
    let file = document.querySelector('#image').files[0];
    console.log(file);
    const cloudinary_url = 'https://api.cloudinary.com/v1_1/danuluma/image/upload';
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", 'ry6j3ae4'); 

    fetch(cloudinary_url, {
        method: 'POST',
        body: data
    })
        .then(response => response.json())
        .then(data => {
            console.log(data.secure_url)
            if (data.secure_url !== '') {
                let image_url = data.secure_url;
                addBookFunction(image_url);     
            }
        })
        .catch(err => {
            console.error(err);
            confirm("Error encountered. Continue without an image?");
            addBookFunction("#");       
        })
    }
