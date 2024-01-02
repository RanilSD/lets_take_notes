//importing dependencies

const util = require('util');
const fs = require('fs');

//creating custom ids for the notes via node package uuid

const uuidv1 = require('uuid/v1');

const readFileAsync = util.promisify(fs.readFile);
const writeFileAsync = util.promisify(fs.writeFile);

class Archive {
    read() {
        return readFileAsync('db/db.json', 'utf8');
    }

    write(note) {
        return writeFileAsync('db/db.json', JSON.stringify(note));

    }

    getNotes() {
        return this.read().then((notes) => {
            let parsedNotes;

            try {
                parsedNotes = [].concat(JSON.parse(notes));
            } catch (error) {
                parsedNotes = [];
            }
            return parsedNotes;
        });
    }
    addNote(note) {
        const { title, text } = note;

        if (!title || !text) {
            throw new Error("can not leave note 'title' and 'text' blank");
        }

        //adding custom id to the new note created

        const newNote = { title, text, id: uuidv1() };

    //getting all notes created and adding the new note and the updated notes

        return this.getNotes()
        .then((notes) => [...notes, newNote])
        .then((updatedNotes) => this.write(updatedNotes))
        .then(() => newNote);
    }

    //getting all notes and deleting the note associated with the id, then writing all the notes left over
    removeNote(id) {
        return this.getNotes()
        .then((notes) => notes.filter((note) => note.id !== id))
        .then((filteredNotes) => this.write(filteredNotes));
    }
}

module.exports = new Archive();