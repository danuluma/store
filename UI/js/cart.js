const cart = document.querySelector('body section .container');
const checkout = document.querySelector('body .checkout input');
import {logoutUser, url_base} from './lib.js';
logoutUser();



checkout.addEventListener('click', create_sale);
// console.log(localStorage.getItem('cart'));



// const url_base = 'http://localhost:5000/api/v2';
// const url_base = 'https://dannstore.herokuapp.com/api/v2'

if(localStorage.getItem('logged_in') == 'False'){
  window.location.href='../index.html';
  // alert("Please log in first")
};
console.log(localStorage.getItem('user_role'));
showCartItems();

function showCartItems() {
    // console.log(cart.querySelector('tfoot .price'));
    let body = cart.querySelector('tbody');
    let foot = cart.querySelector('tfoot .price');

    let items = (JSON.parse(localStorage.getItem("cart")));
    if(items == null){
      window.location.href='store.html';
      // alert("Please log in first")
    }
    else {
      console.log(items);
      let total = 0;
      let list = [];
      let output = '';
        items.forEach(function (book) { 
          // console.log(book);
          // console.log(parseInt(book.price));
          list.push(parseInt(book.book_id));
          total += parseFloat(book.price);
          output += `
          <tr>
            <td class="quantity">1</td>
            <td>${book.title}</td>
            <td class="price">Ksh ${book.price}</td>
          </tr>

          `;
        })
          body.innerHTML = output;
          foot.innerHTML = `Ksh ${total}`;
          localStorage.setItem("book_list", JSON.stringify(list))
          // console.log(list);
    }

}

function create_sale(e){
    e.preventDefault();
    const url = url_base + '/sales';
    let book_list = JSON.parse(localStorage.getItem("book_list"));
    let access_token = localStorage.getItem('access_token');

    
    if(localStorage.getItem('user_role') == 'user'){

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
        body:JSON.stringify({"books_id": book_list})
        })
        .then((res) => res.json())
        .then((data) => {
            console.log(data);
            alert(JSON.stringify(data));
            localStorage.removeItem("book_list");
            localStorage.removeItem("cart");
            window.location.href='./store.html';
            })
      }
      else{
        alert("Only attendants can make sales!")
        window.location.href='../index.html';
        
      }

    }
