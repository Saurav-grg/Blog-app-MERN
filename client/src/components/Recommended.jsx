import React from 'react';
import { Link } from 'react-router-dom';

export default function Recommended(props) {
  // console.log(props.relatedBlogs);
  const recommend = props.relatedBlogs;
  return (
    <>
      <div className="font-bold text-xl border-b-8 py-3 w-full border-black">
        You Might also like
      </div>
      {recommend &&
        recommend.map((blog, i) => {
          return (
            <Link to={`/${props.category}/${blog.slug}`} key={i}>
              <div className="text-primary font-semibold w-full border-b-2 border-black py-2">
                {blog.title}
              </div>
            </Link>
          );
        })}
    </>
  );
}
