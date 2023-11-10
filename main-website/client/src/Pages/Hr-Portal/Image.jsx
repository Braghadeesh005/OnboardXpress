import React, { useState } from 'react';
import axios from 'axios';

function Image() {
  const [imageFiles, setImageFiles] = useState([]);
  const [results, setResults] = useState([]);

  const classifyImages = async () => {
    try {
      if (imageFiles.length === 0) {
        console.error('Please select one or more image files.');
        return;
      }

      const resultsArray = [];

      for (const imageFile of imageFiles) {
        const formData = new FormData();
        formData.append('image', imageFile);

        try {
          const response = await axios.post('http://localhost:5000/classify', formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          });

          console.log(response.data);
          resultsArray.push(response.data);
        } catch (error) {
          console.error('Error classifying image:', error);
          resultsArray.push({ error: 'Failed to classify image' });
        }
      }

      setResults(resultsArray);
    } catch (error) {
      console.error('Error classifying images:', error);
    }
  };

  return (
    <div>
      <h1>Image Classifier</h1>
      <input
        type="file"
        accept="image/*"
        multiple // Allow multiple file selection
        onChange={(e) => setImageFiles([...e.target.files])}
      />
      <button onClick={classifyImages}>Classify</button>
      {results.length > 0 && (
        <div>
          {results.map((result, index) => (
            <div key={index}>
              {result.error ? (
                <p className='print'>Error classifying image {index + 1}: {result.error}</p>
              ) : (
                <div>
                  <p className='print'>Class: {result.class_name}</p>
                  <p className='print'>Confidence Score: {result.confidence_score}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Image;