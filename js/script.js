let elCountryList = document.querySelector(".country-list") // ul
let elCountrySelect = document.querySelector(".country-select") // select
let elSearch = document.querySelector(".search-input") // input
let elLikeBtn = document.querySelector(".like-btn") // like button
let elSaveBtn = document.querySelector(".save-btn") // save button
let elModalWrapper = document.querySelector(".modal-wrapper") // modal-wrapper
let elModalInner = document.querySelector(".modal-inner") // modal-inner
let elLoading = document.querySelector(".loading"); // loading


// Mode started 
function handleModeClick(){
    document.body.classList.toggle("dark")
}
// Mode finished 

// Modal code started
function showModal(active){
    if(active) {
        elModalWrapper.classList.remove("scale-[0]")
        elModalWrapper.classList.add("scale-[1]")
    }
    else {
        elModalWrapper.classList.remove("scale-[1]")
        elModalWrapper.classList.add("scale-[0]")
    }
}
elModalWrapper.addEventListener("click", event => event.target.id == "wrapper" && showModal())
// Modal code finished

//  Format population
function formatPopulation(value){
    return value.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}
//  Format population

// select part started
function renderSelectOptions(arr, list){
    let countryRes = arr.reduce((prevValue, item) => {
        if(!prevValue.includes(item.region)){
            prevValue.push(item.region)
        }
        return prevValue
    }, [])

    countryRes.forEach(item => {
        let elOption  = document.createElement("option")
        elOption.textContent = item
        elOption.value = item.toLowerCase()
        list.appendChild(elOption)
    })
}
renderSelectOptions(countries, elCountrySelect)

elCountrySelect.addEventListener("change", (event) => {

    elLoading.classList.remove("hidden");  
    elCountryList.innerHTML = "";         

    setTimeout(() => {
        
        if(event.target.value == "all"){
            renderCountries(countries, elCountryList);    
        } 
        else {
            const selectedList = countries.filter(item => 
                item.region.toLowerCase() == event.target.value
            );
            renderCountries(selectedList, elCountryList);
        }

        elLoading.classList.add("hidden");

    }, 1000); 
});

// select part ended


// Render Countries start 
function renderCountries(arr, list) {
    list.innerHTML = null
    arr.forEach(item => {
        let elItem = document.createElement("li")
        elItem.className = "w-[300px] border-[1px] overflow-hidden rounded-md bg-slate-400 overflow-hidden hover:scale-[1.1] duration-400 country-item"
        elItem.innerHTML = `
            <img class="w-[300px] h-[200px]" src="${item.img}" alt="Portugal Flag" width="300" height="200">
            <div class="p-5">
                <p>Country: ${item.name}</p>
                <p>Capital: ${item.capital}</p>
                <p>Population: ${item.population}</p>
                <p>Region: ${item.region}</p>
            </div>
            <div class ="p-5 flex justify-between">
                <button onclick="handleLikeBtnClick('${item.id}')" class="w-10 h-10 bg-[#6B7A90] rounded-xl flex items-center justify-center hover:scale-[1.1]}">
                     <i class="fa-solid fa-heart ${item.active ? 'text-red-500' : 'text-white'} text-lg"></i>
                </button>
                <button onclick="handleSaveBtnClick('${item.id}')" class="w-10 h-10 bg-[#6B7A90] rounded-xl flex items-center justify-center hover:scale-[1.1]">
                    <i class="fa-solid fa-bookmark ${item.saved ? 'text-green-300' : 'text-white'} text-lg"></i>
                </button>
                <button onclick="handleMoreBtnClick('${item.id}')" class="w-10 h-10 bg-[#6B7A90] rounded-xl flex items-center justify-center hover:scale-[1.1]">
                    <i class="fa-solid fa-ellipsis-h text-white text-lg"></i>
                </button>
                <button onclick="handleEditBtnClick('${item.id}')" class="w-10 h-10 bg-[#6B7A90] rounded-xl flex items-center justify-center hover:scale-[1.1]">
                    <i class="fa-solid fa-pen text-white text-lg"></i>
                </button>
                <button onclick="handleDeleteBtnClick('${item.id}')" class="w-10 h-10 bg-[#6B7A90] rounded-xl flex items-center justify-center hover:scale-[1.1]">
                    <i class="fa-solid fa-trash text-white text-lg"></i>
                </button>
        `
        list.appendChild(elItem)
    })
    elLikeBtn.children[0].textContent = countries.filter(item => item.active).length;
    elSaveBtn.children[0].textContent = countries.filter(item => item.saved).length
}
renderCountries(countries, elCountryList)
// Render Countries end 


