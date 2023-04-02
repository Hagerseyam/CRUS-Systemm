let title = document.getElementById("title");
let price = document.getElementById("price");
let taxes = document.getElementById("taxes");
let Ads = document.getElementById("ads");
let discount = document.getElementById("discount");
let total = document.getElementById("total");
let count = document.getElementById("count");
let category = document.getElementById("category");
let submit = document.getElementById("submit");
let mood = 'create';
let temp;

function gettotal(){

    if( price.value != "" ){
    var result = +price.value + +taxes.value + +Ads.value - (+discount.value)
    total.innerHTML = result;
    total.style.background = "#040";
    } else{
        total.innerHTML = "";
    total.style.background = "rgb(165, 21, 21)";
    }
};

let datapro;

if(localStorage.product != null){
    datapro = JSON.parse(localStorage.product)
}else{
    datapro=[];
}







submit.onclick =function(){
    let newpro = {
        title:title.value.toLowerCase(),
        price:price.value,
        taxes:taxes.value,
        Ads:Ads.value,
        discount:discount.value,
        total:total.innerHTML,
        count:count.value,
        category:category.value.toLowerCase(),
    }
if(mood === "create"){
    if(newpro.count>1){
        for(let i=0;i<newpro.count;i++){
            datapro.push(newpro);

        }
    }else{
            datapro.push(newpro);

        }
    }else{

            datapro[temp] = newpro;
            mood ="create";
            submit.innerHTML="create";
            count.style.display= "block";
        }

    
    localStorage.setItem("product" ,JSON.stringify(datapro));
    console.log(datapro);

    cleardata();
    showdata();
}
showdata();


//clear

function cleardata(){
    title.value = "";
    price.value = "";
    Ads.value = "";
    count.value = "";
    discount.value = "";
    total.innerHTML = "";
    taxes.value = "";

}

//read

function showdata(){
    let table = "";
    gettotal();
    for( let i=0;i<datapro.length;i++){
        table += `
        <tr>
                    <td>${i+1}</td>
                    <td>${datapro[i].title}</td>
                    <td>${datapro[i].price}</td>
                    <td>${datapro[i].taxes}</td>
                    <td>${datapro[i].Ads}</td>
                    <td>${datapro[i].discount}</td>
                    <td>${datapro[i].total}</td>
                    <td>${datapro[i].category}</td>

                    <td> <button id="update" onclick= "updatedata(${i})">update</button></td>
                    <td> <button id="delete" onclick= "deleteData(${i})">delete</button></td>

                </tr>`
    }
    document.getElementById("tbody").innerHTML= table;
    let deleteall = document.getElementById("deleteall");


    if(datapro.length>0){
        deleteall.innerHTML = `<button onclick="deleteall()">delete all (${datapro.length})</button>`
    }else{
        deleteall.innerHTML ="";

    }
}
showdata();

//delete


function deleteData(i){

    datapro.splice(i,1)

    localStorage.product= JSON.stringify(datapro);
    showdata()
}

//delete all

function deleteall(){
    localStorage.clear();
    datapro.splice(0);
    showdata();
}
//update

function updatedata(i){
title.value = datapro[i].title ;
price.value = datapro[i].price;
discount.value = datapro[i].discount;
taxes.value = datapro[i].taxes;
Ads.value = datapro[i].Ads;
category.value = datapro[i].category;

gettotal();
count.style.display= ("none");
submit.innerHTML = "Update";

mood= 'update';
temp = i;
scroll({
    top:0,
    behavior: "smooth",
})
}

//searchmood
let searchmood = 'title'
 
function search(id){
    let search = document.getElementById("search");
    if(id== 'searchtitle'){
        searchmood = 'title';
        search.placeholder = "search by title";
    }else{
        searchmood='category';
        search.placeholder = "search by category";
    }
    search.focus()
    search.value="";
    showdata();  

}

//searchdata

function searchdata(value){

    let table = "";

if(searchmood == "title"){
    for( let i=0;i<datapro.length;i++){
        if(datapro[i].title.includes(value.toLowerCase())){
            
            
            table += `
            <tr>
                        <td>${i}</td>
                        <td>${datapro[i].title}</td>
                        <td>${datapro[i].price}</td>
                        <td>${datapro[i].taxes}</td>
                        <td>${datapro[i].Ads}</td>
                        <td>${datapro[i].discount}</td>
                        <td>${datapro[i].total}</td>
                        <td>${datapro[i].category}</td>
    
                        <td> <button id="update" onclick= "updatedata(${i})">update</button></td>
                        <td> <button id="delete" onclick= "deleteData(${i})">delete</button></td>
    
                    </tr>`
            console.log(datapro[i]);
                    }
                    document.getElementById("tbody").innerHTML= table;

    }

}else{
    for( let i=0;i<datapro.length;i++){
        if(datapro[i].category.includes(value.toLowerCase())){
            
            
            table += `
            <tr>
                        <td>${i}</td>
                        <td>${datapro[i].title}</td>
                        <td>${datapro[i].price}</td>
                        <td>${datapro[i].taxes}</td>
                        <td>${datapro[i].Ads}</td>
                        <td>${datapro[i].discount}</td>
                        <td>${datapro[i].total}</td>
                        <td>${datapro[i].category}</td>
    
                        <td> <button id="update" onclick= "updatedata(${i})">update</button></td>
                        <td> <button id="delete" onclick= "deleteData(${i})">delete</button></td>
    
                    </tr>`
            
                    }
                    document.getElementById("tbody").innerHTML= table;

    }

}

}

