import Joi from "joi"
import noteModel from "../../../../database/Models/notes.model.js"

const noteSchema = Joi.object({
    _id: Joi.optional(),
    title: Joi.string().min(3).max(20).required(),
    description: Joi.string().min(3).max(50).required()
})

export const addNote = async (req, res) => {
    try{
        let {title, description} = req.body
        let {error} = noteSchema.validate(req.body)
        // console.log(title, description);
        if(error){
            res.json({message: "Validation Error", error})
        }
        else{
            const added = await noteModel.insertMany({title, description, addedBy: req.userId})
            res.json({message: "Success", added})
        }
    }
    catch(err){
        res.json({message: "Failed to add note", err})
    }
    
}

export const allNotes = async (req, res)=>{
    try{
        let allNotes = await noteModel.find({addedBy: req.userId})
        res.json({message: "Success", allNotes})
    }
    catch(err){
        res.json({message: "Failed", err})

    }
   
}

export const changeStatus = async (req, res)=>{
    try{
        let {_id, completed} = req.body
        let update = await noteModel.findOneAndUpdate({_id, addedBy: req.userId}, {completed}, {new: true})
        update ? res.json({message: "Task Status changed successfully", update}) : res.json({message: "Failedddd", update})    
    }
    catch(err){
        res.json({message: "Failed....", err})
    }
}

export const deleteNote = async (req, res)=>{
    try{
        let {_id} = req.body
        let note = await noteModel.findOneAndDelete({_id, addedBy: req.userId})
        note ? res.json({message: "Deleted Successfully", note}) : res.json({message: "Failed", note})    
    }
    catch(err){
        res.json({message: "Failed....", err})

    }
}

export const updateNote = async (req, res)=>{
    try{
        let {_id, title, description} = req.body
        let {error} = noteSchema.validate(req.body)
        if(error){
            res.json({message: "Validation Error", error})
        }
        else{
            let updated = await noteModel.findOneAndUpdate({_id, addedBy: req.userId}, {title, description}, {new: true})
            updated ? res.json({message: "Updated Successfully", updated}) : res.json({message: "Failed", updated})
        }
        
    }
    catch(err){
        res.json({message: "Failed....", err})
    }

}