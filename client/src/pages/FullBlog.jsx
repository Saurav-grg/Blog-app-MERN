import React, { useEffect, useState } from 'react';
import { formatDistanceToNow } from 'date-fns/formatDistanceToNow';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.bubble.css'; // import the styles
import Recommended from '../components/Recommended';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { useParams } from 'react-router-dom';
import { useAuthContext } from '../hooks/useAuthContext';
import { FaEdit } from 'react-icons/fa';
import { MdDeleteForever } from 'react-icons/md';
import { useBlogsContext } from '../hooks/useBlogsContext';
import Sharemodal from '../components/Sharemodal';

export default function FullBlog() {
  const { dispatch } = useBlogsContext();
  const { user } = useAuthContext();
  const [blog, setBlog] = useState();
  const [recommend, setRecommend] = useState();
  const { category, slug } = useParams();
  useEffect(() => {
    const fetchBlog = async () => {
      const response = await fetch(`/api/blogs/${category}/${slug}`);
      if (!response.ok) {
        console.log(
          'Error:',
          response.status,
          response.statusText,
          response.json()
        );
        return;
      }
      const data = await response.json();
      const { blogPost, relatedBlogs } = await data;

      if (data) {
        setBlog(blogPost);
        setRecommend(relatedBlogs);
      }
    };
    fetchBlog();
  }, [slug, category]);

  const handleDelete = async () => {
    const url = `/api/blogs/delete-blog/${blog._id}`;
    try {
      const response = await axios.delete(url, { withCredentials: true });
      if (response.status === 200) {
        // Assuming the response contains JSON data
        const data = await response.data;
        dispatch({ type: 'DELETE_BLOG', payload: data });
        console.log('Deleted successfully', data);
      } else {
        console.log(`Error: ${response.status} - ${response.statusText}`);
      }
    } catch (error) {
      console.error('An error occurred:', error.message);
    }
  };

  if (blog) {
    // console.log(blog.img);
    return (
      <>
        <Helmet>
          <meta name="description" content={blog.meta.description} />
          <meta name="keywords" content={blog.meta.keywords.join(', ')} />
        </Helmet>
        <div className="flex flex-col smd:flex-row items-center gap-5 smd:items-start">
          <div className="flex flex-col xsm:w-3/4 w-[95%] ">
            <div className=" ">
              <div className="xsm:text-3xl text-xl max-w-[850px] font-bold text-blue-900 font-sans">
                {blog.title}
              </div>
              <div className="flex justify-between max-w-[850px] my-2 items-center p-1 px-3">
                <div className="flex gap-4">
                  <span className="text-gray-700 text-sm">
                    {formatDistanceToNow(new Date(blog.createdAt), {
                      addSuffix: true,
                    })}
                  </span>
                  <div className="text-green-700 text-sm font-semibold">
                    {blog.category.toUpperCase()}
                  </div>
                  {/* <span className="font-semibold">By Saurav Gurung</span> */}
                </div>
                <div className="flex justify-between gap-4">
                  {user ? (
                    <>
                      <Link
                        to={`/private/create-blog?id=${blog._id}`}
                        state={blog}
                      >
                        <button>
                          <FaEdit className=" xsm:size-6 text-green-400" />
                        </button>
                      </Link>
                      <button onClick={handleDelete}>
                        <MdDeleteForever className=" xsm:size-6 text-red-700" />
                      </button>
                    </>
                  ) : (
                    ''
                  )}
                  {/* share button */}
                  <Sharemodal />
                </div>
              </div>
              <img
                src={blog.img}
                alt="image"
                className="max-h-[400px] w-[850px] object-cover rounded"
              />
            </div>

            <div className="md:max-w-[850px] mt-10 ">
              <ReactQuill
                value={blog.content}
                readOnly={true}
                theme={'bubble'}
              />
            </div>
          </div>
          <div className="flex flex-col gap-5 smd:w-1/4 w-3/4  pt-5">
            <Recommended category={category} relatedBlogs={recommend} />
          </div>
        </div>
      </>
    );
  }
}
