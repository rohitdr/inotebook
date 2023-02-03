import NoteContext from "./Notecontext";
import React from "react";


const Notestate=(props)=>{
    const data={
        "name":"rohit",
        "rollno":12
    }
return(

    <NoteContext.Provider value={data}>

        {props.children}
    </NoteContext.Provider>
)
}
export default Notestate