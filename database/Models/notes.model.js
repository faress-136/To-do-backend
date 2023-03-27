import mongoose from 'mongoose'


const noteSchema = new mongoose.Schema({
    title: String,
    description: String,
    addedBy: {
        type: mongoose.Types.ObjectId,
        ref: "User"
    },
    completed: {
        type: Boolean,
        default: false
    }
})

const noteModel = mongoose.model('Note', noteSchema)

export default noteModel