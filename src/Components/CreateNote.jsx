import React, { useState } from 'react'

const CreateNote = ({ inputText, setInputText, saveHandler, image, setImage }) => {
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
            <div className="note_footer">
                <span className="label">{charLimit} Left</span>
                <button className="note_save" onClick={saveHandler}>Save</button>
            </div>

            {/* Image upload box */}
            <div className="image-upload">
                <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                />
                {image && <img src={image} alt="Uploaded" />}
            </div>
        </div>
    )
}

export default CreateNote;
