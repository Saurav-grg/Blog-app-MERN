import React from 'react';
import { Link } from 'react-router-dom';

const Category = (props) => {
  // console.log(props.blogs);
  return (
    <div
      className="md:flex justify-around grid grid-cols-2 
    md:gap-2 gap-y-5 gap-x-2 pt-5 pb-7 md:px-5"
    >
      {/* {divElements} */}
      {props.blogs.map((blog, index) => {
        if (index <= 3) {
          return (
            <div className="flex items-center justify-center " key={index}>
              <div className="max-w-[230px] rounded-md ">
                <div className=" w-full ">
                  <img
                    className="w-full object-cover h-full rounded-md"
                    alt="image"
                    src={`http://localhost:5000/${blog.img}`}
                  />
                </div>
                <div className="py-1">
                  <Link to={`/${blog.category}/${blog.slug}`}>
                    <p className="text-primary font-semibold ">{blog.title}</p>
                  </Link>
                </div>
              </div>
            </div>
          );
        }
      })}
    </div>
  );
};

export default Category;
