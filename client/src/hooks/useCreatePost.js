import { useState } from 'react';
export default function useCreatePost() {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const [successMsg, setSuccessMsg] = useState(null);
  const createPost = async (formData) => {
    setIsLoading(true);
    setError(null);

    const response = await fetch('/api/blogs/create-blog', {
      method: 'POST',
      body: formData,
      credentials: 'include',
    });

    const json = await response.json();
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
