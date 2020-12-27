const hamburger = document.getElementById('menu')
const nav = document.getElementById('nav')
const menuBg = document.getElementById('menu-bg')
const obj = document.getElementById('im-an-object')
const satelliteMenu = document.getElementById('satellite-menu')

const userPanel = document.getElementById('user-panel')
const form = document.querySelector('form')

let counter = 0;

// let newData = JSON.parse(data)

function main(){
    // change pixel sizing of EVERYTHING to use VH
    // create a "Authors" link at the bottom, or use a (?) icon

    // change HOW the sat-view is displayed. 
    // change the "resetting" of the sat-view


    // try to implement "box shadow" transform/transition
    // add typewriter effect

    // set default value to ALL Satellites

    // maybe effect for when each radio button is selected

    // "fade back" or "minimize" window when closing hamburger button

    // add eventListener to questions, animating "About Us" section
    
    
    
    
    
    
    renderSatellites(myData)
    
    // fetchSatellites()

    // showAllSatellites()      old
    formListener()
    satelliteSelector()
}

// DISABLE THIS AFTER I AM DONE, MAIN IS RUNNING IN BRANDON'S CODE
// main()
// ***********************************************************


// let myData = [{id: 1, name: 'ARABSAT-SA', category: {name: 'ActiveGEO'}, owner: 'USA'}, 
// {id: 2, name: 'SATANS SATELLITE', category: {name: 'InactiveGEO'}, owner: 'JPN'}, 
// {id: 3, name: 'qqqqqqqqqq', category: {name: 'DebrisGEO'}, owner: 'BRZ'},
// {id: 4, name: 'qqqqqqqqqq2', category: {name: 'DebrisGEO'}, owner: 'BRZ'},
// {id: 5, name: 'qqqqqqqqqq3', category: {name: 'DebrisGEO'}, owner: 'BRZ'},
// {id: 6, name: 'qqqqqqqqqq4', category: {name: 'DebrisGEO'}, owner: 'BRZ'},
// {id: 7, name: 'qqqqqqqqqq5', category: {name: 'DebrisGEO'}, owner: 'BRZ'}]
// let myData;

function fetchSatellites(){
    fetch("http://localhost:3000/satellites")
    .then(resp => resp.json())
    .then(satData => {
        console.log(satData[0])
        console.log(satData[1])
        console.log(satData[2])
        myData = satData
        renderSatellites(satData)
      })

}

function renderSatellites(sats){
    counter = 0;
    sats.forEach(sat => {
        renderSat(sat)
        counter++
    })
}

function renderSat(sat){
    const li = document.createElement('li')
    li.id = sat.id

    if (counter%2 == 0){
        li.style.backgroundColor = 'rgb(73, 96, 114)'
        li.style.opacity = '40%'
    }

    const p = document.createElement('p')
    p.innerText = `${sat['name']}`

    const p2 = document.createElement('p')
    p2.innerText = `Category: ${sat['category']['name']}`

    const p3 = document.createElement('p')
    p3.innerText = `Country/Owner: ${sat['owner']}`

    li.append(p, p2, p3)
    nav.append(li)
}




//////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////
function formListener(){
    form.addEventListener("change", e => {
        nav.innerHTML = ''
        if (e.target.value === 'show-all'){
            renderSatellites(myData)
        } else {showFilteredSatellites(e.target.value)}

        if (e.target.value === 'ActiveGEO'){
            hideCategory('inactive')
            hideCategory('debris')
            showCategory('active')
        } else if (e.target.value === 'InactiveGEO'){
            hideCategory('active')
            hideCategory('debris')
            showCategory('inactive')
        }else if (e.target.value === 'DebrisGEO'){
            hideCategory('active')
            hideCategory('inactive')
            showCategory('debris')
        } else showAllCategories()
        // takes back type select, and renders only those with that type
    })
}

// function showAllSatellites(){
//     let counter = 0;
//     satelliteData.forEach(sat =>{
//         const li = document.createElement('li')
//         li.id = sat.id

//         if (counter%2 == 0){
//             li.style.backgroundColor = 'rgb(73, 96, 114)'
//             li.style.opacity = '40%'
//         }
//         counter++

//         const p = document.createElement('p')
//         p.innerText = `${sat['name']}, type is ${sat['type']}`

//         li.append(p)
//         nav.append(li)
//     })
// }

function showFilteredSatellites(type){
    counter = 0;

    myData.forEach(sat =>{
        if (sat['category']['name'] === type){
            const li = document.createElement('li')
            li.id = sat.id
    
            if (counter%2 == 0){
                li.style.backgroundColor = 'rgb(73, 96, 114)'
                li.style.opacity = '40%'
            }

            const p = document.createElement('p')
            p.innerText = `Given name: ${sat['name']}`

    
            const p2 = document.createElement('p')
            p2.innerText = `Category: ${sat['category']['name']}`
        
            const p3 = document.createElement('p')
            p3.innerText = `Country/Owner: ${sat['owner']}`


    
            li.append(p, p2, p3)
            nav.append(li)
            counter++
        }
    })
}
//////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////
function satelliteSelector(){
    nav.addEventListener("click", e => {
        counter = 0;


        if (e.target.tagName === 'LI'){
            satelliteMenu.innerHTML = ''
            
            displaySatellite(e.target.id)
            satelliteMenu.classList.toggle("show-sat-view")
            satelliteMenu.className.includes('show-sat-view') ? onHover(e.target.id) : defaultScale(e.target.id)
        } else {
            satelliteMenu.innerHTML = ''
            displaySatellite(e.target.parentElement.id)
            satelliteMenu.classList.toggle("show-sat-view")
            satelliteMenu.className.includes('show-sat-view') ? onHover(e.target.parentElement.id) : defaultScale(e.target.parentElement.id)
        }

    })
}

function displaySatellite(satelliteId){
    const theSatellite = myData[satelliteId-1] // or something like this

    const h1 = document.createElement('h1')
    h1.innerText = theSatellite.name

    const p = document.createElement('p')
    p.innerText = `id: ${theSatellite.id}`

    const p2 = document.createElement('p')
    p2.innerText = `name: ${theSatellite['name']}`

    const p3 = document.createElement('p')
    p3.innerText = `category: ${theSatellite['category']['name']}`

    const p4 = document.createElement('p')
    p4.innerText = `${theSatellite['launch_date']}`

    const p5 = document.createElement('p')
    p5.innerText = `${theSatellite.mission}`

    const p6 = document.createElement('p')
    p6.innerText = `owner: ${theSatellite.owner}`

    const p7 = document.createElement('p')
    p7.innerText = `period: ${theSatellite.period}`

    const p8 = document.createElement('p')
    p8.innerText = `x,y,z: ${theSatellite['x_coor']},\n${theSatellite['y_coor']},\n${theSatellite['z_coor']}`

    satelliteMenu.append(h1, p, p2, p3, p4, p5, p6, p7, p8)
}
//////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////
function onClickMenu(){
    hamburger.classList.toggle("change")
    nav.classList.toggle("change-nav")
    userPanel.classList.toggle("user-change")

    // menuBg.classList.toggle("change-bg")
}

// function onSatelliteClick(){
//     satelliteMenu.classList.toggle("show-sat-view")
// }
