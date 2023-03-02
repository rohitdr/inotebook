import React, { useContext, useEffect } from 'react'
import NoteContext from '../Context/notes/Notecontext'
import Addnote from './Addnote'
import Notesitem from './Notesitem'
const Notes = () => {
  const context= useContext(NoteContext)
  const {note,get_all_Notes} = context
  useEffect(()=>{
get_all_Notes()
  },[])
  console.log(note)
  return (
    <>
    <Addnote></Addnote>
    <div className="row my-3">
    <h2>Your notes</h2>
       {note.map((element)=>{
        return <Notesitem note={element} key={element._id}></Notesitem>
       
       
       
       })}
     </div></>
  )
}

export default Notes
