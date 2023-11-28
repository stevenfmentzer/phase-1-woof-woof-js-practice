
const dogBarElement = document.getElementById("dog-bar")
const dogInfoElement = document.getElementById("dog-info")
const goodDogFilter = document.getElementById("good-dog-filter")
const dogImageElement = document.createElement("img")
const dogNameElement = document.createElement("h2")
const goodDogButtonElement = document.createElement("button")
dogInfoElement.append(dogImageElement, dogNameElement, goodDogButtonElement)

let filterStatus = false //global boolean for 'good-dog-filter'
let currentDog //global array reference of dog on display


//INITIALIZE PAGE
fetch ("http://localhost:3000/pups")
.then(response => response.json())
.then((dogList) => dogList.forEach((dog) => {
    renderDog(dog)
    displayDog(dogList[0])
}))

//ADD DOGS TO DOG BAR @ TOP OF PAGE
function renderDog(dog){
    const dogSpan = document.createElement("span") //creates <span> element; 
    dogSpan.id = dog.name //give <span> an '.id' for searchability; 
    dogSpan.textContent = dog.name //set <span> textContent
    dogSpan.isGoodDog = dog.isGoodDog //set <span> isGoodDog boolean
    dogBarElement.appendChild(dogSpan)
    dogSpan.addEventListener("click", () => {
        displayDog(dog)
})}

//Displays chosen dog in the "dog-info" <div> 
function displayDog(dog){
    dogInfoElement.style.display = "" // turns ON visibilty for "dog-info" section
    dogNameElement.innerHTML = dog.name
    dogImageElement.src = dog.image 
    goodDogButtonElement.innerHTML = dog.isGoodDog? "Good Dog!" : "Bad Dog!"
    currentDog = dog
}

function patchDog(url, updatingData){
    fetch(`http://localhost:3000/pups/${url}`, {
        "method" : "PATCH",
        "headers" : {"Content-Type" : "application/json"},
        "body" : JSON.stringify(updatingData)
})}

//GOOD/BAD DOG BUTTON
goodDogButtonElement.addEventListener("click", () => {
    currentDog.isGoodDog = !currentDog.isGoodDog //toggle boolean
    goodDogButtonElement.textContent = currentDog.isGoodDog? "Good Dog!" : "Bad Dog!" //set button text

    let dogSpan = document.getElementById(currentDog.name)
    dogSpan.isGoodDog = currentDog.isGoodDog

    let updatingData = {"isGoodDog" : currentDog.isGoodDog}
    patchDog(currentDog.id,updatingData)
    if (filterStatus && !currentDog.isGoodDog){
        dogSpan.style.display = "none" //turns OFF visibilty for specific dog <span>
        dogInfoElement.style.display = "none" //turns OFF visibilty for "dog-info" section
}})


//GOOD DOG FILTER
//pessimistic rendering
goodDogFilter.addEventListener("click", () => {
    filterStatus = !filterStatus
    goodDogFilter.textContent = filterStatus? "Filter good dogs: ON" : "Filter good dogs: OFF"
    const dogSpanArray = dogBarElement.getElementsByTagName("span") //produces an array of <span>

    //iterates array, turning off display for 'bad dog' <span>
    for (let i = 0 ; i < dogSpanArray.length ; i++){ 
        const dog = dogSpanArray[i]
        if (filterStatus && !dog.isGoodDog){
            dog.style.display = "none"
        } else { 
            dog.style.display = ""
        }}
    //if the current dog on display is a 'bad dog'; turns OFF visibilty for "dog-info" section
    if (!currentDog.isGoodDog){
        dogInfoElement.style.display = "none" //turns OFF visibilty for "dog-info" section
}})
