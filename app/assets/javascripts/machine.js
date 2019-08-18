function displayMachCreateForm(info) {

    let routinesFormDiv = document.querySelector(`.delete${info}`);
    let cform2 = document.createElement("div");
    let html = `
        <br>
        <form onsubmit="createMachRoutine(); return false">
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
    // <%= form_for @routine do |f| %>

    //         Add a New Routine

    //         <br>
    //         <br>
    //         <div class="text">
    //         Name: <%= f.text_field :name %><br>
    //         </div>
    //         <br>  
    //         <%= f.submit %>
    //         <% end %></br>
    
    cform2.innerHTML = html;
    routinesFormDiv.after(cform2)

}

function createMachRoutine() {
    
    debugger;
     
}

function getMachines(routine_id) {
    debugger; 
    let main = document.createElement("div");
    let store = {};

    fetch(BASE_URL + '/routines/' + routine_id + '/machines) 
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