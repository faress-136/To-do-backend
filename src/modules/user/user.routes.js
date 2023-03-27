import express from 'express'
import { auth } from '../../../middleware/auth.js'
import { deleteUser, getById, signIn, signUp, updateUser } from './controller/user.controller.js'

const router = express.Router()


router.post("/signup", signUp)

router.post("/signin", signIn)

router.put("/update", auth, updateUser)

router.get("/getById", auth, getById)

router.delete("/delete", auth, deleteUser)




export default router