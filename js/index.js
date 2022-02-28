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
        errorMsg.style.display='inline';
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
    //  displayPhoneDetails.textContent=''

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
                <button onClick="loadMealDetails('${phone.slug}')"  class="buttonStyle">Details</button>
            </div>
            
         </div>`
         
        searchResult.appendChild(div);
      
     });
 }

 //call  displly details

 const loadMealDetails = phoneId =>{
     fetch(`https://openapi.programming-hero.com/api/phone/${phoneId}`)
     .then(res => res.json())
     .then(data => loasdata(data.data));
 }

// disply details
const loasdata = PhoneDetail =>{
    console.log(PhoneDetail);

    const displayPhoneDetails = document.getElementById('phonedetails');
    displayPhoneDetails.textContent =''

    const div = document.createElement('div')
        div.classList.add('card');
        div.innerHTML=`
        <img src="${PhoneDetail.image}" class="card-img-top" alt="...">
        <div class="card-body">
            <h3 class="card-titlen primary">Model : ${PhoneDetail.name}</h3>
            <h5 class="card-text">Relase Date : ${PhoneDetail.releaseDate ? PhoneDetail.releaseDate: 'No release date found'}</h5>
            <div class="card-text">Fetures : <br>
                <h6>display :${PhoneDetail.mainFeatures.chipSet}</h6>
                <h6>display :${PhoneDetail.mainFeatures.displaySize}</h6>
                <h6>display :${PhoneDetail.mainFeatures.memory}</h6>
            </div>
            
        </div>
        `
    displayPhoneDetails.appendChild(div);
}