import { useState } from 'react';
import axios from 'axios';
export default function useCreatePost() {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const [successMsg, setSuccessMsg] = useState(null);
  axios.defaults.withCredentials = true;
  /*  When using FormData, the data is not sent as a plain JSON object but as a multipart/form-data request.
    To fix this issue, you need to make sure that your server-side
    code is properly parsing the incoming multipart/form-data request. In your case, since you're using Express.js,
    you can use the multer middleware to handle file uploads and parse the request body.*/

  const createPost = async (formData) => {
    setIsLoading(true);
    setError(null);
    const response = await axios.post('/api/blogs/create-blog', {
      formData,
    });
    // const response = await fetch('/api/blogs/create-blog', {
    //   method: 'POST',
    //   body: formData,
    //   credentials: 'include',
    // });

    const json = await response.data.newBlog;
    console.log(json);
    if (!response.ok) {
      setIsLoading(false);
      setError(json.error);
    }
    if (response.ok) {
      setIsLoading(false);
      setSuccessMsg('Post Created Successfully');
    }
  };

  return { error, isLoading, createPost, successMsg };
}
