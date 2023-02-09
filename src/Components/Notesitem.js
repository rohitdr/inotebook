
import React, { useContext } from 'react'
import NoteContext from '../Context/notes/Notecontext'
export default function Notesitem(props) {
  const context= useContext(NoteContext)
  const {deleteNote} = context

    const {note} = props
  return (
    <div class="col-md-3 my-2"> 
      <div class="card" style={{width: "18rem"}}>
      <div class="card-body">
 <div className="d-flex justify-content-between">

    <h5 class="card-title">{note.title}</h5>
    <div>  <i class="fa-solid fa-trash" onClick={()=>{
    deleteNote(note._id);
  }}></i>
    <i class="fa-sharp fa-solid mx-2 fa-pen-to-square"></i>
 </div></div>
  
 
    <p class="card-text">{note.description}</p>
 
  </div>
</div>
    </div>
  )
}
