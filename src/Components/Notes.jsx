import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import CreateNote from './CreateNote';
import Note from './Note';
import './notes.css';

const Notes = () => {
  const [notes, setNotes] = useState([]); // List of notes
  const [inputText, setInputText] = useState(""); // Input text for the new or edited note
  const [image, setImage] = useState(null); // Input image for the new or edited note
  const [inputTag, setInputTag] = useState(""); // Input tag for the new or edited note
  const [filterTag, setFilterTag] = useState(""); // Tag for filtering notes
  const [editIndex, setEditIndex] = useState(null); // Index of the note being edited
  const [currentUser, setCurrentUser] = useState(null); // Current user
  const navigate = useNavigate();

  // Check authentication and get current user
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("currentUser"));
    if (user) {
      setCurrentUser(user);
    } else {
      navigate("/login");
    }
  }, [navigate]);

  // Load notes from localStorage on component mount
  useEffect(() => {
    const savedNotes = JSON.parse(localStorage.getItem("Notes"));
    if (savedNotes) {
      setNotes(savedNotes);
    }
  }, []);

  // Save notes to localStorage whenever notes change
  useEffect(() => {
    localStorage.setItem("Notes", JSON.stringify(notes));
  }, [notes]);

  // Save a note (add new or update existing)
  const saveHandler = () => {
    const tagsArray = inputTag ? inputTag.split(',').map(tag => tag.trim()) : [];
    if (editIndex !== null) {
      // Update existing note
      const updatedNotes = [...notes];
      updatedNotes[editIndex] = { text: inputText, image: image, tags: tagsArray };
      setNotes(updatedNotes);
    } else {
      // Add new note
      setNotes([...notes, { text: inputText, image: image, tags: tagsArray }]);
    }

    // Clear input fields and reset editIndex
    setInputText("");
    setImage(null);
    setInputTag("");
    setEditIndex(null);
  };

  // Edit a note
  const editHandler = (index, text, img, tags) => {
    setEditIndex(index);
    setInputText(text);
    setImage(img);
    setInputTag(tags.join(','));
  };

  // Delete a note
  const deleteHandler = (index) => {
    const updatedNotes = notes.filter((_, i) => i !== index);
    setNotes(updatedNotes);
  };

  // Logout the user
  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    navigate("/login");
  };

  // Filter notes by tag
  const filteredNotes = filterTag
    ? notes.filter((note) => note.tags && note.tags.some(tag => tag.toLowerCase().includes(filterTag.toLowerCase())))
    : notes;

  return (
    <div className="notes">
      {/* Welcome message */}
      {currentUser && (
        <div className="welcome-message">
          <h2>Welcome, {currentUser.username}!</h2>
        </div>
      )}

      {/* Filter notes by tag */}
      <div className="filter-section">
        <input
          type="text"
          placeholder="Filter by tag"
          value={filterTag}
          onChange={(e) => setFilterTag(e.target.value)}
        />
        <button onClick={() => setFilterTag("")}>Clear Filter</button>
      </div>

      {/* Notes list */}
      {filteredNotes.map((note, index) => (
        editIndex === index ? (
          <CreateNote
            key={index}
            inputText={inputText}
            setInputText={setInputText}
            saveHandler={saveHandler}
            image={image}
            setImage={setImage}
            inputTag={inputTag}
            setInputTag={setInputTag}
          />
        ) : (
          <Note
            key={index}
            text={note.text}
            image={note.image}
            tags={note.tags || []}
            editHandler={() => editHandler(index, note.text, note.image, note.tags || [])}
            deleteHandler={() => deleteHandler(index)}
          />
        )
      ))}

      {/* Create new note */}
      {editIndex === null && (
        <CreateNote
          inputText={inputText}
          setInputText={setInputText}
          saveHandler={saveHandler}
          image={image}
          setImage={setImage}
          inputTag={inputTag}
          setInputTag={setInputTag}
        />
      )}

      {/* Logout button */}
      {currentUser && (
        <button className="logout-button" onClick={handleLogout}>
          Logout
        </button>
      )}
    </div>
  );
};

export default Notes;

