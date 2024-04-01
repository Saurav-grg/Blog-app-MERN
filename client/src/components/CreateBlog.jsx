import React from 'react';
import { useState, useEffect } from 'react';
import { FileInput, Select, TextInput, Button } from 'flowbite-react';
import ReactQuill, { Quill } from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import useCreatePost from '../hooks/useCreatePost';
// import CustomFontSize from '../QuillCustomize/CustomFontSize';

export default function CreateBlog() {
  const Size = Quill.import('attributors/style/size');
  Size.whitelist = ['15px', '18px', '22px', '28px'];
  // Register this configuration with Quill
  Quill.register(Size, true);
  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, false] }],
      [{ size: ['15px', '18px', '22px', '28px'] }],
      [{ font: [] }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote', 'code-block'],

      [{ align: [] }],
      [
        { list: 'ordered' },
        { list: 'bullet' },
        { list: 'check' },
        { indent: '-1' },
        { indent: '+1' },
      ],
      [{ script: 'sub' }, { script: 'super' }],

      [{ color: [] }, { background: [] }],
      ['link', 'image', 'video', 'formula'],
      ['clean'],
    ],
  };

  const [img, setImg] = useState(null);
  //form data

  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('uncategorized');
  const [content, setContent] = useState('');
  const [description, setDescription] = useState('');
  const [keywords, setKeywords] = useState('');
  //handle file
  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    setImg(selectedFile);
  };

  const { error, isLoading, createPost, successMsg } = useCreatePost();

  //submit function
  const handleSubmit = async (e) => {
    e.preventDefault();

    const metaData = { description, keywords };
    const metaDataString = JSON.stringify(metaData);

    const formData = new FormData();

    formData.append('image', img);
    formData.append('title', title);
    formData.append('category', category);
    formData.append('content', content);
    formData.append('meta', metaDataString);

    await createPost(formData);
  };
  const [showMsg, setShowMsg] = useState(true);

  useEffect(() => {
    if (successMsg) {
      const timer = setTimeout(() => {
        setShowMsg(false);
      }, 5000); // Change this value to control the duration

      return () => clearTimeout(timer); // This will clear the timer when the component unmounts
    }
  }, [successMsg]);
  return (
    <div className="p-3 max-w-3xl mx-auto min-h-screen">
      <h1 className="text-center text-3xl my-4 text-primary font-bold">
        Create a post
      </h1>
      <form
        encType="multipart/form-data"
        onSubmit={handleSubmit}
        className="flex flex-col gap-5 mb-5"
      >
        <div className="flex gap-5">
          <TextInput
            className="flex-1"
            type="text"
            placeholder="Enter title"
            required
            id="title"
            onChange={(e) => setTitle(e.target.value)}
          />
          <Select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="uncategorized" disabled>
              Select a category
            </option>
            <option value="economics">Economics</option>
            <option value="fitness&health">Fitness & Health</option>
            <option value="technology">Technology</option>
            <option value="self-improvement">Self Improvement</option>
          </Select>
        </div>
        <div>
          <textarea
            onChange={(e) => setDescription(e.target.value)}
            className="rounded "
            name="description"
            cols="90"
            rows="2"
            placeholder="Enter description"
            id="description"
          ></textarea>
          <TextInput
            type="text"
            placeholder="Enter keywords separated with comma"
            onChange={(e) => setKeywords(e.target.value)}
          />
        </div>
        <div className="flex justify-between border-teal-400 border-4 rounded items-center p-3 border-dotted">
          <FileInput
            type="file"
            accept="image/*"
            name="image"
            onChange={handleFileChange}
          />
          <Button
            type="button"
            gradientDuoTone="purpleToBlue"
            outline
            // onClick={() => setImage(base64)}
          >
            upload
          </Button>
        </div>
        <ReactQuill
          theme="snow"
          className="h-72 "
          value={content}
          onChange={(value) => setContent(value)}
          modules={modules}
        />

        <Button
          type="submit"
          gradientDuoTone="cyanToBlue"
          className="mt-8"
          disabled={isLoading}
        >
          {isLoading ? 'Loading...' : 'Post'}
        </Button>
        {error ? <div className="text-red-800 bg-red-200">{error}</div> : ''}
        {showMsg && (
          <div
            className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2
          text-green-900 bg-green-200 text-center p-3 rounded-lg font-semibold 
          text-lg opacity-70"
          >
            {successMsg}
          </div>
        )}
      </form>
    </div>
  );
}
