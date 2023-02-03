import React from 'react'
import { useContext } from 'react'
import NoteContext from '../Context/notes/Notecontext'
const About =()=> {
    const a = useContext(NoteContext)
  return (
 <>
this is about {a.name}
 
 </>
  )
}
export default About