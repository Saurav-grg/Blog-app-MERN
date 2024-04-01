import React, { useEffect, useState } from 'react';
import { FaShareSquare } from 'react-icons/fa';
import { formatDistanceToNow } from 'date-fns/formatDistanceToNow';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.bubble.css'; // import the styles
import Recommended from '../components/Recommended';
import { Helmet } from 'react-helmet';
import { useParams } from 'react-router-dom';
import { useAuthContext } from '../hooks/useAuthContext';

export default function FullBlog() {
  const { user } = useAuthContext();
  const [blog, setBlog] = useState();
  const [recommend, setRecommend] = useState();
  const { category, slug } = useParams();
  useEffect(() => {
    const fetchBlog = async () => {
      const response = await fetch(
        `http://localhost:5000/api/blogs/${category}/${slug}`
      );
      if (!response.ok) {
        console.log('Error:', response.status, response.statusText);
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
  // console.log(blog);

  // if (!blog) {
  //   return <div>Loading spinner...</div>; // or any loading spinner
  // }
  if (blog) {
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
                Hello {blog.title} in this obsecure time and economy of this
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
                {user ? (
                  <div>
                    <button>edit</button>
                    <button>delete</button>
                  </div>
                ) : (
                  ''
                )}

                <button>
                  <FaShareSquare className=" xsm:size-6 text-red-400" />
                </button>
              </div>
              <img
                src={`http://localhost:5000/${blog.img}`}
                alt="image"
                className="max-h-[400px] w-[850px] object-cover rounded"
              />

              {/* <div
              style={{ backgroundColor: 'rgba(255, 255, 255, 0.8)' }}
              className="p-4 rounded-lg flex flex-col gap-4 shadow-lg absolute bottom-[-60px] left-1/4 right-1/4  "
            >
              <div className="text-3xl font-bold text-blue-900 font-sans">
                {blog.title} in this obsecure time and economy of this
              </div>
              <div className="text-gray-500 font-semibold">
                Category : {blog.category}
              </div>
              <div className="flex justify-between">
                <div className="flex gap-1">
                  <img
                    src="/profile.jpg"
                    alt="profile image"
                    className="rounded-full w-12 h-12 object-cover"
                  />
                  <div className="flex flex-col">
                    <span className="font-semibold">By Saurav Gurung</span>
                    <span className="text-gray-700">
                      {formatDistanceToNow(new Date(blog.createdAt), {
                        addSuffix: true,
                      })}
                    </span>
                  </div>
                </div>
                <button>
                  <FaShareSquare className=" size-6 text-red-400" />
                </button>
              </div>
            </div> */}
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
