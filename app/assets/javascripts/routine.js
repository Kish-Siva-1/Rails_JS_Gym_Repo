const BASE_URL = 'http://localhost:3002'

function displayCreateForm() {

    let routinesFormDiv = document.querySelector('button[onclick="displayCreateForm()"]');
    let cform = document.createElement("div");
    let html = `
        <br>
        <form onsubmit="createRoutine(); return false;">
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
    debugger; 
    let user_id = document.getElementsByClassName('navbar-brand')[1].href.slice(-1)
    let name = document.getElementById('name').value
    // fetch(BASE_URL + '/users/' + user_id + '/routines/new', {
    //     method: 'POST'
    // })
    // .then(resp => resp.json())

}

function getRoutines() {

    let user_id = document.getElementsByClassName('navbar-brand')[1].href.slice(-1)
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

        document.body.appendChild(main).style.padding = "15px"
        
        store["rendinfo"].forEach(function(element) {
            main.innerHTML += element;
        });

    })

}

function clearForm() {

}


function completed(mach) {

}

function createMachine() {

}

class Routine {
    constructor(rout) {
        this.id = rout.id
        this.name = rout.name
        this.ref = BASE_URL + '/users/' + rout.user_id + '/routines/' + rout.id
    }

    renderhref() {
        return `<a href=”#” data-id=”${this.id}”>${this.name}</a>`
    }

    renderRout() {
        return `<p>Routine Name: ${this.renderhref()} 
        <br> (${this.renderDel()}) </p>`        
    }
    
    renderDel() {
        return `<a href=”#” data-id=”${this.id}”>Delete Routine</a>`
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
