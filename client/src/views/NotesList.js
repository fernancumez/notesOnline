/* eslint-disable react-hooks/exhaustive-deps */

import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";

import noteContext from "../context/notes/noteContext";

import { format } from "timeago.js";
import Loading from "../components/Loading";

const NotesList = () => {
  const notesContext = useContext(noteContext);

  const { notes, getAllNotes, getNotes, deleteNotes } = notesContext;

  useEffect(() => {
    if (!getAllNotes) return;
    getNotes();
  }, []);

  if (getAllNotes) return <Loading />;

  return (
    <div className="row">
      {notes.map((note) => (
        <div className="col-md-4 p-2" key={note._id}>
          <div className="card">
            <div className="card-header d-flex justify-content-between">
              <h5>{note.title}</h5>
              <Link to={"/edit/" + note._id} className="btn btn-secondary">
                <i className="material-icons">Editar</i>
              </Link>
            </div>
            <div className="card-body">
              <p>{note.content}</p>
              <p>
                <b>Autor: </b>
                {note.author.username}
              </p>
              <p>{format(note.createdAt)}</p>
            </div>
            <div className="card-footer text-center">
              <button
                className="btn btn-danger"
                onClick={() => deleteNotes(note._id)}
              >
                Eliminar
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default NotesList;
