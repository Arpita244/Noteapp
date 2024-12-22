import React, { useState } from "react";

const CreateNote = ({
  inputText,
  setInputText,
  saveHandler,
  image,
  setImage,
  inputTag,
  setInputTag,
}) => {
  const char = 100;
  const charLimit = char - inputText.length;

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result); // Store the image URL in state
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="note">
      <textarea
        cols={10}
        rows={5}
        placeholder="Type..."
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
        maxLength={100}
      />

      {/* Image upload box */}
      <div className="image-upload">
        <input type="file" accept="image/*" onChange={handleImageChange} />
        {image && <img src={image} alt="Uploaded" />}
      </div>

      {/* Tag input box */}
      <input
                type="text"
                placeholder="Enter tags (comma separated)"
                value={inputTag}
                onChange={(e) => setInputTag(e.target.value)}
                className="tag-input" // Apply tag-input class for consistent styling
            />

            <div className="note_footer">
                <span className="label">{charLimit} Left </span>
                
                <button className="note_save" onClick={saveHandler}>Save</button>
            </div>
    </div>
  );
};

export default CreateNote;
