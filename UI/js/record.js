const sales = document.querySelector('#sales');
import {logoutUser, url_base, showMessage} from './lib.js';
logoutUser();
showMessage();


if(localStorage.getItem('logged_in') == 'False'){
  localStorage.setItem('error', "Please log in first");
  window.location.href='../index.html';
};


getSalesFunction();
function getSalesFunction(e) {
  let element;

  let access_token = localStorage.getItem('access_token');
  element = e;
  const url = url_base + '/sales';
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

      let salesData = data.Sales;
      if (!salesData){
        localStorage.setItem('error', "No sales available");
        return window.location.href='./store.html';
      }
      // console.log(salesData);

      let output = `<div class="record">
      <div class="date">
        <h2>Date</h2>
      </div>

      <div class="description">
       <h2>Description</h2>
     </div>

     <div class="attendant">
      <ul>
        <h2>Attendant</h2>
      </ul>
    </div>
  </div>`;
      salesData.forEach(function (sale) { 
        let time = sale.created_at.split('.')
        let books_sold = sale.books;
        let books = ``;

        console.log(books);
        
        books_sold.forEach(function (book_id){
          
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
              localStorage.setItem('temp_book', JSON.stringify(data));
              // console.log(data);
              // thisBook(data);

          })
          let data2 = JSON.parse(localStorage.getItem('temp_book'));
          // books += `<p>Title: ${data2.title} Price: ${data2.price}</p>`;
          books += `<div id="item">
            <div>${data2.title}</div>
            <div>${data2.price}</div>
          </div>`
        })
        console.log(books)
        // console.log(time);
        output += `
        <div class="record">
        <div class="date">
          <p>${time[0]}</p>
        </div>

        <div class="description">
          ${books}

          <br>
          <div id="item">
            <div>Total:</div>
            <div>Ksh ${sale.total}</div>
          </div>
        </div>

        <div class="attendant">
          <p>${sale.attendant_name}</p>
        </div>
      </div>

        `;
      });
      sales.innerHTML = output;
    })
}

