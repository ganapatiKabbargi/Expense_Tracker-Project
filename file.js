const amountEl=document.querySelector("#amount")
const descriptionEl=document.querySelector("#desc")
const categoryEl=document.querySelector("#category")
const ul=document.querySelector(".expence-list")
const addButton=document.querySelector(".btn")
const formEl=document.querySelector(".form")


formEl.addEventListener("submit",addexpence)
window.addEventListener("DOMContentLoaded", onReload)

function addexpence(e){
    e.preventDefault()
    if(amountEl.value === "" || descriptionEl.value ===""){
        alert("Please fill all the details")
    }else {
    const expenseObj={
        amount : amountEl.value,
        description :descriptionEl.value,
        category : categoryEl.value
    }
    localStorage.setItem((expenseObj.description) , JSON.stringify(expenseObj))
    createLi(expenseObj)
    amountEl.value=" ";
    descriptionEl.value=" ";
    }
}

function createLi(expObj){
    if(localStorage.getItem(expObj.description) !==null){
        removeFromScreen(expObj.description)
    }
    let parsedExpObj=JSON.parse(localStorage.getItem(expObj.description))
    ul.innerHTML=ul.innerHTML+`<li id="${parsedExpObj.description}"> ${parsedExpObj.amount} - ${parsedExpObj.category} - ${parsedExpObj.description} <div><button class="edit" onclick="edit('${parsedExpObj.description}')">Edit Expense</button><button class="delete" onclick="del('${parsedExpObj.description}')">Delete Expense</button></div></li>`;
}

function edit(obj){
    let parsedObj=JSON.parse(localStorage.getItem(obj))
    localStorage.removeItem(obj);
    amountEl.value=parsedObj.amount;
    descriptionEl.value=parsedObj.description;
    removeFromScreen(obj);
}

function del(obj){
    localStorage.removeItem(obj);
    removeFromScreen(obj);
}

function removeFromScreen(obj){
    liToBeRemoved=document.getElementById(obj);
    if(liToBeRemoved){
        ul.removeChild(liToBeRemoved) 
    } 
}

function onReload(){
    Object.keys(localStorage).forEach((key)=>{
        let expenceinfo=JSON.parse(localStorage.getItem(key))
        createLi(expenceinfo)        
    })
}
