import React, { useState } from 'react';

const ImageUploadInput = ({ formData, setFormData }) => {
  const handleImageChange = e => {
    const file = e.target.files[0];

    setFormData(data => ({ ...data, image: file }));
  };

  return (
    <div className="flex items-center">
      <label className="relative cursor-pointer bg-gray-400 hover:bg-gray-500  px-4 py-2 rounded-md shadow-sm">
        <span className="text-sm font-semibold">Upload Image</span>
        <input
          type="file"
          name="image"
          className="sr-only"
          accept="image/*"
          onChange={handleImageChange}
        />
      </label>
      {formData.image && <span className="ml-3">{formData.image.name}</span>}
    </div>
  );
};

export default ImageUploadInput;
