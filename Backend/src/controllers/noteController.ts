import { Request, Response } from "express";
import { Note } from "../models/Note";
import { User } from "../models/User";
import { Category } from "../models/Category";
import { In } from "typeorm";

//Create note
export const createNote = async (req: Request, res: Response) => {
  const { title, content, categoryIds } = req.body;
  const userId = (req as any).user.id;

  try {
    const user = await User.findOne({ where: { id: userId } });

    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    //Find categories
    const categories = await Category.find({
      where: {
        id: In(categoryIds || []),
      },
    });

    //Create Note
    const note = new Note();
    note.title = title;
    note.content = content;
    note.user = user;
    note.categories = categories;

    await note.save();
    res.status(201).json({ message: "Note created sucessfully.", note });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error creating note", error: error.message });
  }
};

// Get All Notes with Sorting
export const getAllNotes = async (req: Request, res: Response) => {
  const userId = (req as any).user.id;
  //Default Values
  const { sortBy = "createdAt", orderBy = "DESC" } = req.query;

  try {
    // Sorting object
    const order = { [sortBy as string]: orderBy as "ASC" | "DESC" };

    // Fetch notes with sorting
    const notes = await Note.find({
      where: { user: { id: userId } },
      order,
      relations: ["categories"],
    });

    res.status(200).json({ notes });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching notes", error: error.message });
  }
};

// Get a Single Note by ID
export const getNoteById = async (req: Request, res: Response) => {
  const { noteId } = req.params;
  const userId = (req as any).user.id;

  try {
    const note = await Note.findOne({
      where: { id: parseInt(noteId), user: { id: userId } },
      relations: ["categories"],
    });

    if (!note) {
      res.status(404).json({ message: "Note not found" });
      return;
    }

    res.status(200).json({ note });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching note", error: error.message });
  }
};

//Update a Note
export const updateNote = async (req: Request, res: Response) => {
  const { noteId } = req.params;
  const { title, content, categoryIds } = req.body;
  const userId = (req as any).user.id;

  try {
    const note = await Note.findOne({
      where: { id: parseInt(noteId), user: { id: userId } },
      relations: ["categories"],
    });
    if (!note) {
      res.status(404).json({ message: "Note not found" });
      return;
    }

    //update note data
    note.title = title || note.title;
    note.content = content || note.content;

    if (categoryIds) {
      const categories = await Category.find({
        where: {
          id: In(categoryIds), // Use `In` to match the categoryIds array
        },
      });
      note.categories = categories;
    }

    await note.save();
    res.status(200).json({ message: "Note updated successfully", note });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error updating note", error: error.message });
  }
};

//Delete a Note
export const deleteNote = async (req: Request, res: Response) => {
  const { noteId } = req.params;
  const userId = (req as any).user.id;

  try {
    const note = await Note.findOne({
      where: { id: parseInt(noteId), user: { id: userId } },
    });

    if (!note) {
      res.status(404).json({ message: "Note not found" });
      return;
    }

    await note.remove();
    res.status(200).json({ message: "Note deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error deleting note", error: error.message });
  }
};
