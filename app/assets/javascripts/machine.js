function displayMachCreateForm(info) {

    let machinesFormDiv = document.querySelector(`.addroutine${info}`)
    let cform2 = document.createElement("div");
    let html = `
        <br>
        <form onsubmit="createMachRoutine(${info}); return false">
        <label>Name:</label>
        <input type="text" id="mach_name">
        <br>
        <label>Repetitions:</label>
        <input type="text" id="repetitions">
        <br>
        <label>Sets:</label>
        <input type="text" id="sets">
        <br>
        <input type="submit" value="Submit">
        </form>
    `
    
    cform2.innerHTML = html;
    machinesFormDiv.after(cform2)

}

function createMachRoutine(info) {
    
    const machine = {
        name: document.getElementById('mach_name').value,
        repetitions: document.getElementById('repetitions').value,
        sets: document.getElementById('sets').value
    }
    
    fetch(BASE_URL + '/routines/' + info + '/machines', {
        method: 'POST',
        body: JSON.stringify(machine),
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'X-Requested-With': 'XMLHttpRequest',
        },
        credentials: 'same-origin'
    })
    .then(resp => resp.json())
    
    debugger; 
    
    getMachines(info)

}

function getMachines(info) {
    
    let user_id = document.getElementsByClassName('navbar-brand')[1].href.slice(-1)
    let seemachine = document.querySelector(`.routine${info}`)
    let main = document.createElement("div");
    let store = {};

    let html = `<br>`
    debugger; 
    fetch(BASE_URL + '/users/' + user_id + '/routines/' + info) 
        .then( resp => resp.json() )
        .then( data => {
            debugger; 
        if (data.machines.length === 0)
           { 
                seemachine.after(main)
                main.innerHTML = html + '<p>There are no workouts for this routine. Please add one.</p>' 
            }
        
        else 
        
        {  

            //creates html for routine show page links
            const mch = new Machine(data)
            store["rendinfo"] = mch.renderMch()

            seemachine.after(main)
            main.innerHTML = html + store["rendinfo"] 
                    
        }
    
            main.style.paddingLeft = '15px'
            main.innerHTML += `<a href=”#” class="addroutine${data.id}" onclick="displayMachCreateForm(${data.id});return false;">Add Work Out</a>`

        }
    )
    
}

class Machine {
    constructor(mach) {
        this.id = mach.machines.id
        this.name = mach.machines.name
        this.repetitions = mach.machines.repetitions
        this.sets = mach.machines.sets
        this.ref = BASE_URL + '/users/' + mach.user_id + '/routines/' + mach.id
    }

    rendermchname() {
        return `<a href=”#routine${this.id}” class="routine${this.id}" data-id=”${this.id}” onclick="getMachines();return false;">${this.name}</a>`
    }

    renderMch() {
        return `<p>Work Out Name: ${this.rendermchname()} 
        <br>Repetitions: ${this.repetitions}
        <br>Sets: ${this.sets}
        <br> ${this.renderDel()} 
        <br> 
        </p>`        
    }
    
    renderDel() {
        return `<a href=”#” data-id=”${this.id}” class="delete${this.id}">Delete Work Out</a>`
    }
}