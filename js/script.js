// total price                 done
// create                      done
// save local strorag          done
// clear data                  done
// read                        done
//count 
//delet
//update
//search
//clean data



let price= document.getElementById('price');
let taxes= document.getElementById('taxes');
let ads= document.getElementById('ads');
let discount= document.getElementById('discount');
let total= document.getElementById('total');
let count= document.getElementById('count');
let category= document.getElementById('category');
let submit= document.getElementById('submit');                            // create button
let title =document.getElementById('title');
let inputs=document.getElementsByName('inputs')
let mode="create"

function getTotal(){
    if(price.value!=''){
        let result=(+price.value+ +taxes.value+ +ads.value)- +discount.value
        total.innerHTML= +result +" $";

        total.style.backgroundColor="#040"
    }else{
        total.innerHTML='';
        total.style.backgroundColor="#a00d02"

    }
}
// /////////////////////////////////////////
let dataProduct;
if(localStorage.product!=null){
    dataProduct= JSON.parse(localStorage.product)
}else{
    dataProduct=[];
}
// ////////////////////////////////////////
submit.onclick =()=>{                      // create button 
    var newProduct={
        title:title.value.toLowerCase(),
        price:price.value,
        taxes:taxes.value,
        ads:ads.value,
        discount:discount.value,
        total:total.innerHTML,
        count:count.value,
        category:category.value.toLowerCase(),
    }
    if(title.value!='' && price.value!='' && category.value!=''){
          if(mode==="create"){
            
                        if(newProduct.count>1 && newProduct.count<=100){
                            for(let i=0;i<newProduct.count;i++){
                            dataProduct.push(newProduct);
                            }
                        }else if(newProduct.count==1 || newProduct.count==''){    dataProduct.push(newProduct);
                        }
                    }
                    clearData();

            }else{
                dataProduct[index]=newProduct;
                mode='create'
                submit.innerHTML='Create'
                count.style.display='block'
            }

   
          
   localStorage.setItem('product',JSON.stringify(dataProduct))
   readData();
}

function clearData(){
    inputs.forEach(input=>{
        input.value='';
   })
   total.innerHTML='';
}

///////////////////////////////////////////
function readData(){
 let table=''
 getTotal();
 for(let i=0;i<dataProduct.length;i++){

    table+=
    `
    <tr>
        <td>${i+1}</td>
        <td>${dataProduct[i].title}</td>
        <td>${dataProduct[i].price}</td>
        <td>${dataProduct[i].taxes}</td>
        <td>${dataProduct[i].ads}</td>
        <td>${dataProduct[i].discount}</td>
        <td>${dataProduct[i].total}</td>
        <td>${dataProduct[i].category}</td>
        <td><button id="update" onclick="updateData(${i})">update</button></td>
        <td><button id="delete" onclick="deletData(${i})">delete</button></td>
    </tr>
    `
 }

 let tableProduct=document.getElementById('table');
 tableProduct.innerHTML=table;

 let deleteAll=document.getElementById('deleteAll');
 if(dataProduct.length > 0){
    deleteAll.innerHTML=`<button onclick="deletAll()">Delete All (${dataProduct.length})</button>`
 }else{
    deleteAll.innerHTML='';
 }
}
readData();
// ///////////////////////////////////////////////////////
function deletData(i){
    dataProduct.splice(i,1);
    localStorage.product= JSON.stringify(dataProduct);
    readData();
}
// ///////////////////////////////////////////////////////////
function  deletAll(){
    dataProduct=[]
    localStorage.product= JSON.stringify(dataProduct);
    readData();
}
// //////////////////////////////////////////////////////
var index;
function updateData(i){
     index=i;
    submit.innerHTML="Update"
    title.value=dataProduct[i].title;
    price.value=dataProduct[i].price;
    taxes.value=dataProduct[i].taxes;
    ads.value=dataProduct[i].ads;
    discount.value=dataProduct[i].discount;
    count.style.display='none'
    category.value=dataProduct[i].category;
    getTotal();
    mode='update'
    scroll({
        top:0,
        behavior:"smooth",
    })
}
// /////////////////////////////////////////////////////////z
let searchMode='title'
function getSearchMode(id){
    let search=document.getElementById('search')
    if(id==='searchTitle'){
        searchMode='title'
    }else{
        searchMode='category'
    }
    search.placeholder='Search by '+searchMode;

    search.focus();
    search.value=''
    readData()
}
function searchData(value){
    let table='';
    for(let i=0;i<dataProduct.length;i++){

    if(searchMode=='title'){
            if(dataProduct[i].title.includes(value.toLowerCase())){
                
                table+=
                `
                <tr>
                    <td>${i+1}</td>
                    <td>${dataProduct[i].title}</td>
                    <td>${dataProduct[i].price}</td>
                    <td>${dataProduct[i].taxes}</td>
                    <td>${dataProduct[i].ads}</td>
                    <td>${dataProduct[i].discount}</td>
                    <td>${dataProduct[i].total}</td>
                    <td>${dataProduct[i].category}</td>
                    <td><button id="update" onclick="updateData(${i})">update</button></td>
                    <td><button id="delete" onclick="deletData(${i})">delete</button></td>
                </tr>
                ` ;
               
            }
        }else{
    
            if(dataProduct[i].category.includes(value.toLowerCase())){ 
                table+=
                `
                <tr>
                    <td>${i+1}</td>
                    <td>${dataProduct[i].title}</td>
                    <td>${dataProduct[i].price}</td>
                    <td>${dataProduct[i].taxes}</td>
                    <td>${dataProduct[i].ads}</td>
                    <td>${dataProduct[i].discount}</td>
                    <td>${dataProduct[i].total}</td>
                    <td>${dataProduct[i].category}</td>
                    <td><button id="update" onclick="updateData(${i})">update</button></td>
                    <td><button id="delete" onclick="deletData(${i})">delete</button></td>
                </tr>
                ` ;
                    }
    }
    }
    let tableProduct=document.getElementById('table');
    tableProduct.innerHTML=table;
}
