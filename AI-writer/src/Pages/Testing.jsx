import React, { useState } from 'react';
import Axiosinstance from '../Axios/Axiosinstance';


function Testing() {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
    console.log('Selected file:', file);
  };

  const handleUpload = async (event) => {
    event.preventDefault();
    if (!selectedFile) {
      alert("Please select a file.");
      return;
    }

    const formData = new FormData();
    formData.append("file", selectedFile);

    try {
      const response = await Axiosinstance.post('api/check', formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      // setNames(response.data.names);
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };

  // const handleUpload = () => {
  //   if (selectedFile) {
  //     alert(`Uploading file: ${selectedFile.name}`);
  //     // Add your upload logic here
  //   } else {
  //     alert('No file selected');
  //   }
  // };

  return (
    <div className="mt-24 file-selector">
      <input
        type="file"
        onChange={handleFileChange}
        className="file-input"
      />
      {selectedFile && (
        <div className="file-details">
          <p>Selected File: {selectedFile.name}</p>
          <p>Size: {selectedFile.size} bytes</p>
        </div>
      )}
      <button onClick={handleUpload} className="px-6 py-1 text-white bg-custom-dark-orange">
        Upload File
      </button>
    
    </div>
  );
}

export default Testing;
