
const dogBarElement = document.getElementById("dog-bar")
const dogInfoElement = document.getElementById("dog-info")
const goodDogFilter = document.getElementById("good-dog-filter")
let filterStatus = false

const dogNameElement = document.createElement("h2")
dogInfoElement.appendChild(dogNameElement)
const dogImageElement = document.createElement("img")
dogInfoElement.appendChild(dogImageElement)
const goodDogButtonElement = document.createElement("button")
dogInfoElement.appendChild(goodDogButtonElement)
let currentDog

function renderDog(dog){
    const dogSpan = document.createElement("span")
    dogSpan.isGoodDog = dog.isGoodDog
    dogSpan.textContent = dog.name
    dogBarElement.appendChild(dogSpan)
    dogSpan.addEventListener("click", () => {
        displayDog(dog)
    })
}

function displayDog(dog){
    dogNameElement.textContent = dog.name
    dogImageElement.src = dog.image 
    goodDogButtonElement.textContent = goodDogButton(dog.isGoodDog)
    currentDog = dog
}

function goodDogButton(bool){
    if (bool){return "Good Dog!"} 
    else {return "Bad Dog!"} 
}

function setFilter(bool){
    if (bool){return "Filter good dogs: ON"} 
    else {return "Filter good dogs: OFF"} 
}

goodDogButtonElement.addEventListener("click", () => {
    if (currentDog.isGoodDog){currentDog.isGoodDog = false} 
    else {currentDog.isGoodDog = true}

    fetch(`http://localhost:3000/pups/${currentDog.id}`, {
        "method" : "PATCH",
        "headers" : {"Content-Type" : "application/json"},
        "body" : JSON.stringify({"isGoodDog" : currentDog.isGoodDog})
    })
    .then(response => response.json())

    goodDogButtonElement.textContent = goodDogButton(currentDog.isGoodDog)
})

goodDogFilter.addEventListener("click", () => {
    if (filterStatus){filterStatus = false} 
    else {filterStatus = true}
        
    goodDogFilter.textContent = setFilter(filterStatus)

    const dogSpans = dogBarElement.getElementsByTagName("span")
    for (let i = 0 ; i < dogSpans.length ; i++){  
        const dog = dogSpans[i]
        if (filterStatus === true && dog.isGoodDog === false){
            dog.style.display = "none"
        } else dog.style.display = ""
    }})

fetch ("http://localhost:3000/pups")
.then(response => response.json())
.then((dogList) => dogList.forEach((dog) => {
    renderDog(dog)
    displayDog(dogList[0])
    setFilter(false)
    })
)
