const BASE_URL = 'http://localhost:3002'

function getRoutines() {

    let user_id = document.getElementsByClassName('navbar-brand')[1].href.slice(-1)
    let main = document.createElement("div");
    let store ={};

    fetch(BASE_URL + '/users/' + user_id + '/routines') 
        .then( resp => resp.json() )
        .then( data => {

        //creates html for routine show page links
            store["rendinfo"] = data.map(data => {
            const rt = new Routine(data)
            return rt.renderRout()
        }) 
        
        //create another map function for all of the delete innerhtml 
    
        store["hyplink"] = data.map(data => {
            const rt = new Routine(data)
            return rt.renderhref()
        }) 
        
        //create another map function for all the innerText

        store["del"] = data.map(data => {
            const rt = new Routine(data)
            return rt.renderDel()
        })

        document.body.appendChild(main).style.padding = "15px"
        
        store["rendinfo"].forEach(function(element) {
            main.innerHTML += element;
        });

    })
}

function displayRoutine(e) {
    e.preventDefault();
    //clearForm(); 
    debugger;
    let id = this.dataset.id; 
    let user_id = this.dataset.user_id; 
    let main = document.getElementById('main');
    main.innerHTML = '';

    fetch(BASE_URL + '/users/' + user_id  + '/routines/' + id) 
        .then ( resp => resp.json() )    

}
    
        // .then(resp => resp.json())
        // .then(routine => {
        //     main.innerHTML += `<h2>${routine.name}</h2>`;
        //     main.innerHTML += `<h3>${routine.name}</h2>`;
        // })
    

//}


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
