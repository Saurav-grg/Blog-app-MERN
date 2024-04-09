import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
export default function useUpdatePost() {
  const navigate = useNavigate();

  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);

  const updatePost = async (id, formData) => {
    setIsLoading(true);
    setError(null);

    const response = await fetch(`/api/blogs/edit-blog/${id}`, {
      method: 'PUT',
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
      navigate(`/${json.category}/${json.slug}`);
    }
  };

  return { error, isLoading, updatePost };
}
