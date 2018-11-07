const newBook = document.querySelector('body section .new-item');


newBook.addEventListener('submit', addProductFunction);

// console.log(newBook)
const url_base = 'http://localhost:5000/api/v2'
// const url_base = 'https://dannstore.herokuapp.com/api/v2'

function addProductFunction(e) {
    e.preventDefault();
    // alert("Hey")
    // uploadImage(document.querySelector('#new-book #image').files[0]);
    // let element;
    let title = document.querySelector('#title').value;
    let description = document.querySelector('#description').value;
    let price = document.querySelector('#price').value;
    let quantity = document.querySelector('#quantity').value;
    let min = document.querySelector('#min').value;
    let image = document.querySelector('#image').value;
    let image_url = 'https://res.cloudinary.com/danuluma/image/upload/v1541557642/dannstore/aaaindex.png';
    // let image_url = localStorage.getItem('image_url');
    console.log(image)
    let access_token = localStorage.getItem('access_token');
    // element = e;
    const url = url_base + '/products';
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


// function uploadImage(file) {
//     const formData = new FormData();
//     formData.append("file", file);
//     formData.append("upload_preset", 'ry6j3ae4'); 

//     fetch('https://api.cloudinary.com/v1_1/danuluma/image/upload', {
//         method: 'POST',
//         body: formData
//     })
//         .then(response => response.json())
//         .then(data => {
//             console.log(data.secure_url)
//             if (data.secure_url !== '') {
//                 localStorage.setItem('secure_url', data.secure_url);     
//             }
//         })
//         .catch(err => console.error(err))
//     }
