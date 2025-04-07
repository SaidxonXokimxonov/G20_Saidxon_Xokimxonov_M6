import { state } from "./constants";
import { boardColumns, openModalBtn } from "./elements";
import { faker } from '@faker-js/faker';

openModalBtn.addEventListener('click', (e: MouseEvent) => {
    e.preventDefault()
    let newColumn = prompt('Enter Column title') || ''
    state.data.push({
        id: faker.string.uuid(),
        name: newColumn,
        cards: []
    })
    

    render()    
})

function render() {
    let res = state.data.map((item,index) => {
        return `
        <div class="column">
        <div class="column__header">
          <h2 class="column__title">${item.name}</h2>
          <button class="column__delete" onclick='delCol(${item.id})'>×</button>
        </div>

        <div class="column__cards col-${index}" id='drop-zone'>
         
        </div>
        
        <button class="column__add-card" onclick='addCard(${index})'>+ Add card</button>
      </div>
        `
    }).join('')

    boardColumns.innerHTML = res
}


function addCard(idx: number) {
    state.currentIdx = idx
    let title = prompt("title name") || ''
    let description = prompt('enter description') || ''


    state.data[idx].cards?.push({
        id: faker.string.uuid(),
        title,
        description
    })

    console.log(state.data);

    renderCards()
}

function renderCards() {
    let col = document.querySelector(`.col-${state.currentIdx}`) as HTMLDivElement
    let res = state.data[state.currentIdx].cards?.map((item, idx) => {
        return `
             <div class="column__cards">
            <!-- Card Example -->
            <div class="card" id='drag-item' draggable='true'>
              <h3 class="card__title">${item.title}</h3>
              <p class="card__description">${item.description}</p>
              <div class="card__footer">
                <span class="card__date">4/7/2025</span>
                <button class="card__delete" onclick='delCard(${item.id})'>Delete</button>
              </div>
            </div>
          </div>                
        `
    }).join('')

    col.innerHTML = res
}



function delCard(id: string) {
    let idx = state.data[state.currentIdx].cards.findIndex(item=> item.id === id)
    state.data[state.currentIdx].cards.splice(idx, 1)

    renderCards()
}
function delCol(id: string) {
    let idx = state.data[state.currentIdx].cards.findIndex(item=> item.id === id)
    state.data[state.currentIdx].cards.splice(idx, 1)

    renderCards()
}

function init() {
    render()
}


(window as any).addCard = addCard;
(window as any).delCard = delCard;
(window as any).delCol = delCol;



window.addEventListener('load', init)


