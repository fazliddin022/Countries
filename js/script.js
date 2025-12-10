let elCountryList = document.querySelector(".country-list") // ul
let elCountrySelect = document.querySelector(".country-select") // select
let elSearch = document.querySelector(".search-input") // input
let elLikeBtn = document.querySelector(".like-btn") // like button
let elSaveBtn = document.querySelector(".save-btn") // save button

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
    if(event.target.value == "all"){
        renderCountries(countries, elCountryList)    
    }
    else {
        const selectedList = countries.filter(item => item.region.toLowerCase() == event.target.value)
        renderCountries(selectedList, elCountryList) 
    }
})
// select part ended


// Render Countries start 
function renderCountries(arr, list) {
    list.innerHTML = null
    arr.forEach(item => {
        let elItem = document.createElement("li")
        elItem.className = "w-[300px] overflow-hidden rounded-md bg-slate-400 overflow-hidden hover:scale-[1.1] duration-400"
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
                <button class="w-10 h-10 bg-[#6B7A90] rounded-xl flex items-center justify-center hover:scale-[1.1]">
                    <i class="fa-solid fa-ellipsis-h text-white text-lg"></i>
                </button>
                <button class="w-10 h-10 bg-[#6B7A90] rounded-xl flex items-center justify-center hover:scale-[1.1]">
                    <i class="fa-solid fa-pen text-white text-lg"></i>
                </button>
                <button class="w-10 h-10 bg-[#6B7A90] rounded-xl flex items-center justify-center hover:scale-[1.1]">
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
elSearch.addEventListener("input", event => {
    const searchedList = countries.filter(item => item.name.toLowerCase().includes(event.target.value) || item.capital.toLowerCase().includes(event.target.value) || item.population.includes(event.target.value) || item.region.toLowerCase().includes(event.target.value))
    renderCountries(searchedList, elCountryList)
})
// Search part finished


// Like part started
function handleLikeBtnClick(id) {
    const findedObj = countries.find(item => item.id == id)
    findedObj.active = !findedObj.active
    renderCountries(countries, elCountryList) 
}
// Like part finished


// Save part started
function handleSaveBtnClick(id) {
    const found = countries.find(item => item.id == id)
    found.saved = !found.saved
    renderCountries(countries, elCountryList)
}
// Save part finished