// Search part started
elSearch.addEventListener("input", (event) => {

    elLoading.classList.remove("hidden");  
    elCountryList.innerHTML = "";          

    let value = event.target.value.toLowerCase();

    setTimeout(() => {
        const searchedList = countries.filter(item =>
            item.name.toLowerCase().includes(value) ||
            item.capital.toLowerCase().includes(value) ||
            item.population.includes(value) ||
            item.region.toLowerCase().includes(value)
        );

        renderCountries(searchedList, elCountryList);  
        elLoading.classList.add("hidden");
    }, 1000);

});



// Search part finished


// Like part started
function handleLikeBtnClick(id) {
    const findedObj = countries.find(item => item.id == id)
    findedObj.active = !findedObj.active
    saveToStorage(); 
    renderCountries(countries, elCountryList) 
}
// header like part start
elLikeBtn.addEventListener("click", () => {
    const likeList = countries.filter(item => item.active)  
    renderCountries(likeList, elCountryList) 
})
// header like part finished

// Like part finished


// Save part started
function handleSaveBtnClick(id) {
    const found = countries.find(item => item.id == id)
    found.saved = !found.saved
    saveToStorage(); 
    renderCountries(countries, elCountryList)
}
// header saved part started
elSaveBtn.addEventListener("click", () => {
    const saveList = countries.filter(item => item.saved)
    renderCountries(saveList, elCountryList)
})
// header saved part finished
// Save part finished


// More part started
function handleMoreBtnClick(id){
    const moreData = countries.find(item => item.id == id)
    showModal(true);
    elModalInner.innerHTML = `
        <div class="flex items-center justify-between">
            <img class="w-[300px] h-[200px]" src="${moreData.img}" alt="Portugal Flag" width="300" height="200">
            <div class="p-5">
                <p class="p-2 border-[1px] rounded-[5px] mb-[5px]">Country: ${moreData.name}</p>
                <p class="p-2 border-[1px] rounded-[5px] mb-[5px]">Capital: ${moreData.capital}</p>
                <p class="p-2 border-[1px] rounded-[5px] mb-[5px]">Population: ${moreData.population}</p>
                <p class="p-2 border-[1px] rounded-[5px] mb-[5px]">Region: ${moreData.region}</p>
            </div>
        </div>
    `
}
// More part finished

// Delete part started

function handleDeleteBtnClick(id){
   showModal(true)
   elModalInner.classList.remove('h-[300px]')
   elModalInner.classList.add('h-[150px]')
   elModalInner.innerHTML = `
        <div class="text-center">
            <h2 class="font-bold text-[25px] mb-[20px]">Are you sure to delete?</h2>
            <div>
                <button onclick="handleCancelModal()" class="w-[45%] p-2 rounded-md bg-green-600 font-bold text-white">Cancel</button>
                <button onclick="handleDeleteModal(${id})" class="w-[45%] p-2 rounded-md bg-red-600 font-bold text-white">Delete</button>
            </div>
        </div>
   ` 
}
function handleCancelModal(){
    showModal()
}
function handleDeleteModal(id){
    const deleteIndex = countries.findIndex(item => item.id == id)
    countries.splice(deleteIndex, 1)
    saveToStorage();
    renderCountries(countries, elCountryList)
    showModal()
}
// Delete part finished

