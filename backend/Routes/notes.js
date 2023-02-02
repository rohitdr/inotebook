const express = require('express');
const fetchuser = require('../Middleware/fetchuser');
const Notes = require('../Modals/Notes.js');
const router = express.Router();
const { body, validationResult } = require('express-validator');
//fetching all notes
router.get('/allnotes',fetchuser,async (req,res)=>{
    try{
const notes=await Notes.find({user:req.user.id});

    res.json(notes);
}catch(error){
    console.error(error.message)
res.status('500').send('something went wrong')
}
})
//creating a note or add a new note , login required
router.post('/addnote',fetchuser,[
    body('title','Title must be of 3 characters').isLength({ min: 3 }),
    body('description','description must be of 5 characters ').isLength({ min: 5 }),
],async (req,res)=>{
    try{
        const {title, description,tag}=req.body;
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return res.status(400).json({ errors: errors.array() });
        }
       
        const note = new Notes({
            title,description,tag,user:req.user.id
        })
        const savednote =await note.save()
        res.json(savednote)
    }catch(error){
        console.error(error.message)
res.status('500').send('something went wrong')
    }
   
    })
//updating note login requried
router.put('/updatenote/:id',fetchuser,async (req,res)=>{
    try{
const {title,description,tag}=req.body;
const newNote={};
//creating new note object
if(title){
    newNote.title=title
}
if(description){
    newNote.description=description
}
if(tag){
    newNote.tag=tag
}
//verifing user
let  note = await Notes.findById(req.params.id)
if(!note){
    return res.status(404).send("not found")
}

if(note.user.toString() !== req.user.id){
    return res.status(401).send("Not allowed")
}
note = await Notes.findByIdAndUpdate(req.params.id, {$set:newNote},{new:true})
res.json(note)
//find the note to be upadated


    }
    catch(error){
        console.error(error.message)
res.status('500').send('something went wrong')
    }

})
//deleting a note 
router.delete('/deletenote/:id',fetchuser,async (req,res)=>{
    try{


// finding note that is to be deleted
let  note = await Notes.findById(req.params.id)
if(!note){
    return res.status(404).send("not found")
}
//verifing user 
if(note.user.toString() !== req.user.id){
    return res.status(401).send("Not allowed")
}
note = await Notes.findByIdAndDelete(req.params.id);
res.json({"success":"note has been deleted",note:note})
//find the note to be upadated


    }
    catch(error){
        console.error(error.message)
res.status('500').send('something went wrong')
    }

})
module.exports=router