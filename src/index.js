
const dogBarElement = document.getElementById("dog-bar")
const dogInfoElement = document.getElementById("dog-info")
const goodDogFilter = document.getElementById("good-dog-filter")
const dogImageElement = document.createElement("img")
const dogNameElement = document.createElement("h2")
const goodDogButtonElement = document.createElement("button")
dogInfoElement.append(dogImageElement, dogNameElement, goodDogButtonElement)

let filterStatus = false
let currentDog

function renderDog(dog){
    const dogSpan = document.createElement("span")
    dogSpan.isGoodDog = dog.isGoodDog
    dogSpan.textContent = dog.name
    dogSpan.id = dog.name
    dogBarElement.appendChild(dogSpan)
    dogSpan.addEventListener("click", () => {
        displayDog(dog)
})}

function displayDog(dog){
    dogInfoElement.style.display = ""
    dogNameElement.innerHTML = dog.name
    dogImageElement.src = dog.image 
    goodDogButtonElement.innerHTML = dog.isGoodDog? "Good Dog!" : "Bad Dog!"
    currentDog = dog
}

goodDogButtonElement.addEventListener("click", () => {
    currentDog.isGoodDog = !currentDog.isGoodDog
    goodDogButtonElement.textContent = currentDog.isGoodDog? "Good Dog!" : "Bad Dog!"
    let dogSpan = document.getElementById(currentDog.name)
    dogSpan.isGoodDog = currentDog.isGoodDog
    let updatingData = {"isGoodDog" : currentDog.isGoodDog}
    patchDog(currentDog.id,updatingData)
    if (filterStatus && !currentDog.isGoodDog){
        dogSpan.style.display = "none"
        dogInfoElement.style.display = "none"
}})

function patchDog(url, updatingData){
    fetch(`http://localhost:3000/pups/${url}`, {
        "method" : "PATCH",
        "headers" : {"Content-Type" : "application/json"},
        "body" : JSON.stringify(updatingData)
})}

goodDogFilter.addEventListener("click", () => {
    filterStatus = !filterStatus
    goodDogFilter.textContent = filterStatus? "Filter good dogs: ON" : "Filter good dogs: OFF"
    const dogSpanArray = dogBarElement.getElementsByTagName("span")

    for (let i = 0 ; i < dogSpanArray.length ; i++){  
        const dog = dogSpanArray[i]
        if (filterStatus === true && dog.isGoodDog === false){
            dog.style.display = "none"
        } else { 
            dog.style.display = ""
        }}
    if (currentDog.isGoodDog === false){
        dogInfoElement.style.display = "none"
    }
})

fetch ("http://localhost:3000/pups")
.then(response => response.json())
.then((dogList) => dogList.forEach((dog) => {
    renderDog(dog)
    displayDog(dogList[0])
    })
)
