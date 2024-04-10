import React from 'react';
import { Link } from 'react-router-dom';
import { useBlogsContext } from '../hooks/useBlogsContext';

const Category = () => {
  // console.log(props.blogs);
  const { blogs } = useBlogsContext();

  return (
    <div
      className="md:flex justify-around grid grid-cols-2 
    md:gap-2 gap-y-5 gap-x-2 pt-5 pb-7 md:px-5"
    >
      {/* latest post view */}
      {blogs &&
        blogs
          .filter((blog) => !blog.featured)
          .map((blog, index) => {
            if (index <= 3) {
              return (
                <Link to={`/${blog.category}/${blog.slug}`} key={index}>
                  <div className="flex items-center justify-center rounded-md hover:scale-110 duration-300">
                    <div className="max-w-[230px]">
                      <div className=" w-full ">
                        <img
                          className="w-full object-cover h-full rounded-md"
                          alt="image"
                          src={`http://localhost:5000/${blog.img}`}
                        />
                      </div>
                      <div className="py-1">
                        <p className="text-primary font-semibold p-1 rounded-md ">
                          {blog.title}
                        </p>
                      </div>
                    </div>
                  </div>
                </Link>
              );
            }
          })}
    </div>
  );
};

export default Category;
