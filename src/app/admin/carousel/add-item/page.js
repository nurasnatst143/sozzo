'use client';
import { useState } from 'react';
import ImageUploadInput from '@/components/posts/ImageUploadInput';

const page = () => {
  const [state, setState] = useState({
    image: '',
    description: '',
  });
  return (
    <div>
      <h1 className="text-xl font-bold text-center py-9 border-b border-amber-500">
        Add New Carousel Item
      </h1>
      <div className="px-5 py-6">
        <form
          action="/api/carousel"
          method="POST"
          encType="multipart/form-data"
        >
          <div>
            <label
              className="text-md font-semibold pb-1 block"
              htmlFor="description"
            >
              Description
            </label>
            <textarea
              type="text"
              id="description"
              className="w-full rounded-md text-black"
              name="description"
              value={state.description}
              onChange={e =>
                setState({ ...state, [e.target.name]: e.target.value })
              }
              rows={3}
              required
            />
          </div>

          <div>
            <ImageUploadInput formData={state} setFormData={setState} />
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-green-300 px-6 py-2 font-semibold text-lg rounded-md"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default page;
