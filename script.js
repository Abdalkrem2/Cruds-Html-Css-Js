
let title=document.getElementById('title');
let price=document.getElementById('price');
let taxes=document.getElementById('taxes');
let ads=document.getElementById('ads');
let discount=document.getElementById('discount');
let total=document.getElementById('total');
let count=document.getElementById('count');
let category=document.getElementById('category');
let submit=document.getElementById('submit');
let tmp;
let mood='create';
//get total
function getTotal(){
    if(price.value!=''){
        let result=(+(price.value)+ +(taxes.value)+ +(ads.value))- +(discount.value);
        total.innerHTML=result;
        total.style.background='#040'
    }
    else{
        total.innerHTML='';
        total.style.background='#a00d02' 
    }
}
//creat product
let dataPro=[];
if(localStorage.product!=null){
    dataPro=JSON.parse(localStorage.product);
}

submit.onclick=function(){
  
    let newObj={
title:title.value.toLowerCase(),
price:price.value,
taxes:taxes.value,
ads:ads.value,
discount:discount.value,
total:total.innerHTML,
count:count.value,
category:category.value.toLowerCase(),
    }

if(title.value!=''&&price.value!=''&&category.value!=''&&count.value<=100){
if(mood==='create'){
    if(newObj.count>1){
    for(let i=0;i<newObj.count;i++){
dataPro.push(newObj);
}
    }else{
        dataPro.push(newObj); 
    }
}
else{
dataPro[tmp]=newObj;
mood='create';
submit.innerHTML='Create';
count.style.display='block';
}
clearData();
}

localStorage.setItem('product',JSON.stringify(dataPro));

getTotal();
showData();


}


//clear input
function clearData(){
title.value='';
price.value='';
taxes.value='';
ads.value='';
discount.value='';
total.innerHTML='';
count.value='';
category.value='';
}
 

//showData //local Storage
function showData(){



    let table='';
    for(let i=0;i<dataPro.length;i++){
        table+=`   
<tr>
<td>${i+1}</td>
<td>${dataPro[i].title}</td>
<td>${dataPro[i].price}</td>
<td>${dataPro[i].taxes}</td>
<td>${dataPro[i].ads}</td>
<td>${dataPro[i].discount}</td>
<td>${dataPro[i].total}</td>
<td>${dataPro[i].category}</td>
<td><button onclick='updateData(${i})' class="update">update</button></td>
<td><button onclick='deleteData(${i})' class="delete">delete</button></td>
    </tr>`
    
    }
    document.getElementById('tableBody').innerHTML=table;
deleteBtn=document.querySelector('.deleteAll');
    if(dataPro.length>0){
deleteBtn.style.display='block';
deleteBtn.innerHTML=`Delete All (${dataPro.length})`
}
else{
    deleteBtn.style.display='none';
}
    }
 showData();

//delete
function deleteData(index){
dataPro.splice(index,1);
localStorage.product=JSON.stringify(dataPro); showData();
}

function deleteAll(){
dataPro.splice(0);
localStorage.product=JSON.stringify(dataPro); showData();
}



//update
function updateData(index){
title.value=dataPro[index].title;
price.value=dataPro[index].price;
taxes.value=dataPro[index].taxes;
ads.value=dataPro[index].ads;
discount.value=dataPro[index].discount;
price.value=dataPro[index].price;
category.value=dataPro[index].category;
getTotal();
count.style.display='none';
submit.innerHTML='Update';
mood='update';
tmp=index;
scroll({

    top:0,
    behavior:'smooth'
})

}


//search
let searchMood='title'
function getSearchMood(id){
    let search =document.getElementById('search');
    if(id=='searchTitle'){
        searchMood='title';
        search.placeholder='Search by Title'
    }else{
        searchMood='category';
        search.placeholder='Search by Category'
    }
   
    search.focus();

}

function searchData(value){
    let table='';
    if(searchMood=="title"){
for(let i=0;i<dataPro.length;i++){
if(dataPro[i].title.includes(value.toLowerCase())){
    table+=`   
    <tr>
    <td>${i+1}</td>
    <td>${dataPro[i].title}</td>
    <td>${dataPro[i].price}</td>
    <td>${dataPro[i].taxes}</td>
    <td>${dataPro[i].ads}</td>
    <td>${dataPro[i].discount}</td>
    <td>${dataPro[i].total}</td>
    <td>${dataPro[i].category}</td>
    <td><button onclick='updateData(${i})' class="update">update</button></td>
    <td><button onclick='deleteData(${i})' class="delete">delete</button></td>
        </tr>`  
}
}
}else{
    for(let i=0;i<dataPro.length;i++){
        if(dataPro[i].category.includes(value.toLowerCase())){
            table+=`   
            <tr>
            <td>${i+1}</td>
            <td>${dataPro[i].title}</td>
            <td>${dataPro[i].price}</td>
            <td>${dataPro[i].taxes}</td>
            <td>${dataPro[i].ads}</td>
            <td>${dataPro[i].discount}</td>
            <td>${dataPro[i].total}</td>
            <td>${dataPro[i].category}</td>
            <td><button onclick='updateData(${i})' class="update">update</button></td>
            <td><button onclick='deleteData(${i})' class="delete">delete</button></td>
                </tr>`  
        }
        }
}
document.getElementById('tableBody').innerHTML=table;

}

//clean data
