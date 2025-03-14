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

router.get("/", verifyToken, sortNotesValidation, getAllNotes);
router.post("/", verifyToken, createNoteValidation, createNote);
router.get("/:noteId", verifyToken, getNoteById);
router.put("/:noteId", verifyToken, updateNoteValidation, updateNote);
router.delete("/:noteId", verifyToken, deleteNoteValidation, deleteNote);

export default router;

/**
 * @swagger
 * /api/v1/notes:
 *   post:
 *     summary: Create a new note
 *     description: Creates a new note for the authenticated user, ensuring that all specified categories exist.
 *     tags:
 *       - Notes
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - content
 *             properties:
 *               title:
 *                 type: string
 *                 example: "My first note"
 *                 description: The title of the note.
 *               content:
 *                 type: string
 *                 example: "This is the content of my note."
 *                 description: The content of the note.
 *               categoryIds:
 *                 type: array
 *                 items:
 *                   type: integer
 *                 example: [1, 2]
 *                 description: Array of category IDs to associate with the note. All categories must exist.
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       201:
 *         description: Note created successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Note created successfully."
 *                 note:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       example: 1
 *                     title:
 *                       type: string
 *                       example: "My first note"
 *                     content:
 *                       type: string
 *                       example: "This is the content of my note."
 *                     categories:
 *                       type: array
 *                       items:
 *                         type: string
 *                       example: ["Work", "Personal"]
 *       400:
 *         description: Invalid data. This may occur if required fields are missing or if any specified category does not exist.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "One or more categories do not exist."
 *       401:
 *         description: Unauthorized. Bearer token missing or invalid.
 *       500:
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Error creating note."
 *                 error:
 *                   type: string
 *                   example: "Internal server error details."
 */

/**
 * @swagger
 * /api/v1/notes:
 *   get:
 *     summary: Get all notes for the user
 *     description: Fetches all notes for the authenticated user, with sorting, pagination, and category filtering options.
 *     tags:
 *       - Notes
 *     parameters:
 *       - in: query
 *         name: sortBy
 *         required: false
 *         schema:
 *           type: string
 *           example: "createdAt"
 *       - in: query
 *         name: orderBy
 *         required: false
 *         schema:
 *           type: string
 *           enum: [ASC, DESC]
 *           example: "DESC"
 *       - in: query
 *         name: page
 *         required: false
 *         schema:
 *           type: integer
 *           example: 1
 *       - in: query
 *         name: limit
 *         required: false
 *         schema:
 *           type: integer
 *           example: 10
 *       - in: query
 *         name: category
 *         required: false
 *         schema:
 *           type: string
 *           example: "work"
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: List of notes retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 notes:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                       title:
 *                         type: string
 *                       content:
 *                         type: string
 *                       categories:
 *                         type: array
 *                         items:
 *                           type: string
 *                       createdAt:
 *                         type: string
 *                         format: date-time
 *                       updatedAt:
 *                         type: string
 *                         format: date-time
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/v1/notes/{noteId}:
 *   get:
 *     summary: Get a single note by ID
 *     description: Fetches a specific note for the authenticated user based on noteId.
 *     tags:
 *       - Notes
 *     parameters:
 *       - in: path
 *         name: noteId
 *         required: true
 *         schema:
 *           type: integer
 *           example: 1
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Note retrieved successfully
 *       404:
 *         description: Note not found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/v1/notes/{noteId}:
 *   put:
 *     summary: Update an existing note
 *     description: Updates the title, content, and categories of an existing note.
 *     tags:
 *       - Notes
 *     parameters:
 *       - in: path
 *         name: noteId
 *         required: true
 *         schema:
 *           type: integer
 *           example: 1
 *
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 example: "Updated note title"
 *               content:
 *                 type: string
 *                 example: "Updated content"
 *               categoryIds:
 *                 type: array
 *                 items:
 *                  type: integer
 *                 example: [1, 2]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Note updated successfully
 *       400:
 *         description: Invalid data or note not found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/v1/notes/{noteId}:
 *   delete:
 *     summary: Delete a note by ID
 *     description: Deletes a specific note for the authenticated user based on noteId.
 *     tags:
 *       - Notes
 *     parameters:
 *       - in: path
 *         name: noteId
 *         required: true
 *         schema:
 *           type: integer
 *           example: 1
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Note deleted successfully
 *       404:
 *         description: Note not found
 *       500:
 *         description: Internal server error
 */
