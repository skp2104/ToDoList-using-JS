console.log("Welcome to Notes App. This is app.js");

//If user adds a Note, add it to the localStorage
let addBtn = document.getElementById('addBtn');
//Adding 'Click' event to the 'addBtn' button i.e. whenever clicked the below function will run
addBtn.addEventListener("click", function (e) {

    let addTxt = document.getElementById("addTxt");
    let notes = localStorage.getItem("notes"); //notes is an Array
    if (notes == null) {
        notesObj = []; //notesObj is an Array
    }
    else {
        notesObj = JSON.parse(notes); //if getting some string then parse it i.e. convert string into Array
    }
    notesObj.push(addTxt.value); //pushing value of addTxt inside notes if someone clicks on addBtn then we will update the Notes
    localStorage.setItem("notes", JSON.stringify(notesObj));//also we will update the localStorage
    //converting into string by JSON.stringify bcoz in localStorage we need to set it as string

    addTxt.value = ""; //making addTxt value = blank after updating the notes
    console.log(notesObj); //printing in console to verify it is working or not

    //WRITING A FUNCTION TO DISPLAY NOTES BELOW AFTER ADDING
    showNotes();
})

//FUNCTION TO SHOW ELEMENTS FROM LOCAL STORAGE
function showNotes() {
    //copying same type of code from above for this function
    let notes = localStorage.getItem("notes"); //notes is an Array
    if (notes == null) {
        notesObj = []; //notesObj is an Array
    }
    else {
        notesObj = JSON.parse(notes); //if getting some string then parse it i.e. convert string into Array
    }
    let html = ""; //making a blank string
    notesObj.forEach(function (element, index) {
        //adding the bootstrap card in the empty html string using backticks. '+=' means appending
        html += `
            <div class="noteCard my-2 mx-2 card" style="width: 18rem;">
                <div class="card-body">
                    <h5 class="card-title">Note ${index + 1} </h5>
                    <p class="card-text"> ${element} </p>
                    <button id="${index}" onClick="deleteNote(this.id)" class="btn btn-primary">Delete Note</button>
                </div>
            </div>`;
    }); //we can apply forEach loop since 'notes' is an Array

    let noteElm = document.getElementById("notes")
    if (notesObj.length != 0) {
        noteElm.innerHTML = html;
    }
    else { //Not working
        noteElm.innerHTML = `Nothing to show! use "Add a Note" Section above to add notes,`;
    }
}

//FUNCTION TO DELETE A NOTE
function deleteNote(index) {
    console.log("I am deleting", index);

    //again copying code from above for localStorage
    let notes = localStorage.getItem("notes"); //notes is an Array. Reading from localStorage
    if (notes == null) {
        notesObj = []; //notesObj is an Array
    }
    else {
        notesObj = JSON.parse(notes); //if getting some string then parse it i.e. convert string into Array
    }

    notesObj.splice(index, 1); //splice() takes first argument and in second argument we give how many element we want to delete
    localStorage.setItem("notes", JSON.stringify(notesObj));//Now updating localStorage. pushing nodeObj inside localeStorage after deleting notes
    showNotes(); //clling the showNotes function now to check
}


