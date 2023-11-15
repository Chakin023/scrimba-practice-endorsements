// javascript
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push, onValue, remove } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

const appSettings = {
    databaseURL: "https://championendorsementsdb-default-rtdb.asia-southeast1.firebasedatabase.app/"
}

const app = initializeApp(appSettings)
const database = getDatabase(app)
const endorsementListInDB = ref(database, "endorsementList")

const inputFieldEl = document.getElementById("input-field")
const addButtonEl = document.getElementById("publish-btn")
const endorsementEl = document.getElementById("endorsement-list")

addButtonEl.addEventListener("click", function() {
    let inputValue = inputFieldEl.value
    push(endorsementListInDB, inputValue)
    clearInputFieldEl()
})

onValue(endorsementListInDB, function(snapshot) {
    if (snapshot.exists()) {
        let itemsArray = Object.entries(snapshot.val())
        clearEndorsementEl()
        for (let i = 0; i < itemsArray.length; i++) {
            let currentItem = itemsArray[i]
            let currentItemID = currentItem[0]
            let currentItemValue = currentItem[1]
            appendItemToEndorsementEl(currentItem)
        }    
    } else {
        endorsementEl.innerHTML = "No items here... yet"
    }
})

function clearEndorsementEl() {
    endorsementEl.innerHTML = ""
}

function clearInputFieldEl() {
    inputFieldEl.value = ""
}

function appendItemToEndorsementEl(item) {
    let itemID = item[0]
    let itemValue = item[1]
    let newEl = document.createElement("li")
    
    newEl.textContent = itemValue
    newEl.addEventListener("click", function() {
        let exactLocationOfItemInDB = ref(database, `shoppingList/${itemID}`)
        remove(exactLocationOfItemInDB)
    })
    endorsementEl.append(newEl)
}