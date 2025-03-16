import { useEffect, useState } from "react";
import NoteCard from "./NoteModals/NoteCard";
import { authapi } from "../config/axios";
import CreateNote from "./NoteModals/CreateNote";

const CardContainer = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editedNote, setEditedNote] = useState<any>(null);
  const [notes, setNotes] = useState<any[]>([]); // Initialize as empty array

  // Open modal to edit an existing note
  const openEditModal = (note: any) => {
    setEditedNote({ ...note });
    setIsEditing(true);
    setModalOpen(true);
  };

  // Fetch notes from the backend
  const fetchNotes = async () => {
    try {
      const response = await authapi.get("/notes"); // Update the endpoint as per your API
      if (response.status === 200) {
        setNotes(response.data.notes);
      }
    } catch (error) {
      console.error("Error fetching notes:", error);
    }
  };

  // Fetch notes when the component mounts
  useEffect(() => {
    fetchNotes();
  }, []);

  // Handle save (edit or add)
  const handleSave = () => {
    if (isEditing) {
      // Update existing note
      setNotes((prevNotes) =>
        prevNotes.map((note) =>
          note.title === editedNote.title ? editedNote : note,
        ),
      );
    } else {
      // Add new note
      setNotes((prevNotes) => [...prevNotes, editedNote]);
    }
    setModalOpen(false);
  };

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {notes.length > 0 ? (
          notes.map((note) => (
            <NoteCard
              key={note.id}
              title={note.title}
              content={note.content}
              date={new Date(note.createdAt).toLocaleDateString()}
              category={note.categories || []}
              onClick={() => openEditModal(note)}
            />
          ))
        ) : (
          <div className="text-center py-10 text-gray-500">
            No notes found. Create your first note!
          </div>
        )}
      </div>

      <CreateNote
        isFormOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        note={editedNote}
        setNote={setEditedNote}
        onSave={handleSave}
        isEditing={isEditing}
        fetchNotes={fetchNotes}
      />
    </>
  );
};

export default CardContainer;
