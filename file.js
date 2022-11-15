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
    if(amountEl.value === "" || descriptionEl.value === ""){
        alert("Please fill all the details")
    }else {
    const expenseObj={
        amount : amountEl.value,
        description :descriptionEl.value,
        category : categoryEl.value
    }
    axios.post("https://crudcrud.com/api/1d252619bc984b488404f912aad28dc8/ExpenseData",expenseObj)
    .then((response)=>{
        createLi(response.data)
    })
    
    amountEl.value=" ";
    descriptionEl.value=" ";
    }
}

function createLi(data){
    ul.innerHTML=ul.innerHTML+`<li id="${data._id}"> ${data.amount} - ${data.category} - ${data.description} <div><button class="edit" onclick="edit('${data._id}')">Edit Expense</button><button class="delete" onclick="del('${data._id}')">Delete Expense</button></div></li>`;
}

function edit(id){
    axios.get(`https://crudcrud.com/api/1d252619bc984b488404f912aad28dc8/ExpenseData/${id}`)
    .then((response)=>{
        amountEl.value=response.data.amount;
        descriptionEl.value=response.data.description;
    })
    .catch((err)=> console.log(err))
   
    del(id)
}

function del(id){
    axios.delete(`https://crudcrud.com/api/1d252619bc984b488404f912aad28dc8/ExpenseData/${id}`)
    removeFromScreen(id);
}

function removeFromScreen(id){
    liToBeRemoved=document.getElementById(id);
    if(liToBeRemoved){
        ul.removeChild(liToBeRemoved) 
    } 
}

function onReload(){
    axios.get("https://crudcrud.com/api/1d252619bc984b488404f912aad28dc8/ExpenseData")
    .then((response)=>{
        (response.data).forEach((data)=>{
            createLi(data)        
        })
    })
    .catch((err)=> console.log(err))
   
}
