import React from 'react';

const Note = ({ id, text, image, tags, editHandler, deleteHandler }) => {
  return (
    <div className="note">
      <div className="note-body">
        {text}
        {image && <img src={image} alt="Note" className="note-image" />} {/* Display the image if available */}
        {tags && tags.length > 0 && ( /* Display tags if available */
          <div className="note-tags">
            {tags.map((tag, index) => (
              <span key={index} className="note-tag">
                #{tag.trim()}
              </span>
            ))}
          </div>
        )}
      </div>
      <div className="note_footer" style={{ justifyContent: "flex-end" }}>
        <button className="note_save" onClick={() => deleteHandler(id)}>
          Delete
        </button>
        &nbsp;
        <button className="note_save" onClick={() => editHandler(id, text, image, tags)}>
          Edit
        </button> {/* Pass tags to editHandler */}
      </div>
    </div>
  );
};

export default Note;
