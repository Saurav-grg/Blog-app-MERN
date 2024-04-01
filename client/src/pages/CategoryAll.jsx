import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { useBlogsContext } from '../hooks/useBlogsContext';
import Errorpage from './Errorpage';

export default function CategoryAll() {
  // const [blogs, setBlogs] = useState([]);
  const { category } = useParams();
  const { blogs } = useBlogsContext();
  const validCategories =
    /^(economics|fitness&health|technology|self-improvement)$/;

  if (!validCategories.test(category)) {
    // Handle invalid category
    // console.error(`Invalid category: ${category}`);
    return <Errorpage />;
  }
  if (blogs) console.log(blogs);
  return (
    <div className="md:w-[80%] mx-auto flex flex-col md:gap-32 gap-20 mt-10 ">
      {blogs
        .filter((blog) => blog.category == category)
        .map((blog, i) => {
          return (
            <div
              className={`flex md:gap-16 xsm:gap-6 gap-2 ${
                i % 2 !== 0 ? 'flex-row-reverse' : ''
              }`}
            >
              <div className="w-[600px] max-h-[400px]">
                <img
                  className="w-full h-full object-cover shadow-2xl rounded-md"
                  src={`http://localhost:5000/${blog.img}`}
                  alt="image"
                />
              </div>
              <div className="w-[700px] flex flex-col md:gap-8 gap-6">
                <div className="md:text-4xl xsm:text-3xl text-2xl font-bold">
                  {blog.title}
                </div>
                {/* <div>{blog.meta.description}</div> */}
                <div className="md:text-lg xsm:block hidden text-sm text-gray-600">
                  Discover the dynamic world of global economics. Unravel trade
                  dynamics, supply-demand interplay, and the impact of tariffs
                  and trade agreements on economies worldwide.
                </div>
                <div className="xsm:text-base text-sm"> {blog.createdAt}</div>
                <div>
                  <Link to={`/${category}/${blog.slug}`}>
                    <button className="px-3 py-1 rounded-sm  bg-black text-light">
                      Read Now
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          );
        })}
    </div>
  );
}
