function populateUFs() {
    const ufSelect = document.querySelector("select[name=uf]")

    fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
    .then( res => res.json() )
    .then( states => {
        for( const state of states ) {

            ufSelect.innerHTML += `<option value="${state.id}">${state.nome}</option>`

        }
        
    })
}

populateUFs();


function getCities(event) {
    
    const citySelect = document.querySelector("[name=city]")
    const StateInput = document.querySelector("[name=state]")
   
    const ufValue = event.target.value;

    const indexOfSelectedState = event.target.selectedIndex;
    StateInput.value = event.target.options[indexOfSelectedState].text;

    const url =`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios`

    citySelect.innerHTML = "<option value>Selecione a Cidade </option>"
    citySelect.disabled = true;    


    fetch(url)
    .then( res => res.json() )
    .then( cities => {



        for( const city of cities ) {

            citySelect.innerHTML += `<option value="${city.nome}">${city.nome}</option>`

        }

        citySelect.disabled = false;        
    })
}





document
.querySelector("select[name=uf]")
.addEventListener("change", getCities)


//items to collect

const itemsToCollect = document.querySelectorAll(".items-grid li")

for (const item of itemsToCollect) {
    item.addEventListener("click", handleSelectedItem)
}

const collectedItems = document.querySelector("imput[name=items]");

let selectedItems = []

function handleSelectedItem(event) {
    const itemLi = event.target

    //add or remove html class with javascript
    itemLi.classList.toggle("selected")

    const itemId = event.target.dataset.id;

    //verify if exists selected items, if yes
    //take the selected items

    const alreadySelected = selectedItems.findIndex( item => item  == itemId)

        
    //if selected, remove select

    if( alreadySelected >= 0) {
        const filteredItems = selectedItems.filter( item => {
            const itemIsDifferent = item != itemId
            return itemIsDifferent;
        })

        selectedItems = filteredItems;
    } else {
            //if not selected, add to selection
            selectedItems.push(itemId)        
    }
    
        //atualize the hidden camp witch data selected

    collectedItems.value = selectedItems;
}