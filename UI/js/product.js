const prod = document.querySelector('body section .container');

// prod.addEventListener('click', addBookToCart);


console.log(prod)
const url_base = 'http://localhost:5000/api/v2';
// const url_base = 'https://dannstore.herokuapp.com/api/v2'

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
      console.log(data);
      localStorage.setItem("books", JSON.stringify(data))
      let output = '';
      data.forEach(function (book) { 
        console.log(book);
        output += `
        <div>
        <table class="products">
        <tr class="">
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
          <td class="actions">
            <ul>
              <li><a href="edit.html">Edit</a></li>
              <li><a href="#">Delete</a></li>
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

