// books list
let Books =[
{
    title: "Anon",
    author: "Ayo",
    numOfPages:200,
    read : true,
    index: 0
}
];
//main object
const  Book = {
init: function(title,author,numOfPages,read,index){
    this.title = title;
    this.author =author;
    this.numOfPages = numOfPages ;
    this.read = read;
    this.index = index
    return this;
} 
}

const addBook = document.querySelector("#addBook")
let currentBook;
// add a new book
addBook.addEventListener("click",()=>{
    // if all values are valid
        let details = getFormDetails();
        let book
        if(details){
            // create new item 
             book = 
                Object.create(Book)
                .init(details.title,details.author,details.numOfPages,details.read,details.index)
            // add new item to Books list
            Books.push(book)
            clearInputs()
            alert(`${details.title} added to library`)
        }
        else{
            alert("Incomplete details")
        }
        
        
        // rerender the table
    renderTable();
})

// table render function
function renderTable(){
    const table = document.querySelector("#table")
    console.table(Books)
    table.innerHTML = "";
    // currentBook.classList.add("active")
    
    let cont = document.createElement("div")
    cont.classList.add("bookCont");
    let title = document.createElement("p");
    let author = document.createElement("p");
    let numOfPages = document.createElement("p");
    let label =  document.createElement("label");
        label.innerHTML= "I have read this book"
    let read = document.createElement("input");
    read.type="checkbox";
    
    for(let i=0; i<Books.length; i++){
        cont.id = i;
        title.innerHTML = `Book title: ${Books[i].title}`;
        author.innerHTML = `Book author: ${Books[i].author}`;
        numOfPages.innerHTML = `Number of pages: ${Books[i].numOfPages}`;
        read.checked = Books[i].read ;
        label.append(read)
        cont.append(title,author,numOfPages,label);
        table.append(cont.cloneNode(true));
        
    }
    //adding an active class to the clicked book
    const conts = Array.from(document.querySelectorAll(".bookCont"))
    conts.forEach(cont =>{
        cont.addEventListener("click",()=>{
            conts.forEach(cont=>{
                cont.classList.remove("active")
            })
            cont.classList.add("active");
            // clicked book variable
            currentBook =  cont.id;
            console.log(currentBook)
            disableButtons()
        })
    })
    
}

// get for details
const inputsArray = Array.from(document.querySelectorAll("input"));
function getFormDetails(){
    // collect the values of all inputs
    let details = {
        title: inputsArray[0].value,
        author:inputsArray[1].value,
        numOfPages: inputsArray[2].value,
        read: inputsArray[3].checked,
        index: Books.length

    }
    // input validation
   if(details.title && details.author && details.numOfPages){
        return details
   }else{
       return null
   }

}


// clear inputs after adding a new item
clearInputs = () =>{
    inputsArray.forEach(input =>{
        input.value = "";
    })
}

//change a books read status
const changeReadBtn = document.querySelector("#changeRead");
    changeReadBtn.addEventListener("click",()=>{
        console.log(Books[currentBook].read)
        Books[currentBook].read = !Books[currentBook].read;
        renderTable()

        console.log(Books[currentBook].read)
    })


//delete a book
const delBtn = document.querySelector("#deleteBook");
    delBtn.addEventListener("click",()=>{
        Books.pop(currentBook);
        renderTable()
        currentBook = null
    })



// initial table redndering


// disable buttons
function disableButtons(){
    if(!currentBook){
        delBtn.disabled = true
        changeReadBtn.disabled = true
    }else{
        delBtn.disabled = false
        changeReadBtn.disabled = false
    }
}

renderTable()
disableButtons()