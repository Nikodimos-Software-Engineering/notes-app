import express from "express";
import {fetchAllNotes, fetchNoteById, addNote, updateNote, deleteNote} from "../controllers/noteControllers.js"

const router = express.Router();

router.get("/", fetchAllNotes);
router.get("/:id", fetchNoteById);
router.post("/", addNote);
router.put("/:id", updateNote);
router.delete("/:id", deleteNote);

export default router;