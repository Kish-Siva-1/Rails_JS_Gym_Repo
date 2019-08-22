const BASE_URL = 'http://localhost:3000'

function displayCreateForm() {
    let formdis = document.querySelector('#createroutineform') 
    if (formdis.style.display === "none") {
        formdis.style.display = ""
    }
    else {
        formdis.style.display = "none"
    }
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

function delRout(info) {

    let user_id = document.getElementsByClassName('navbar-brand')[1].href.slice(-1)

    fetch(BASE_URL + '/users/' + user_id + '/routines/' + info, {
        method: 'DELETE'
    })

    getRoutines()

}

function getRoutines() {
    let user_id = document.getElementsByClassName('navbar-brand')[1].href.slice(-1)
    let seeroutines = document.querySelector('button[onclick="getRoutines()"]')
    let main = document.createElement("div");

    if (document.querySelector('#routinehref') === null){
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
}

class Routine {
    constructor(rout) {
        this.id = rout.id
        this.name = rout.name
        this.refedit = rout.user_id + '/routines/' + rout.id + '/edit'
    }

    renderhref() {
        return `<a href=”#routinehref” id="routinehref" class="routine${this.id}" data-id=”${this.id}” onclick="getMachines(${this.id});return false;">${this.name}</a>`
    }

    renderRout() {
        return `<p>Routine Name: ${this.renderhref()} 
        <br> ${this.renderEdit()}
        <br> ${this.renderDel()} </p>`        
    }
    
    renderDel() {
        return `<a href=”#” data-id=”${this.id}” onclick="delRout(${this.id});"  class="delRout${this.id}">Delete Routine</a>`
    }

    renderEdit() {
        return `<a href=${this.refedit}>Edit Routine</a>`
    }
}

