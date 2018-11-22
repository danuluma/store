const cat = document.querySelector('.catalogue li');
import {logoutUser, url_base, showMessage} from './lib.js';
logoutUser();
showMessage();
// setTimeout(showMessage, 3000);


cat.addEventListener('click', addBookToCart);



// const url_base = 'http://localhost:5000/api/v2';
// const url_base = 'https://dannstore.herokuapp.com/api/v2'

if(localStorage.getItem('logged_in') == 'False'){
  window.location.href='../index.html';
  // alert("Please log in first")
};

getBooksFunction();
function getBooksFunction(e) {
  let element;

  let access_token = localStorage.getItem('access_token');
  element = e;
  const url = url_base + '/products';
  fetch(url, {
    "async": true,
    "crossDomain": true,
    // "url": url,
    "method": "GET",
    "headers": {
      "Authorization": "Bearer " + access_token,
      "Content-Type": "application/json",
      "Cache-Control": "no-cache"
    }
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      localStorage.setItem("books", JSON.stringify(data))
      let output = '';
      data.forEach(function (book) { 
        output += `
        <div>
            <img src=${book.image_url} />
            <h2>${book.title}</h2>
            <h4><span class="available">Available: ${book.quantity}</span> | <span class="min">Min: ${book.minimum}</span></h4>
            <p>
              <p>
              ${book.description}
               </p>
            </p>
            <div class="price">
              Ksh <span>${book.price}</span>
              <form class="form buy-book" method="" action="">
              
                <input type="submit" value="Add to Cart" />
              </form>
            </div>
            <span id="book_id">${book.id}</span>
            </div>
        `;
      });
      cat.innerHTML = output;
    })
}


function addBookToCart(e) {
  let element;
  element = e;
  e.preventDefault();
  if (e.target.type == 'submit'){
    const book = e.target.parentElement;
    let book_details =book.parentElement.parentElement;

    let access_token = localStorage.getItem('access_token');
    let book_id = book_details.querySelector('#book_id').textContent;
    let books = JSON.parse(localStorage.getItem("books"))
    books.forEach(function (book){
      if (book.id == book_id){
        if (book.quantity <= book.minimum){
          alert("Sorry this book is out of stock!")
        }
        else {
          let to_cart = {
            "title": book_details.querySelector('h2').textContent,
            "price": book_details.querySelector('div .price span').textContent,
            "book_id": book_id
          }
      
      
          // localStorage.removeItem("cart");
          let cart;
          if (localStorage.getItem("cart") == null){
              cart = [];
          } else {
              cart = (JSON.parse(localStorage.getItem("cart")));
          }
      
          cart.push(to_cart);
          console.log(JSON.stringify(cart));
          localStorage.setItem("cart", JSON.stringify(cart))
          alert("Book added to cart!")
      
        }
      }

    })


    }
  }
 
  

  // function addBookToCart(e) {
  //   let element;
  //   element = e;
  //   e.preventDefault();
  //   const url = url_base + '/login';
  //   fetch(url, {
  //       "async": true,
  //       "crossDomain": true,
  //       "url": url,
  //       "method": "POST",
  //       "headers": {
  //           "Content-Type": "application/json",
  //           "Cache-Control": "no-cache"
  //       },
  //       body:JSON.stringify({
  //           "username": username,
  //       "password": password})
  //     })
  //     .then((res) => res.json())
  //     .then((data) => {
  //       console.log(data)
  //       })
  //   }


  // const url = url_base + '/sales';

  // fetch(url, {
  //     "async": true,
  //     "crossDomain": true,
  //     "url": url,
  //     "method": "POST",
  //     "headers": {
  //       "Authorization": "Bearer " + access_token,
  //       "Content-Type": "application/json",
  //       "Cache-Control": "no-cache"
  //     },
  //     body:JSON.stringify({"book_id": book_id})
  //   })
  //     .then((res) => res.json())
  //     .then((data) => {
  //       console.log(data)
  //       })





