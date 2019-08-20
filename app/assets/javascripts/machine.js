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
        <label>Weight:</label>
        <input type="text" id="weights">
        <br>
        <input type="submit" value="Submit">
        </form>
    `
    
    cform2.innerHTML = html;
    machinesFormDiv.after(cform2)

}

function createMachRoutine(info) {
     
    let mach_info = {};

    mach_info["machine"] = {
        name: document.getElementById('mach_name').value,
        repetitions: document.getElementById('repetitions').value,
        sets: document.getElementById('sets').value
        ,weights_attributes: {0: {weight: document.getElementById('weights').value, 
                                 routine_id: String(info),
                                 machine_id: ''
     }}
        
    }

    fetch(BASE_URL + '/routines/' + info + '/machines', {
        method: 'POST',
        body: JSON.stringify(mach_info),
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'X-Requested-With': 'XMLHttpRequest',
        },
        credentials: 'same-origin'
    })
    .then(resp => resp.json())

    getMachines(info)

}

function getMachines(info) {
    
    let user_id = document.getElementsByClassName('navbar-brand')[1].href.slice(-1)
    let seemachine = document.querySelector(`.routine${info}`)
    let main = document.createElement("div");
    let store = {};

    let html = `<br>`
    
    fetch(BASE_URL + '/users/' + user_id + '/routines/' + info) 
        .then( resp => resp.json() )
        .then( data => {
            
        if (data.machines.length === 0)
           { 
                seemachine.after(main)
                main.innerHTML = html + '<p>There are no workouts for this routine. Please add one.</p>' 
            }
        
        else 
        
        {  
            //creates html for routine show page links
            store["rendinfo"] = data.machines.map(rand => {
                const mch = new Machine(rand, info)
                return mch.renderMch()  
            }) 

            seemachine.after(main)
            main.innerHTML = html + store["rendinfo"]       
        }
    
            main.style.paddingLeft = '15px'
            main.innerHTML += `<a href=”#” class="addroutine${data.id}" onclick="displayMachCreateForm(${data.id});return false;">Add Work Out</a>`

        }
    )
    
}

function delMach(machine_id, routine_id) {
    debugger; 

    fetch(BASE_URL + '/routines/' + routine_id + '/machines/' + machine_id, {
        method: 'DELETE'
    })
    .then(resp => resp.json())

}

class Machine {
    constructor(mach, routine_id) {
        this.id = mach.id
        this.name = mach.name
        this.repetitions = mach.repetitions
        this.sets = mach.sets
        this.routine_id = routine_id
    }

    rendermchname() {
        return `<a href=”#routine${this.id}” class="routine${this.id}" data-id=”${this.id}”>${this.name}</a>`
    }

    renderMch() {
        return `<p>Work Out Name: ${this.rendermchname()} 
        <br>Repetitions: ${this.repetitions}
        <br>Sets: ${this.sets}
        <br> ${this.renderDel()} 
        </p>`        
    }
    
    renderDel() {
        return `<a href=”#” data-id=”${this.id}” onclick="delMach(${this.id}, ${this.routine_id})" class="deletemach${this.id}">Delete Work Out</a>`
    }
}