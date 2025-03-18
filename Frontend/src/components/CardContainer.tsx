import { useEffect, useState } from "react";
import NoteCard from "./NoteModals/NoteCard";
import NoteManager from "./NoteModals/NoteManager";
import { useAppContext } from "../context/Contexts";

const CardContainer = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editedNote, setEditedNote] = useState<any>(null);
  const { notes, fetchNotes, fetchCategories, page } = useAppContext();

  // Open modal to edit an existing note
  const openEditModal = (note: any) => {
    setEditedNote({ ...note });
    setIsEditing(true);
    setModalOpen(true);
  };

  // Fetch notes when the component mounts
  useEffect(() => {
    fetchNotes();
  }, [fetchCategories, page]);

  return (
    <>
      <div
        className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6`}
      >
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
          <div className=" text-gray-500">Create your notes!</div>
        )}
      </div>

      {/*Form to create/update note*/}
      <NoteManager
        isFormOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        note={editedNote}
        isEditing={isEditing}
      />
    </>
  );
};

export default CardContainer;
