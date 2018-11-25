const editBook = document.querySelector('body section .edit-item');
import {logoutUser, url_base, showMessage} from './lib.js';
logoutUser();
showMessage();



editBook.addEventListener('submit', uploadImage);


if(localStorage.getItem('logged_in') == 'False'){
    window.location.href='../index.html';
    localStorage.setItem('error', "Please log in first");
  };
  
let book_id = JSON.parse(localStorage.getItem("edit_book"));

let title = document.querySelector('#title');
let description = document.querySelector('#description');
let price = document.querySelector('#price');
let quantity = document.querySelector('#quantity');
let min = document.querySelector('#min');
let image = document.querySelector('#image');

getBookFunction();
function showBook(data){
    title.setAttribute("value", data.title);
    description.setAttribute("value", data.description);
    price.setAttribute("value", data.price);
    quantity.setAttribute("value", data.quantity);
    min.setAttribute("value", data.minimum);
}

function getBookFunction(e) {
    let access_token = localStorage.getItem('access_token');
    const url = url_base + '/products/' + book_id;
    // let data1;
    fetch(url, {
      "async": true,
      "crossDomain": true,
      "url": url,
      "method": "GET",
      "headers": {
        "Authorization": "Bearer " + access_token,
        "Content-Type": "application/json",
        "Cache-Control": "no-cache"
      }
    })
      .then((res) => res.json())
      .then((data) => {
        showBook(data);
      })
    // return data1
  }
  

function editProductFunction(image_url) {
    // e.preventDefault();
    // alert(book_id)
    // uploadImage(document.querySelector('#new-book #image').files[0]);
    let title = document.querySelector('#title').value;
    let description = document.querySelector('#description').value;
    let price = document.querySelector('#price').value;
    let quantity = document.querySelector('#quantity').value;
    let min = document.querySelector('#min').value;
    let image = document.querySelector('#image').value;
    // let image_url = 'https://res.cloudinary.com/danuluma/image/upload/v1541557642/dannstore/aaaindex.png';
    // let image_url = localStorage.getItem('image_url');
    console.log(image)
    let access_token = localStorage.getItem('access_token');
    const url = url_base + '/products/' + book_id;
    fetch(url, {
        "async": true,
        "crossDomain": true,
        "url": url,
        "method": "PUT",
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
            localStorage.setItem('error', JSON.stringify(data.Error));
            showMessage();
            // alert(JSON.stringify(data.Error))
        }
        if (data.Message){
            localStorage.setItem('success', JSON.stringify(data.Message));
            // alert(JSON.stringify(data.Message))
            window.location.href='./product.html'
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
                editProductFunction(image_url);     
            }
        })
        .catch(err => {
            confirm("Error encountered. Continue without an image?");
            editProductFunction("#");       
        })
        }
    