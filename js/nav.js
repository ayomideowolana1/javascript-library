const formCont = document.querySelector("#formCont")
const tableCont = document.querySelector("#tableCont")
const formBtn = document.querySelector(".showForm")
const tableBtn = document.querySelector(".showTable")

function hide(x){
    x.style.display = "none";
}
function show (x){
    x.style.display = "block";
}


formBtn.addEventListener("click",()=>{
    show(formCont);
    hide(tableCont);
})

tableBtn.addEventListener("click",()=>{
    show(tableCont);
    hide(formCont);
})


clearInputs = () =>{
    inputsArray.forEach(input =>{
        input.value = ""
    })
}