import React from 'react';
import { useState, useEffect } from 'react';
import { FileInput, Select, TextInput, Button } from 'flowbite-react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { CircularProgressbar } from 'react-circular-progressbar';
import useCreatePost from '../hooks/useCreatePost';
import useUpdatePost from '../hooks/useUpdatePost';
import { useLocation } from 'react-router-dom';
import { app } from '../other/firebase';
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from 'firebase/storage';

export default function CreateBlog() {
  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, false] }],
      // [{ size: ['15px', '18px', '22px', '28px'] }],
      [{ size: ['small', false, 'large', 'huge'] }],
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

  const state = useLocation().state;
  //form data
  const [img, setImg] = useState(null);
  const [imageUploadProgress, setImageUploadProgress] = useState(null);
  const [imageUploadError, setImageUploadError] = useState(null);
  const [imageURL, setImageURL] = useState(null);

  const [title, setTitle] = useState(state?.title || '');
  const [category, setCategory] = useState(state?.category || 'uncategorized');
  const [content, setContent] = useState(state?.content || '');
  const [description, setDescription] = useState(state?.meta.description || '');
  const [keywords, setKeywords] = useState(state?.meta.keywords || '');

  //handle file
  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    setImg(selectedFile);
  };
  //firebse
  const handeUploadImage = async () => {
    try {
      // console.log(img);

      if (!img) {
        setImageUploadError('Please select an image');
        return;
      }
      setImageUploadError(null);
      const storage = getStorage(app);
      const fileName = new Date().getTime() + img.name;
      // console.log(fileName);
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, img);
      uploadTask.on(
        'state_changed',
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setImageUploadProgress(progress.toFixed(0));
        },
        (error) => {
          setImageUploadError('Image upload failed try block');
          setImageUploadProgress(null);
          console.log(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setImageUploadProgress(null);
            setImageUploadError(null);
            setImageURL(downloadURL);
            // setFormData({ ...formData, img: downloadURL });
          });
        }
      );
    } catch (error) {
      setImageUploadError('Image upload failed');
      setImageUploadProgress(null);
    }
  };

  const { error, isLoading, createPost, successMsg } = useCreatePost();
  const {
    error: updateError,
    isLoading: updateLoading,
    updatePost,
  } = useUpdatePost();
  //submit function
  const handleSubmit = async (e) => {
    e.preventDefault();

    const metaData = { description, keywords };
    const metaDataString = JSON.stringify(metaData);

    const formData = new FormData();

    formData.append('title', title);
    formData.append('category', category);
    if (imageURL) {
      formData.append('img', imageURL);
    }
    formData.append('content', content);
    formData.append('meta', metaDataString);

    if (state) {
      await updatePost(state._id, formData); // Replace updatePost with your actual function for updating a post
    } else {
      await createPost(formData);
    }
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
  // console.log(imageUploadProgress);
  return (
    <div className="p-3 max-w-3xl mx-auto min-h-screen mb-12">
      <h1 className="text-center text-3xl my-4 text-primary font-bold">
        Create a post
      </h1>
      <form
        // encType="multipart/form-data"
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
            value={title}
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
          <TextInput
            type="text"
            value={keywords}
            placeholder="Enter keywords separated with comma"
            onChange={(e) => setKeywords(e.target.value)}
          />
        </div>
        <div className="flex justify-between border-teal-400 border-4 rounded items-center p-3 border-dotted">
          {/* image input */}
          <FileInput
            type="file"
            accept="image/*"
            name="image"
            // value={imageURL}
            onChange={handleFileChange}
          />
          <Button
            type="button"
            gradientDuoTone="purpleToBlue"
            outline
            onClick={handeUploadImage}
            disabled={imageUploadProgress}
          >
            {imageUploadProgress ? (
              <div className="w-16 h-16">
                <CircularProgressbar
                  value={imageUploadProgress}
                  text={`${imageUploadProgress || 0}%`}
                />
              </div>
            ) : (
              'Upload Image'
            )}
          </Button>
        </div>
        {imageUploadError && <span>{imageUploadError}</span>}
        {/* description meta */}
        <textarea
          onChange={(e) => setDescription(e.target.value)}
          value={description}
          className="rounded "
          name="description"
          cols="90"
          rows="2"
          placeholder="Enter description"
          id="description"
        ></textarea>

        <div className="flex flex-col xsm:gap-24 gap-44 ">
          <ReactQuill
            theme="snow"
            className=" h-96  "
            value={content}
            onChange={(value) => setContent(value)}
            modules={modules}
          />

          <Button
            type="submit"
            gradientDuoTone="cyanToBlue"
            className=""
            disabled={isLoading || updateLoading}
          >
            {isLoading || updateLoading ? 'Loading...' : 'Post'}
          </Button>
        </div>
        {error || updateError ? (
          <div className="text-red-800 bg-red-200">{error || updateError}</div>
        ) : (
          ''
        )}
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
