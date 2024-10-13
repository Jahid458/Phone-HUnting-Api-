const loadPhone = async(searchText = '13', isShowAll) =>{

    const res =await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`);
    const data = await res.json();
    // console.log(data)
    const phones = data.data ; 
    displayPhones(phones, isShowAll)
}

const displayPhones = (phones,isShowAll) => { 
    // console.log(phones)
    const phoneContainer = document.getElementById('phone-container'); //1 container e niye asha loop er baire 
    // clear container card before adding new cards
    phoneContainer.textContent = ''

    //displau show btn there are more 12 phone 
    const showAllContainer = document.getElementById('show-all-container')
    if(phones.length > 12 && !isShowAll){
      showAllContainer.classList.remove('hidden')
    }else{
      showAllContainer.classList.add('hidden')

    }
    // console.log('is Showw All', isShowAll)
    // display 12 phones is not show All 

    if(!isShowAll){
      phones = phones.slice(0,12)
    }
 
    phones.forEach(phone => { 
      // console.log(phone)
        const phoneCard = document.createElement('div'); // 2 div create kora  
        phoneCard.classList = `card bg-gray-100 p-4 shadow-xl grid mt-3 `;
        // 3.set inner HTml
        phoneCard.innerHTML = `
           <figure>
            <img alt="Shoes" src="${phone.image}"/>
          </figure>
          <div class="card-body">
              <h2 class="card-title">${phone.phone_name}</h2>
              <p>If a dog chews shoes whose shoes does he choose?</p>
              <div class="card-actions justify-center">
                <button onclick="handleShowDetails('${phone.slug}')" class="btn btn-primary">Show details</button>
            </div>
          </div>
        `
        // 4. phone container  aappend Child
        phoneContainer.appendChild(phoneCard)



    });

    //hide loading spinner 
    toggoleLoadingSpinner(false)

 }

 //
 const handleShowDetails = async(id) => {
        // console.log('click show details',id)
        //load single phones  data
        const res = await fetch(`https://openapi.programming-hero.com/api/phone/${id}`)
        const data = await res.json();
        const phone  = data.data
        showPhoneDetails(phone)


 }

 const showPhoneDetails = (phone) => {
  console.log(phone)
    const phoneName = document.getElementById('show-details-phone-name');
    phoneName.innerText =  phone.name;

    const showDetailContainer = document.getElementById('show-details-container');
    showDetailContainer.classList = "py-5 px-16"
    showDetailContainer.innerHTML =`
       <img src="${phone.image}" />
       <p><span class="text-md">Storage: ${phone?.mainFeatures?.storage }</span></p>
       <p><span class="text-md">GPS: ${phone?.others?.GPS || 'N/A' }</span></p>
    `
   //show the modal
   show_details_modal.showModal()
 }

//  handle search
const handleSearch = (isShowAll) =>{
  // const searchFeild = document.getElementById('search-feild');
  // const searchText = searchFeild.value ;
  // console.log(searchText)
  // loadPhone(searchText)
  toggoleLoadingSpinner(true)
  const searchInput = document.getElementById('search-feild');
  const searchText = searchInput.value ; 
  console.log(searchText)
  loadPhone(searchText, isShowAll)

  
}

const toggoleLoadingSpinner = (isLoading) => {
    const loadingSpinner = document.getElementById('loading-spinner');
    if(isLoading){
      loadingSpinner.classList.remove('hidden')
    }else{
      loadingSpinner.classList.add('hidden')

    }
}

// handle show All 
const handleShowAll = () => {
  handleSearch(true)
}

loadPhone()
