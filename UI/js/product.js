const prod = document.querySelector('body section .container');
import {logoutUser, url_base} from './lib.js';
logoutUser();


// prod.addEventListener('click', addBookToCart);


// console.log(prod)
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
      // console.log(data);
      localStorage.setItem("books", JSON.stringify(data))
      let output = '';
      data.forEach(function (book) { 
        // console.log(book);
        output += `
        <div>
        <table class="products">
        <tr class="prod_details">
          <td class="image">
            <img class="list_image" src=${book.image_url} />

          </td>
          <td class="description">
            <h1>${book.title}</h1>
            <h4><span class="available">Available: ${book.quantity}</span> | <span class="min">Min: ${book.minimum}</span></h4>
            <p>
            ${book.description}
            </p>
          </td>
          <td class="actions" >
            <ul>
              <li><a href=# type="edit" id="${book.id}">Edit</a></li>
              <li><a href=# type='delete' id="${book.id}">Delete</a></li>
            </ul>
          </td>
        </tr>
      </table>
    
        </div>
        `;
      });
      prod.innerHTML = output;
    })
}

actions = prod.getElementsByClassName("actions")
console.log(actions);

prod.addEventListener('click', deleteThis);

function deleteThis(e){
  e.preventDefault();
  console.log(e.target.type);
  if (e.target.type == 'edit'){
    localStorage.setItem("edit_book", JSON.stringify(e.target.id));
    window.location.href='edit.html';
  }

  if (e.target.type == 'delete'){
    let book_id = e.target.id;
    let url = url_base + '/products/' + book_id;
    let access_token = localStorage.getItem('access_token');
    console.log(access_token)
    fetch(url, {
            "async": true,
            "crossDomain": true,
            "url": url,
            "method": "DELETE",
            "headers": {
                "Authorization": "Bearer " + access_token,
                "Content-Type": "application/json",
                "Cache-Control": "no-cache"
            }
          })
          .then((res) => res.json())
          .then((data) => {
            window.location.href='product.html';
            })
  }
}

