window.bookList = [];


function getDataFromLocalStorage(){
  if(!(localStorage.getItem("bookList"))){
    return
  }
  window.bookList = JSON.parse(localStorage.getItem("bookList"));
}


function saveDataToLocalStorage(){
  localStorage.setItem("bookList",JSON.stringify(window.bookList));
}


function renderBookListItems(){
  let list = document.getElementById("books");
  list.innerHTML = "";
  for(let i = 0; i < window.bookList.length; i++){
    let item = document.createElement("li");
    item.innerHTML = window.bookList[i].title;
    list.appendChild(item);
  }
}


function refreshDataView(){
  getDataFromLocalStorage();
  renderBookListItems();

}


refreshDataView();


function getBooks(){
  const choice = document.querySelector('input').value;
  if(choice==""){
    return alert("Book ID is empty")
  }
  const url = `https://openlibrary.org/isbn/${choice}.json`;
  fetch(url)
      .then(res => res.json()) // parse response as JSON
      .then(data => {
        if(data.hasOwnProperty("error")){
          return window.alert("There has been an issue in finding a book with the specific ISBN code. Please check the ISBN code before trying again.");
        }
        if(window.bookList.some(book => book.title == data.title))//handling repititions
        {
          return window.alert("Book's already in the Library.")
        }
        
        window.bookList.push({
          title: data.title,
        });
        saveDataToLocalStorage();
        refreshDataView();
      })
      .catch(err => {
          console.log(`error ${err}`)
      });
}





/*console.log(data.title)
        if(!localStorage.getItem('books')){
          localStorage.setItem('books', data.title)
        }else{
         let books = localStorage.getItem('books') + " ; " + data.title 
         localStorage.setItem('books', books)
        }
        //put title into localStorage
        // let books = localStorage.getItem('books') + " ; " + data.title 
        // localStorage.setItem('books', books)
        document.querySelector('h2').innerText = localStorage.getItem('books')*/