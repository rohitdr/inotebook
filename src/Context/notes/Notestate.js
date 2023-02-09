import NoteContext from "./Notecontext";
import React, { useState } from "react";


const Notestate=(props)=>{
  const host = 'http://localhost:5000/api/'
  const get_all_Notes=async()=>{
    const response = await fetch(`${host}notes/allnotes`, {
      method: 'GET',
  
      headers: {
        'Content-Type': 'application/json',
        'auth-token':'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjNkYTYxNjZjZDk0NzJjMzM5OGVhZDFhIn0sImlhdCI6MTY3NTMzODE5N30.gBRhD8DX9IH2NJC3r8c1n7KSsjXOe6Iw9ne_xzcmoSo'
       
      },
     
  
    });
    let allNotes= await response.json(); 
    console.log(allNotes)
    setNote(allNotes)
  }
   const intialNote=[]
  const [note,setNote]=useState(intialNote)
  //add note
  const addNote=async(given)=>{
    const response = await fetch(`${host}notes/addnote/`, {
      method: 'POST',
  
      headers: {
        'Content-Type': 'application/json',
        'auth-token':'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjNkYTYxNjZjZDk0NzJjMzM5OGVhZDFhIn0sImlhdCI6MTY3NTMzODE5N30.gBRhD8DX9IH2NJC3r8c1n7KSsjXOe6Iw9ne_xzcmoSo'
       
      },
      body: JSON.stringify({
        "title":given.title,
        "description":given.description,
        "tag" : given.tag
      })
  
    });
  const json = await response.json();
 
setNote(note.concat(json))
  }
  //delete note
  const deleteNote=async(id)=>{
    window.confirm("You are sure to delete it ")
    const response = await fetch(`${host}notes/deletenote/${id}`, {
      method: 'DELETE',
  
      headers: {
        'Content-Type': 'application/json',
        'auth-token':'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjNkYTYxNjZjZDk0NzJjMzM5OGVhZDFhIn0sImlhdCI6MTY3NTMzODE5N30.gBRhD8DX9IH2NJC3r8c1n7KSsjXOe6Iw9ne_xzcmoSo'
       
      },
 
  
    });
  const json = await response.json();
console.log(json)
const newNote= note.filter((element)=>{
return  element._id !==id 
})
setNote(newNote)
  }
  
  //edit note
   const editNote=(id , title,description,tag)=>{
    note.map((Element)=>{
      if( Element._id = id)
      {
        Element.title=title
        Element.description=description
        Element.tag=Element.tag
      }
       
        
    })
  }

return(

    <NoteContext.Provider value={{note,addNote,deleteNote,editNote,get_all_Notes}}>

        {props.children}
    </NoteContext.Provider>
)
}
export default Notestate



 


