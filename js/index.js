// spiner display =funct5ion 

const toggleSpiner = display =>{
    document.getElementById('spinner').style.display = display;
}

//toggle search result




// api call
const searchPhone = () =>{
    
    const searchFild = document.getElementById('search_fild')
    const searchText = searchFild.value ;
    console.log(searchText);
    toggleSpiner('block');
    document.getElementById('phonedetails').style.display ='none';
    document.getElementById('diplyToggle').style.display = 'none';
    //clear the value
    searchFild.value = '';
    
        fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`)
        .then(res => res.json())
        .then(data => displaySearch(data.data.slice(0,20)));

    
}


//display search
 const displaySearch = phones =>{
    //  console.log(phones);
    const errorMsg = document.getElementById('error')
     const searchResult = document.getElementById('search_result');
     searchResult.textContent=''
    //  displayPhoneDetails.textContent=''
    if(phones.length == 0){
        errorMsg.style.display = 'block';
        toggleSpiner('none')
    }

     else{
        errorMsg.style.display = 'none ';
        phones.forEach(phone => {
            // console.log(phone);
            const div = document.createElement('div');
            div.classList.add('col')
            div.innerHTML = `
            <div class="card h-100 mt-20 rounded">
               <img src="${phone.image}" class="card-img-top h-75" alt="...">
               <div class="card-body text-center">
                   <h5 class="card-title primary">Model : ${phone.phone_name}</h5>
                   <p class="card-text primary2">Brand : ${phone.brand}</p>
                   <button onClick="phonedetails('${phone.slug}')"  class="buttonStyle">Details</button>
               </div>
               
            </div>
            
            `
            
           searchResult.appendChild(div);
         
        });
        toggleSpiner('none');
        document.getElementById('diplyToggle').style.display = 'inline';
        document.getElementById('phonedetails').style.display ='none';
        // toggleSearchResult('block')
     }
 }


 //call  displly details

 const phonedetails = phoneId =>{
     fetch(`https://openapi.programming-hero.com/api/phone/${phoneId}`)
     .then(res => res.json())
     .then(data => loasdata(data.data));
 }

// disply details
const loasdata = PhoneDetail =>{
    console.log(PhoneDetail);
    toggleSpiner('block');
    const displayPhoneDetails = document.getElementById('phonedetails');
    displayPhoneDetails.textContent =''

    const div = document.createElement('div')
    let Bluetooth = "Bluetooth : ";
    let WLAN = "WLAN : ";
    let GPS = "GPS : ";
    let Radio = "Radio : ";
    let USB = "USB : ";
    let NFC = "NFC : ";
        div.classList.add('card');
        div.innerHTML=`
        <img src="${PhoneDetail.image}" class="card-img-top" alt="...">
        <div class="card-body">
            <h3 class="card-titlen primary">Model : ${PhoneDetail.name}</h3>
            <h5 class="card-text">Relase Date : ${PhoneDetail.releaseDate ? PhoneDetail.releaseDate: 'No release date found'}</h5>
            <div class="card-text">Fetures : <br>
                <h6>display :${PhoneDetail.mainFeatures.chipSet}</h6>
                <h6>Cipset :${PhoneDetail.mainFeatures.displaySize}</h6>
                <h6>Storage :${PhoneDetail.mainFeatures.memory}</h6>
            </div>
            <div class="card-text"><h6>Other Fetures :</h6>
                <ol style="list-style-type: none">
                    <li>${PhoneDetail?.others?.Bluetooth ? Bluetooth + PhoneDetail?.others.Bluetooth : ''}</li><li> ${PhoneDetail?.others?.GPS ? GPS + PhoneDetail?.others.GPS : ''} </li> <li> ${PhoneDetail?.others?.NFC ? NFC + PhoneDetail?.others.NFC : ''}  </li> <li> ${PhoneDetail?.others?.Radio ? Radio + PhoneDetail?.others.Radio : ''}  </li> <li> ${PhoneDetail?.others?.USB ? USB + PhoneDetail?.others.USB : ''}  </li> <li>${PhoneDetail?.others?.WLAN ? WLAN + PhoneDetail?.others.WLAN : ''}</li> 
                </ol>
            </div>
            <div class="card-text"><h6>Sensors : </h6>
                <p>${PhoneDetail.mainFeatures.sensors[0]} , ${PhoneDetail.mainFeatures.sensors[1]} , ${PhoneDetail.mainFeatures.sensors[2]} ,${PhoneDetail.mainFeatures.sensors[3]} ,${PhoneDetail.mainFeatures.sensors[4]} ,${PhoneDetail.mainFeatures.sensors[5]}</p>
            </div>

            
        </div>
        `
    displayPhoneDetails.appendChild(div);
    toggleSpiner('none')
    document.getElementById('phonedetails').style.display ='block';
}