import { Router } from "express";
import {
  createNote,
  updateNote,
  deleteNote,
  getAllNotes,
  getNoteById,
} from "../controllers/noteController";
import {
  createNoteValidation,
  sortNotesValidation,
  updateNoteValidation,
  deleteNoteValidation,
} from "../utils/validators/noteValidators";
import { verifyToken } from "../middleware/verifyToken";

const router = Router();

router.get("/all", verifyToken, sortNotesValidation, getAllNotes);
router.get("/:noteId", verifyToken, getNoteById);
router.post("/create", verifyToken, createNoteValidation, createNote);
router.put("/:noteId", verifyToken, updateNoteValidation, updateNote);
router.delete("/:noteId", verifyToken, deleteNoteValidation, deleteNote);

export default router;
