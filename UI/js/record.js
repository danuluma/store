const sales = document.querySelector('#sales');
import {logoutUser, url_base} from './lib.js';
logoutUser();

console.log(sales)



// const url_base = 'https://dannstore.herokuapp.com/api/v2'
if(localStorage.getItem('logged_in') == 'False'){
  window.location.href='index.html';
  // alert("Please log in first")
};


getSalesFunction();
function getSalesFunction(e) {
  let element;

  let access_token = localStorage.getItem('access_token');
  console.log(access_token);
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
      // console.log(salesData);
      
      let output = '';
      salesData.forEach(function (sale) { 
        let time = sale.created_at.split('.')
        // console.log(time);
        output += `
        <div class="record">
        <div class="date">
          <p>${time[0]}</p>
        </div>
  
        <div class="description">
          <div id="item">
            <div>Books</div>
            <div>${sale.books}</div>
          </div>

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

