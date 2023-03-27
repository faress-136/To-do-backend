import express from 'express'
import { auth } from '../../../middleware/auth.js'
import { addNote, allNotes, changeStatus, deleteNote, updateNote } from './controller/note.controller.js'


const router = express.Router()

router.post("/add", auth, addNote)

router.get("/all", auth, allNotes)

router.put("/status", auth, changeStatus)

router.delete("/delete",auth, deleteNote)

router.put("/update", auth, updateNote)




export default router