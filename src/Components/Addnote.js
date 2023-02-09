
import React, { useContext, useState } from 'react'
import NoteContext from '../Context/notes/Notecontext'
const Addnote = () => {
const [note , setNote]= useState({title:"",description:"",tag:""})
    const context= useContext(NoteContext)
    const {addNote} = context
    const handleclick=(e)=>{
   e.preventDefault();
      addNote(note);
    }
    const onChange=(e)=>{
setNote({...note, [e.target.name] : e.target.value})

    }
  return (
    <div>
      <div className="container my-3">
<h1>Add a Note</h1>
<form>
  <div className="mb-3">
    <label htmlFor="title" className="form-label">title</label>
    <input type="text" className="form-control" id="title" name="title" aria-describedby="emailHelp" onChange={onChange}/>
    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
  </div>
  <div className="mb-3">
    <label htmlFor="description" className="form-label">description</label>
    <input type="text" className="form-control"  name ="description" id="description" onChange={onChange}/>
  </div>
  
  <button type="submit" className="btn btn-primary" onClick={handleclick}>Add Note</button>
</form>
</div>
    </div>
  )
}

export default Addnote
