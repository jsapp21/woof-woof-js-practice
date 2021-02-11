// Build Dog Nav for Each Dog - DONE
    // on page load make a fetch to get all pups - X
    // load in div "dog-bar" - X
    // add span to pups name to the dog bar - X

const mainFunction = () => {
    fetchDogs()
    addListenerForBody()
    filterDogListener()
}

const fetchDogs = () => {

    fetch('http://localhost:3000/pups')
    .then(resp => resp.json())
    .then(dogs => {
        allDogData = dogs
        renderDogNav()
    })
}

const renderDogNav = () => {

    allDogData.forEach(dog => {
        let nav = document.getElementById('dog-bar')
        let span = document.createElement('SPAN')
        span.id = dog.id 
        span.innerText = dog.name
        nav.append(span)
    })
}
    

// On Click in the Dog Nav <span>, display Each Dog
    // render into div-id dog-info
    // img, name h2, a button that say's "Good Dog!" or "Bad Dog!"
    // isGoodDog true/false; boolean

const addListenerForBody = () => {

    let div = document.getElementById('dog-bar')
    div.addEventListener('click', function(event) {
        const eventId = parseInt(event.target.id, 10)
        foundDog = allDogData.find(dog => dog.id === eventId)

        renderDog(foundDog)
    })
}

const renderDog = (foundDog) => {

    let div = document.getElementById('dog-info')
    div.innerHTML = ""

    let img = document.createElement('img')
    img.src = foundDog.image

    let dogName = document.createElement('h2')
    dogName.innerText = foundDog.name

    let button = document.createElement('button')
    button.innerText = foundDog.isGoodDog ? "Good Dog" : "Bad Dog"
    button.id = foundDog.name
    button.addEventListener('click', function(event) {
        if (event.target.id === event.target.previousSibling.innerText) {
            const updateObj = {
                isGoodDog: !foundDog.isGoodDog
            }
            updateDogButton(updateObj)
        }
    })

    div.append(img, dogName, button)
}

// Toogle Good Dog
    // two things happen on click
    // text should change 
    // Patch request with /pups/:id to update the isGoodDog value
    // render button text back

const updateDogButton = (updateObj) => {

    let newObj = {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify(updateObj)
    } 

    fetch(`http://localhost:3000/pups/${foundDog.id}`, newObj)
    .then(resp => resp.json())
    .then(data => renderDog(data))
}


// Bonus: Filter Good Dogs Button
    // two things happen on click
    // text should change OFF/ON
    // ON - shows only good pup names in Dog Nav
    // OFF - shows all pups in Dog Nav

const filterDogListener = () => {
    const button = document.getElementById('good-dog-filter')
    const nav = document.getElementById('dog-bar')
    button.addEventListener('click', function(event) {

        nav.innerHTML = ""
        
        if (event.target.innerText === "Filter good dogs: OFF") {
            event.target.innerText = "Filter good dogs: ON"

            goodDogs = allDogData.filter(dog => dog.isGoodDog === true)
            allDogData = goodDogs

            renderDogNav()
        } 
        else if (event.target.innerText === "Filter good dogs: ON") {
            event.target.innerText = "Filter good dogs: OFF"

            fetchDogs()
        }
    }) 
}

mainFunction()

