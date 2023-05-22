// Selectors
const addNoteBtn = document.getElementById("addNoteBtn")



// Functions 


// To add a new note
const addNote = ()=>{    
    const main = document.querySelector("main");
    const  div = document.createElement("div")
    div.classList.add("note");
    div.innerHTML = `
    <div class="head d-flex w-100 bg-dark p-2">
                <div class="d-flex">
                    <input type="text" class="form-control" placeholder="Enter Heading of Note" />
                    <button type="button" onclick="saveHead(this)" class="btn btn-warning text-white">
                        <i class="fa fa-check"></i>
                    </button>
                </div>

                <div id="buttons" class="d-flex ml-4">
                    <button type="button" onclick="saveData(this)" class="btn btn-success">
                        <i class="fa fa-save"></i>
                    </button>
                    <button type="button" onclick="removeNote(this)" class="btn btn-secondary">
                        <i class="fa fa-trash"></i>
                    </button>
                </div>
            </div>
            <textarea name="textarea" class="w-100 h-100 p-3 textArea"></textarea>
    `;
    main.appendChild(div);
}




// Save Heading content
const saveHead = (event) =>{
    const i = event.firstElementChild;
    if (i.classList.contains("fa-check"))
    {
        i.className = "fa fa-edit";
        const divText = document.createElement("div");
        divText.innerText = event.previousElementSibling.value;
        divText.className = "divText d-flex bg-dark "
        const div = event.parentElement;
        div.replaceChild(divText, event.previousElementSibling)
    }
    else if (i.classList.contains("fa-edit"))
    {
        i.className = "fa fa-check";
        const input = document.createElement("input");
        input.value = event.previousElementSibling.innerText;
        input.className = "form-control";
        input.type = "text";
        input.placeholder = "Enter Heading of Note";
        const div = event.parentElement;
        div.replaceChild(input, event.previousElementSibling);
    }
    
}


// Remove one note
const removeNote = (elem)=>{

    let data = localStorage.getItem("notes");
    if (data.indexOf(",")==1)
    {
        data = data.replace(",", "");
    }
    let heading =  elem.parentElement.parentElement.firstElementChild.firstElementChild .innerText;
    let content =  elem.parentElement.parentElement.parentElement.querySelector("textarea").value;
    let noteData = JSON.stringify([heading, content])
    data = JSON.parse(data)
    data = JSON.stringify(data)
    let j = noteData.indexOf(",")
    data = data.replace(`,${noteData}`, "")
    data = data.replace(`${noteData}`, "")
    localStorage.setItem("notes", data);
    if (confirm("Do you want to delete note?"))
    elem.parentElement.parentElement.parentElement.remove();

    // getDataLocal();
}
// removeNote()


// Save all data in localstorage
const saveData = (elem)=>{
    const i = elem.parentElement.previousElementSibling.lastElementChild.firstElementChild;
    if (i.classList.contains("fa-check"))
    {
        console.log(i)

        i.classList.remove("fa-check")
        i.className = "fa fa-edit btn btn-warning text-white";
        const divText = document.createElement("div");
        divText.innerText = i.parentElement.previousElementSibling.value;
        console.log(divText.innerText)
        divText.className = "divText d-flex bg-dark "
        const div = i.parentElement.previousElementSibling;
        console.log(div)
        div.parentElement.replaceChild(divText, div)
        
    }
    const data = JSON.parse(localStorage.getItem("notes"))
    let heading =  elem.parentElement.parentElement.firstElementChild.firstElementChild .innerText;
    let content =  elem.parentElement.parentElement.parentElement.querySelector("textarea").value;
    data.push([heading, content]);
    localStorage.setItem("notes", JSON.stringify(data));

}

const getDataLocal = ()=>{

    
    const data = JSON.parse(localStorage.getItem("notes"));

    data.forEach((e)=>{
        const main = document.querySelector("main");
        const  div = document.createElement("div")
        div.classList.add("note");
        div.innerHTML = `
        <div class="head d-flex w-100 bg-dark p-2">
                    <div class="d-flex">
                        <div class="divText d-flex bg-dark"> ${e[0]} </div>
                        <button type="button" onclick="saveHead(this)" class="btn btn-warning text-white">
                            <i class="fa fa-edit"></i>
                        </button>
                    </div>
    
                    <div id="buttons" class="d-flex ml-4">
                        <button type="button" onclick="saveData(this)" class="btn btn-success">
                            <i class="fa fa-save"></i>
                        </button>
                        <button type="button" onclick="removeNote(this)" class="btn btn-secondary">
                            <i class="fa fa-trash"></i>
                        </button>
                    </div>
                </div>
                <textarea name="textarea" class="w-100 h-100 p-3 textArea">${e[1]}</textarea>
        `;
        main.appendChild(div);
    })

}

//Event listeners 


// To add new note when clicked on add note btn
addNoteBtn.addEventListener("click", addNote);


if (localStorage.getItem("notes"))
{
    getDataLocal();
}
else
{
    addNote();
}


