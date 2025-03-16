import { useState } from "react";
import NoteModal from "./NoteModal";
import NoteCard from "./NoteModals/NoteCard";

const CardContainer = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editedNote, setEditedNote] = useState<any>(null);
  const [notes, setNotes] = useState([
    {
      title: "Meeting Notes",
      content:
        "Discussed project roadmap and upcoming deadlines. Discussed project roadmap and upcoming deadlines.Discussed project roadmap and upcoming deadlines.Discussed project roadmap and upcoming deadlines.Discussed project roadmap and upcoming deadlines.",
      date: "March 15, 2025",
      category: ["Work", "Meeting"],
    },
    {
      title: "Shopping List",
      content: "Milk, eggs, bread, and coffee.",
      date: "March 14, 2025",
      category: ["Personal", "Shopping"],
    },
    {
      title: "Meeting Notes",
      content:
        "Discussed project roadmap and upcoming deadlines. Discussed project roadmap and upcoming deadlines.Discussed project roadmap and upcoming deadlines.Discussed project roadmap and upcoming deadlines.Discussed project roadmap and upcoming deadlines.",
      date: "March 15, 2025",
      category: ["Work", "Meeting"],
    },
    {
      title: "Shopping List",
      content: "Milk, eggs, bread, and coffee.",
      date: "March 14, 2025",
      category: ["Personal", "Shopping"],
    },
  ]);

  // Open modal to edit an existing note
  const openEditModal = (note: any) => {
    setEditedNote({ ...note });
    setIsEditing(true);
    setModalOpen(true);
  };

  // Open modal for adding a new note

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
        {notes.map((note, index) => (
          <NoteCard
            key={index}
            title={note.title}
            content={note.content}
            date={note.date}
            category={note.category}
            onClick={() => openEditModal(note)}
          />
        ))}
      </div>

      {/* Reusable Modal */}
      <NoteModal
        opened={modalOpen}
        onClose={() => setModalOpen(false)}
        note={editedNote}
        setNote={setEditedNote}
        onSave={handleSave}
      />
    </>
  );
};

export default CardContainer;
