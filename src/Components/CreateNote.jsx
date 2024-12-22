import React from "react";

// The CreateNote component helps users create a note with text, an image, and tags.
const CreateNote = ({
  inputText, // The current text of the note
  setInputText, // Function to update the note text
  saveHandler, // Function to save the note
  image, // The uploaded image for the note
  setImage, // Function to update the uploaded image
  inputTag, // The current tags for the note
  setInputTag, // Function to update the tags
}) => {
  // Define the maximum number of characters allowed in a note
  const maxChars = 500;

  // Calculate how many characters are left for the user to type
  const charLimit = maxChars - inputText.length;

  // Function to handle image uploads
  const handleImageChange = (event) => {
    const file = event.target.files[0]; // Get the selected file

    // Check if a file was selected
    if (file) {
      const reader = new FileReader(); // Create a FileReader to read the file

      // When the file is read, update the image state
      reader.onloadend = () => {
        setImage(reader.result); // Store the uploaded image's data
      };

      // Read the file as a Data URL (Base64 format)
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="note">
      {/* Textarea for writing the note */}
      <textarea
        cols={20}
        rows={15}
        placeholder="Type your note here..."
        value={inputText} // Bind the textarea to the inputText state
        onChange={(event) => setInputText(event.target.value)} // Update inputText when typing
        maxLength={maxChars} // Limit the number of characters
      />

      {/* Image upload section */}
      <div className="image-upload">
        <input
          type="file"
          accept="image/*" // Only allow image files
          onChange={handleImageChange} // Handle file selection
        />
        {image && <img src={image} alt="Uploaded" />} {/* Show the uploaded image */}
      </div>

      {/* Input for entering tags */}
      <input
        type="text"
        placeholder="Enter tags (comma separated)" // Guide the user
        value={inputTag} // Bind the input to the inputTag state
        onChange={(event) => setInputTag(event.target.value)} // Update inputTag when typing
        className="tag-input" // Add a CSS class for styling
      />

      {/* Footer with character count and save button */}
      <div className="note_footer">
        {/* Show remaining character count */}
        <span className="label">{charLimit} characters left</span>

        {/* Button to save the note */}
        <button className="note_save" onClick={saveHandler}>
          Save
        </button>
      </div>
    </div>
  );
};

// Export the component so it can be used in other parts of the app
export default CreateNote;
