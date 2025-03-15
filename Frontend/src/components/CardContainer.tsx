import { useState } from "react";
import { SimpleGrid, Button } from "@mantine/core";
import Cards from "./Cards";
import NoteModal from "./NoteModal";

const CardContainer = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editedNote, setEditedNote] = useState<any>(null);
  const [notes, setNotes] = useState([
    {
      title: "Meeting Notes",
      content: "Discussed project roadmap and upcoming deadlines.",
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
      <SimpleGrid cols={{ base: 1, sm: 2, md: 3, lg: 4 }} spacing="lg">
        {notes.map((note, index) => (
          <Cards
            key={index}
            title={note.title}
            content={note.content}
            date={note.date}
            category={note.category}
            onClick={() => openEditModal(note)}
          />
        ))}
      </SimpleGrid>

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
