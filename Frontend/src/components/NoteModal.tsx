import {
  Modal,
  TextInput,
  Textarea,
  MultiSelect,
  Group,
  Button,
} from "@mantine/core";

import { DateInput } from "@mantine/dates";

interface NoteModalProps {
  opened: boolean;
  onClose: () => void;
  note: any;
  setNote: (note: any) => void;
  onSave: () => void;
}

const NoteModal = ({
  opened,
  note,
  onClose,
  setNote,
  onSave,
}: NoteModalProps) => {
  if (!note) return null; // Avoid rendering before note is set

  return (
    <Modal opened={opened} onClose={onClose} centered size="lg">
      <TextInput
        label="Title"
        value={note.title}
        onChange={(e) => setNote({ ...note, title: e.target.value })}
      />

      <Textarea
        label="Content"
        value={note.content}
        onChange={(e) => setNote({ ...note, content: e.target.value })}
        minRows={5}
        autosize
      />

      <DateInput
        label="Date"
        value={note.date ? new Date(note.date) : null}
        onChange={(date) =>
          setNote({
            ...note,
            date: date ? date.toISOString().split("T")[0] : "",
          })
        }
      />

      <MultiSelect
        label="Categories"
        data={["Work", "Personal", "Meeting", "Shopping", "Fitness", "Health"]}
        value={note.category || []}
        onChange={(value) => setNote({ ...note, category: value })}
        searchable
        clearable
      />

      <Group justify="flex-end" mt="md">
        <Button color="red">Delete</Button>
        <Button onClick={onSave}>Save</Button>
      </Group>
    </Modal>
  );
};

export default NoteModal;
