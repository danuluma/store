const sales = document.querySelector('.record');




const url_base = 'http://localhost:5000/api/v2';
// const url_base = 'https://dannstore.herokuapp.com/api/v2'

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
      console.log(data);
    //   let output = '';
    //   data.forEach(function (book) { 
    //     output += `
    //         <img src="#" />
    //         <h2>${book.title}</h2>
    //         <h4><span class="available">Available: ${book.quantity}</span> | <span class="min">Min: ${book.minimum}</span></h4>
    //         <p>
    //           <p>
    //           ${book.description}
    //            </p>
    //         </p>
    //         <div class="price">
    //           Ksh ${book.price}
    //           <form class="form buy-book" method="" action="">
    //           <span id="book_id">${book.id}</span>
    //             <input type="submit" value="Add to Cart" />
    //           </form>
    //         </div>
    //     `;
    //   });
    //   cat.innerHTML = output;
    })
}

