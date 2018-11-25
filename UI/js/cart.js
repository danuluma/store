const cart = document.querySelector('body section .container');
const checkout = document.querySelector('body .checkout input');
import {logoutUser, url_base, showMessage} from './lib.js';
logoutUser();
showMessage();

checkout.addEventListener('click', create_sale);

if(localStorage.getItem('logged_in') == 'False'){
  window.location.href='../index.html';
  localStorage.setItem('error', "Please log in first!");
};

showCartItems();

function showCartItems() {
    let body = cart.querySelector('tbody');
    let foot = cart.querySelector('tfoot .price');

    let items = (JSON.parse(localStorage.getItem("cart")));
    if(items == null){
      window.location.href='./store.html';
      localStorage.setItem('success', "Please add items to your cart");
    }
    else {
      console.log(items);
      let total = 0;
      let list = [];
      let output = '';
        items.forEach(function (book) { 
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
            localStorage.setItem('sucess', JSON.stringify(data));
            // alert(JSON.stringify(data));
            localStorage.removeItem("book_list");
            localStorage.removeItem("cart");
            window.location.href='./store.html';
            })
      }
      else{
        localStorage.setItem('error', "Only attendants can make sales!");
        // alert("Only attendants can make sales!")
        window.location.href='../index.html';
        
      }

    }
