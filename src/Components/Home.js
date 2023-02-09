import React, { useContext } from 'react'
import NoteContext from '../Context/notes/Notecontext'
import Addnote from './Addnote'
import Notes from './Notes'
export default function Home() {
  const context= useContext(NoteContext)
 const {note,setNote} = context
  return (
 <>

<Notes></Notes>
 </>
  )
}