// Create part Started 
function handleCreateCountry(){
    showModal(true)
    elModalInner.innerHTML = `
        <form class="text-center create-form" autocomplete="off">
        <div class="flex justify-between">
            <div class="w-[49%] space-y-[20px]">
                <input name="img" class="w-full p-2 rounded-md border-[2px] border-slate-500" type="text" placeholder="Enter img link" required>
                <input name="name" class="w-full p-2 rounded-md border-[2px] border-slate-500" type="text" placeholder="Enter country name" required>
                <input name="capital" class="w-full p-2 rounded-md border-[2px] border-slate-500" type="text" placeholder="Enter country capital" required>
            </div>
            <div class="w-[49%] space-y-[20px]">
                <input name="population" class="w-full p-2 rounded-md border-[2px] border-slate-500" type="text" placeholder="Enter country population" required>
                <input name="region" class="w-full p-2 rounded-md border-[2px] border-slate-500" type="text" placeholder="Enter country region" required>
            </div>
        </div>
            <button type="submit" class="w-[60%] mt-[20px] p-2 rounded-md bg-green-600 text-white font-bold">Create</button>
        </form>
    `
    let elCreateForm = document.querySelector(".create-form")
    elCreateForm.addEventListener("submit", (event) => {
        event.preventDefault()
           const data = {
            id: countries[countries.length - 1].id ? countries[countries.length - 1].id + 1 : 1,
            img: event.target.img.value,
            name: event.target.name.value,
            population: formatPopulation(event.target.population.value),
            region: event.target.region.value,
            capital: event.target.capital.value,
            active:false,
            saved:false
           }
           elCreateForm.children[1].innerHTML = `
                <img class="scale-[2] mx-auto" src="./images/loading.png" alt="Loading img" width="30" height="30"/>
           `
           setTimeout(() => {
                countries.push(data)
                saveToStorage();  
                renderCountries(countries, elCountryList)
                showModal()
            },1000)
        
    })
}
// Create part Finished


// Eidit part started
function handleEditBtnClick(id){
    showModal(true)
    const updateData = countries.find(item => item.id == id)
    elModalInner.innerHTML = `
        <form class="text-center update-form" autocomplete="off">
            <div class="flex justify-between">
                <div class="w-[49%] space-y-[20px]">
                    <input value="${updateData.img}" name="img" class="w-full p-2 rounded-md border-[2px] border-slate-500" type="text" placeholder="Enter img link" required>
                    <input value="${updateData.name}" name="name" class="w-full p-2 rounded-md border-[2px] border-slate-500" type="text" placeholder="Enter country name" required>
                    <input value="${updateData.capital}" name="capital" class="w-full p-2 rounded-md border-[2px] border-slate-500" type="text" placeholder="Enter country capital" required>
                </div>
                <div class="w-[49%] space-y-[20px]">
                    <input value="${updateData.population}" name="population" class="w-full p-2 rounded-md border-[2px] border-slate-500" type="text" placeholder="Enter country population" required>
                    <input value="${updateData.region}" name="region" class="w-full p-2 rounded-md border-[2px] border-slate-500" type="text" placeholder="Enter country region" required>
                </div>
            </div>
            <button type="submit" class="w-[60%] mt-[20px] p-2 rounded-md bg-green-600 text-white font-bold">Update</button>
        </form>
    `
    let elUpdateForm = document.querySelector(".update-form")
    elUpdateForm.addEventListener("submit", (event) => {
        event.preventDefault()

        updateData.img = event.target.img.value
        updateData.name = event.target.name.value
        updateData.capital = event.target.capital.value
        updateData.population = event.target.population.value 
        updateData.region = event.target.region.value 

        elUpdateForm.children[1].innerHTML = `
        <img class="scale-[2] mx-auto" src="./images/loading.png" alt="Loading img" width="30" height="30"/>
        `
        setTimeout(() => {
            saveToStorage();  
            renderCountries(countries, elCountryList)
            showModal()
        },1000)
        
    })  
}
// Edit part finished