let za=0
const showError = () => {
    const foodDiv = document.getElementById("itemarea")
    const subDiv = document.createElement("div")
    subDiv.className = "foodItem"
    const itemData = `
          <h5>Go To China or South Korea We cant Identify them</h5>`
    subDiv.innerHTML = itemData
    foodDiv.appendChild(subDiv)

}
const callApiByFirstName = (data, nameType) => {
    let funcType = 0
    if (nameType === 1) {
        funcType = "s"
    }
    else {
        funcType = "f"
    }
    url = `https://www.themealdb.com/api/json/v1/1/search.php?${funcType}=${data}`
    fetch(url)
        .then(response => response.json())
        .then(data => fillFoodDiv(data))
        .catch(error => showError())
}
const fillFoodDiv = data => {
    const foodDiv = document.getElementById("itemarea")
    for (let i = 0; i < data.meals.length; i++) {
        const subDiv = document.createElement("div")
        subDiv.className = "foodItem"
        const itemData = `
         <img src="${data.meals[i].strMealThumb}" alt="">
          <h5>${data.meals[i].strMeal}</h5>`
        subDiv.innerHTML = itemData
        foodDiv.appendChild(subDiv)
    }
}
const showDetailReceipe = (bubbleId) => {
    console.log("Inc in za in show function")
    za++
    //Detail Food Receipe clear
    document.getElementById("item-detail-area").innerHTML = ""
    const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${bubbleId}`
    fetch(url)
        .then(response => response.json())
        .then(data => {
            let place = document.getElementById("item-detail-area")
            let receipe = document.createElement("div")
            let i = 0
            for (i = 0; i < data.meals.length; i++) {
                if (data.meals[i].strMeal === bubbleId) {
                    break
                }
            }
            receipe.innerHTML = `<img src="${data.meals[i].strMealThumb}"alt="">
            <h3>${data.meals[i].strMeal}</h3>
            <h5>Ingredients: </h5>
            <p>${data.meals[i].strIngredient1}</p>
            <p>${data.meals[i].strIngredient2}</p>
            <p>${data.meals[i].strIngredient3}</p>
            <p>${data.meals[i].strIngredient4}</p>
            <p>${data.meals[i].strIngredient5}</p>
            <p>${data.meals[i].strIngredient6}</p>`
            place.appendChild(receipe)
        })
}
function displayInfo() {
    document.getElementById("itemarea").addEventListener("click", function (event) {
        if (event.target.parentNode.className === "foodItem") {
            document.getElementById("item-detail-area").innerHTML = ""
            showDetailReceipe(event.target.parentNode.childNodes[3].innerText)
            event.stopImmediatePropagation()
        }
    }
    )
}
document.getElementById("searchbutton").addEventListener("click", function () {
    //Detail Food Receipe clear
    document.getElementById("item-detail-area").innerHTML=""
    //Food Items CLear
    document.getElementById("itemarea").innerHTML = ""
    let item = document.getElementById("inputbutton").value;
    let nameType = 0
    if (item.length > 1) {
        nameType = 1
    }
    else if (item.length == 1) {
        item = item[0]
    }
    callApiByFirstName(item, nameType)
    document.getElementById("inputbutton").value = "";
    // console.log(item)
    displayInfo()
    console.log(za)
})
