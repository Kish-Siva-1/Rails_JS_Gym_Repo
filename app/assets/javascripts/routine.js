const BASE_URL = 'http://localhost:3002'

function displayCreateForm() {

    let routinesFormDiv = document.querySelector('button[onclick="displayCreateForm()"]');
    let cform = document.createElement("div");
    let html = `
        <br>
        <form onsubmit="createRoutine(); return false">
        <label>Name:</label>
        <input type="text" id="name">
        <br>
        <input type="submit" value="Submit">
        </form>
    `

    cform.innerHTML = html;
    routinesFormDiv.after(cform)

}

function createRoutine() {
    let user_id = document.getElementsByClassName('navbar-brand')[1].href.slice(-1)
    const route = {
        name: document.getElementById('name').value
    }
 
    fetch(BASE_URL + '/users/' + user_id + '/routines', {
        method: 'POST',
        body: JSON.stringify(route),
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'X-Requested-With': 'XMLHttpRequest',
        },
        credentials: 'same-origin'
    })
    .then(resp => resp.json())
    getRoutines()

}

function clearForm(){

}

function getRoutines() {

    let user_id = document.getElementsByClassName('navbar-brand')[1].href.slice(-1)
    let seeroutines = document.querySelector('button[onclick="getRoutines()"]')
    let main = document.createElement("div");
    let store = {};

    fetch(BASE_URL + '/users/' + user_id + '/routines') 
        .then( resp => resp.json() )
        .then( data => {

        //creates html for routine show page links
        store["rendinfo"] = data.map(data => {
            const rt = new Routine(data)
            return rt.renderRout()
        }) 

        let html = `<br>`
        seeroutines.after(main)
        main.innerHTML = html
        
        store["rendinfo"].forEach(function(element) {
            main.innerHTML += element;
        });

    })
}

class Routine {
    constructor(rout) {
        this.id = rout.id
        this.name = rout.name
        this.ref = BASE_URL + '/users/' + rout.user_id + '/routines/' + rout.id
    }

    renderhref() {
        return `<a href=”#routine${this.id}” class="routine${this.id}" data-id=”${this.id}” onclick="getMachines(${this.id});return false;">${this.name}</a>`
    }

    renderRout() {
        return `<p>Routine Name: ${this.renderhref()} 
        <br> ${this.renderDel()} </p>`        
    }
    
    renderDel() {
        return `<a href=”#” data-id=”${this.id}” class="delete${this.id}">Delete Routine</a>`
    }
}

function attachClickToMachLinks() {
    let mach = document.querySelectorAll('li a');
    for (let i=0; i < mach.length; i++) {
        mach[i].addEventListener('click', displayRoutine)
    }
}

window.addEventListener('load', function () {
    attachClickToMachLinks();
})
