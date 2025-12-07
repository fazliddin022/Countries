let elCountryList = document.querySelector(".country-list") // ul
let elCountrySelect = document.querySelector(".country-select") // select

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
// select part ended


// Render Countries start 

function renderCountries(arr, list) {

    arr.forEach(item => {
        let elItem = document.createElement("li")
        elItem.className = "w-[300px] overflow-hidden rounded-md bg-slate-400 overflow-hidden hover:scale-[1.1]"
        elItem.innerHTML = `
            <img class="w-[300px] h-[200px]" src="${item.img}" alt="Portugal Flag" width="300" height="200">
            <div class="p-5">
                <p>Country: ${item.name}</p>
                <p>Capital: ${item.capital}</p>
                <p>Population: ${item.population}</p>
                <p>Region: ${item.region}</p>
            </div>
            <div class ="p-5 flex justify-between">
                <button class="w-10 h-10 bg-[#6B7A90] rounded-xl flex items-center justify-center hover:scale-[1.1]">
                    <i class="fa-solid fa-heart text-white text-lg"></i>
                </button>
                <button class="w-10 h-10 bg-[#6B7A90] rounded-xl flex items-center justify-center hover:scale-[1.1]">
                    <i class="fa-solid fa-bookmark text-white text-lg"></i>
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
}

renderCountries(countries, elCountryList)
// Render Countries end 