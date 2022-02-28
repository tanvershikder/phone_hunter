// api call
const searchPhone = () =>{
    const errorMsg = document.getElementById('error');
    const searchFild = document.getElementById('search_fild')
    const searchText = searchFild.value ;
    console.log(searchText);
    //clear the value
    searchFild.value = '';

    // validation chack 
    if(searchText == false){
        errorMsg.style.display = 'inline-block';
        // alert("write somethig to display");
    }

    else{
        fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`)
        .then(res => res.json())
        .then(data => displaySearch(data.data));
    }
}
//display search
 const displaySearch = phones =>{
    //  console.log(phones);
     
     const searchResult = document.getElementById('search_result');
     searchResult.textContent=''

     phones.forEach(phone => {
         console.log(phone);
         const div = document.createElement('div');
         div.classList.add('col')
         div.innerHTML = `
         <div class="card h-50 rounded">
            <img src="${phone.image}" class="card-img-top" alt="...">
            <div class="card-body">
                <h5 class="card-title primary">Model : ${phone.phone_name}</h5>
                <p class="card-text primary2">Brand : ${phone.brand}</p>
                <button onClick="loadMealDetails('${phone}')"  class="buttonStyle">Details</button>
            </div>
            
         </div>`
         
        searchResult.appendChild(div);
      
     });
 }