const noteText = document.getElementById("note-text");
const addBtn = document.getElementById("add-btn");
const notesContainer = document.getElementById("notes-container");
const errorMsg = document.getElementById("error");

let notes = JSON.parse(localStorage.getItem("notes")) || [];
let editIndex = null;

addBtn.addEventListener("click", addOrUpdateNote);
document.addEventListener("DOMContentLoaded", displayNotes);

function addOrUpdateNote() {
    const text = noteText.value.trim();

    if (text === "") {
        errorMsg.classList.remove("hidden");
        return;
    }

    errorMsg.classList.add("hidden");

    if (editIndex !== null) {
        notes[editIndex] = text;
        editIndex = null;
        addBtn.textContent = "Add Note";
    } else {
        notes.push(text);
    }

    noteText.value = "";
    saveNotes();
    displayNotes();
}

function displayNotes() {
    notesContainer.innerHTML = "";

    notes.forEach((note, index) => {
        const card = document.createElement("div");
        card.className = "note-card";

        const p = document.createElement("p");
        p.textContent = note;

        const actions = document.createElement("div");
        actions.className = "note-actions";

        const editBtn = document.createElement("button");
        editBtn.textContent = "Edit";
        editBtn.className = "edit-btn";
        editBtn.onclick = () => editNote(index);

        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "Delete";
        deleteBtn.className = "delete-btn";
        deleteBtn.onclick = () => deleteNote(index);

        actions.appendChild(editBtn);
        actions.appendChild(deleteBtn);

        card.appendChild(p);
        card.appendChild(actions);

        notesContainer.appendChild(card);
    });
}

function deleteNote(index) {
    notes.splice(index, 1);
    saveNotes();
    displayNotes();
}

function editNote(index) {
    noteText.value = notes[index];
    editIndex = index;
    addBtn.textContent = "Update Note";
}

function saveNotes() {
    localStorage.setItem("notes", JSON.stringify(notes));
}
