import React from 'react';

const Note = ({ id, text, image, editHandler, deleteHandler }) => {
  return (
    <div className='note'>
        <div className='note-body'>
            {text}
            {image && <img src={image} alt="Note" className="note-image" />} {/* Display the image if available */}
        </div>
        <div className='note_footer' style={{justifyContent : "flex-end"}}>
            <button className='note_save' onClick={() => deleteHandler(id)}>Delete</button> &nbsp;
            <button className='note_save' onClick={() => editHandler(id, text, image)}>Edit</button> {/* Pass image to editHandler */}
        </div>
    </div>
  );
};

export default Note;
