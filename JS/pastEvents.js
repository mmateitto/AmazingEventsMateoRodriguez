import * as functionModule from "./functions.js"

const linkData = "https://aulamindhub.github.io/amazing-api/events.json"

let eventos = [] 

fetch(linkData)
.then(response => response.json())
.then(data => {
    eventos = data.events.filter(element => data.currentDate > element.date);
    functionModule.page(functionModule, eventos)
})