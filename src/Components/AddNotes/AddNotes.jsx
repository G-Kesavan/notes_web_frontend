import { useState } from "react";
import TagInput from "../TagInput/TagInput";
import { MdClose } from "react-icons/md";
import axiosInstance from "../../utils/axiosInstance";

const AddNotes = ({ noteData, type, closeOn, getAllNotes }) => {
  const [title, setTitle] = useState(noteData ? noteData.title : "");
  const [content, setContent] = useState(noteData ? noteData.content : "");
  const [tags, setTags] = useState(noteData ? noteData.tags : []);
  const [error, setError] = useState(null);

  const editNote = async () => { 
    try {
      const response = await axiosInstance.put(
        `/note/edit_note?noteId=${noteData.id}`,
        {
          title,
          content,
          tags,
        }
      );
      console.log(response);
      getAllNotes();
      closeOn();
    } catch (error) {
      setError(error);
    }
  };

  const addNotes = async () => {
    try {
      const response = await axiosInstance.post("/note/add_note", {
        title,
        content,
        tags,
      });
      if (
        response.data &&
        response.data.message === "Note added successfully"
      ) {
        getAllNotes();
        closeOn();
      }
    } catch (error) {
      console.error("Failed to add note", error);
    }
  };

  const handleAddNote = () => {
    if (!title) {
      setError("Pleace add title");
      return;
    }
    if (!content) {
      setError("Pleace add content");
      return;
    }
    setError("");

    if (type === "edit") {
      editNote();
    } else {
      addNotes();
    }
  };
  return (
    <div className="relative flex flex-col bg-blue-200 w-[90%] md:w-[65%] h-fit p-5 m-auto rounded-lg gap-1.5">
      <div className="absolute right-0 top-0 p-5">
        <button className="" onClick={() => closeOn()}>
          <MdClose />
        </button>
      </div>
      <div className="flex flex-col gap-1">
        <label className="input-label text-sm text-blue-950 font-bold">
          TITLE
        </label>
        <input
          type="text"
          className="text-2xl text-slate-950 outline-none p-1 border rounded-sm bg-white"
          placeholder="Title"
          value={title}
          onChange={({ target }) => setTitle(target.value)}
        />
      </div>
      <div className="flex flex-col gap-1">
        <label className="input-label text-sm text-blue-950 font-bold">
          CONTENT
        </label>
        <textarea
          type="text"
          placeholder="Content"
          rows={8}
          className=" p-2 bg-white border rounded-sm outline-none"
          value={content}
          onChange={({ target }) => setContent(target.value)}
        />
      </div>
      <div>
        <label className="input-label text-sm text-blue-950 font-bold">
          TAGS
        </label>
        <TagInput tags={tags} setTags={setTags} />
      </div>
      {error && <p>{error}</p>}
      <button className="bg-blue-500 p-1 rounded-sm" onClick={handleAddNote}>
        {type == "edit" ? "UPDATE" : "ADD"}
      </button>
    </div>
  );
};

export default AddNotes;
