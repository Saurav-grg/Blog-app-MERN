import { useState } from 'react';
export default function useUpdatePost() {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const [successMsg, setSuccessMsg] = useState(null);
  const updatePost = async (id, formData) => {
    setIsLoading(true);
    setError(null);

    const response = await fetch(
      `http://localhost:5000/api/blogs/edit-blog/${id}`,
      {
        method: 'PUT',
        body: formData,
        credentials: 'include',
      }
    );

    const json = await response.json();
    console.log(json);
    if (!response.ok) {
      setIsLoading(false);
      setError(json.error);
    }
    if (response.ok) {
      setIsLoading(false);
      setSuccessMsg('Post Updated Successfully');
    }
  };

  return { error, isLoading, updatePost, successMsg };
}
