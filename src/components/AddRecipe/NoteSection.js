// -- Import core React tools
import React from 'react'

class NoteListItem extends React.Component {
    constructor(props) {
        super(props);
        this.handleNotesChange = this.handleNotesChange.bind(this);
        this.handleDeleteNote = this.handleDeleteNote.bind(this);
    }

    handleNotesChange(e) {
        this.props.onNoteChange(this.props.index, e.target.value);
    }

    handleDeleteNote(e) {
        this.props.onNoteDelete(this.props.index);
    }

    render() {
        return (
            <li>
                <textarea value={this.props.note} onChange={this.handleNotesChange}/>
                <button onClick={this.handleDeleteNote}>X</button>
            </li>
        );
    }
}

class NoteSection extends React.Component {
    constructor(props) {
        super(props);
        this.handleNotesChange = this.handleNotesChange.bind(this);
        this.handleNewNote = this.handleNewNote.bind(this);
        this.handleDeleteNote = this.handleDeleteNote.bind(this);
    }

    handleNotesChange(index, value) {
        this.props.onNotesChange(index, value);
    }

    handleNewNote(e) {
        this.props.onNoteAdded();
    }

    handleDeleteNote(index) {
        this.props.onNoteDeleted(index);
    }

    render() {
        var self = this;
        var rows = [];
        this.props.recipe.notes.forEach(function (note, index) {
            rows.push(<NoteListItem key={index}
                                    index={index}
                                    note={note}
                                    onNoteChange={self.handleNotesChange}
                                    onNoteDelete={self.handleDeleteNote} />);
        });
        return (
            <div>
                <h2>Notes Section</h2>
                <ol>
                    {rows}
                </ol>
                <button onClick={this.handleNewNote}>Add New +</button>
            </div>
        );
    }
}
export default NoteSection