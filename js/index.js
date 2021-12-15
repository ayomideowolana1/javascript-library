class Book{
    constructor(title,author,numOfPages,read,index){
        this.title = title;
        this.author = author;
        this.numOfPages = numOfPages;
        this.read = read;
        this.index = index;
        this.get = (prop) => {
            return this[prop]
        }
        this.changeRead=()=>{
            this.read = !this.read
        }
    }
}

const Module =(()=>{
    let count = 0;
    const books = [];
    const inputsArray = Array.from(document.querySelectorAll("input"));
    // get details from form
    _getDeatils=()=>{
        let details = {
            title: inputsArray[0].value,
            author:inputsArray[1].value,
            numOfPages: inputsArray[2].value,
            read: inputsArray[3].checked,
            index: count
        }

        console.log(details.read)

        if(details.title && details.author && details.numOfPages){
            count++;
            return details
       }else{
           return null
       }
    }

    //add a book to array
    addBook=()=>{
        let details = _getDeatils()
        if(details){
            let placeHolder = "book" + details.index
            placeHolder = new Book(details.title,details.author,details.numOfPages,details.read,details.index)
            books.push(placeHolder)
            if(books.length>2){
            }
            console.log(books)
        }else{
            alert("Please fill in the empty fields")
        }
        inputsArray.forEach(input =>{
            input.value = "";
        })
        renderTable()
    }

    // delete a book
    deleteBook=(index)=>{
        books.pop(index)
    }

    //change read status
    changeRead = (index) =>{
        books[index].read = !books[index].read;
        Table.renderTable()
    }

    set = () =>{
        const addBook = document.querySelector("#addBook");
        addBook.addEventListener("click",Module.addBook);

        const delArr = document.querySelectorAll(".delBtn");
        delArr.forEach(btn => {
            btn.addEventListener("click",(e)=>{
                deleteBook(e.target.id)
                console.table(books)
                Table.renderTable()
            })
        })

        const checkedArr =  document.querySelectorAll(".checkBtn");
        checkedArr.forEach(checkbox=>{
            checkbox.addEventListener("change",(e)=>{
                books[e.target.id].checked = !books[e.target.id].checked;
                console.log(books[e.target.id].checked);
            })
        })
        
    }

    

    return{addBook,books,deleteBook,set}
})()

const Table = (()=>{
    let _books = Module.books

     //render table
     renderTable=()=>{
        const table = document.querySelector("#table")
            table.innerHTML = ""
        let cont = document.createElement("div")
        
        cont.classList.add("bookCont");
        let title = document.createElement("p");
        let author = document.createElement("p");
        let numOfPages = document.createElement("p");
        let label =  document.createElement("label");
            label.innerHTML= "I have read this book"
        let read = document.createElement("input");
            read.type="checkbox";
        let delBtn = document.createElement("button");
            delBtn.innerText = "Delete";
            

        
        for(let i=0; i<_books.length; i++){
            cont.id = i;
            title.innerHTML = `Book title: ${_books[i].title}`;
            author.innerHTML = `Book author: ${_books[i].author}`;
            numOfPages.innerHTML = `Number of pages: ${_books[i].numOfPages}`;
            read.checked = _books[i].read ;
            read.classList.add("checkBtn")
            read.id = _books[i].index
            label.append(read);
            delBtn.id = _books[i].index
            delBtn.classList.add("delBtn")
            cont.append(title,author,numOfPages,label,delBtn);
            table.append(cont.cloneNode(true));
            
        }
        Module.set()
    } 
    return{renderTable}
})()

Module.set()
