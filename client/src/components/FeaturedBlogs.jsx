import React, { useState, useEffect } from 'react';
// import { FaHeart, FaComments } from 'react-icons/fa';
import { useBlogsContext } from '../hooks/useBlogsContext';
import { Link } from 'react-router-dom';
const FeaturedBlogs = () => {
  const [featuredBlogs, setFeaturedBlogs] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const { blogs } = useBlogsContext();

  useEffect(() => {
    if (blogs && blogs.length > 0) {
      const featured = blogs.filter((blog) => blog.featured);
      setFeaturedBlogs(featured);

      setLoaded(true);
    }
  }, [blogs]);
  // console.log(featuredBlogs && featuredBlogs[0].title);
  if (!loaded) {
    return <div className="h-[550px] w-full"></div>;
  }

  return (
    <div
      className="xsm:p-5 mb-5 md:h-[650px] xsm:w-[95%]  mx-auto 
    flex justify-center flex-col gap-x-6 gap-y-5 md:flex-row"
    >
      {/* featured 1 */}
      <div
        className="outline outline-gray-50 flex flex-col justify-around shadow-lg
       rounded-lg max-h-full md:w-[58%]  p-4"
      >
        <p className="smd:text-2xl text-lg font-bold text-primary">
          {featuredBlogs[0].title}
        </p>

        <div className=" w-full p-2 h-[60%]">
          <img
            className="w-full object-cover h-full"
            alt="image"
            src={`http://localhost:5000/${featuredBlogs[0].img}`}
          />
        </div>
        <div className="max-h-[50px] overflow-hidden">
          {featuredBlogs[0].meta.description}
        </div>
        <div
          className="flex items-center justify-between text-gray-500"
          // style={{ boxShadow: '0 -5px 10px -5px rgba(255, 255, 255, 0.3)' }}
        >
          <span>12 feb,2024</span>
          {/* <FaHeart />
          <FaComments /> */}
          <Link to={`/${featuredBlogs[0].category}/${featuredBlogs[0].slug}`}>
            <button
              className="py-1 mr-2 md:px-3 px-1  border-black border-2 text-light rounded font-semibold bg-black
                  hover:text-primary hover:rounded-none hover:bg-gray-800"
            >
              Read Now..
            </button>
          </Link>
        </div>
      </div>

      <div className="md:flex-1 flex md:flex-col  justify-between xsm:gap-4 gap-2">
        {/* featured 2 */}
        <div className="outline outline-gray-50 shadow-lg overflow-hidden rounded-lg h-2/4 md:w-full w-2/4 p-4">
          <p className=" md:text-xl h-[60px] overflow-auto font-bold text-primary">
            {featuredBlogs[1].title}
          </p>

          <div className="h-[60%] p-2">
            <img
              className="w-full object-cover h-full"
              alt="imag"
              src={`http://localhost:5000/${featuredBlogs[1].img}`}
            />
          </div>

          <div className="flex gap-5 items-center justify-between  text-gray-500 my-3">
            <span>12 feb,2024</span>
            {/* <FaHeart />
            <FaComments /> */}
            <Link to={`/${featuredBlogs[1].category}/${featuredBlogs[1].slug}`}>
              <button
                className="py-1 mr-2 md:px-3 px-1 text-sm border-black border-2 text-light rounded font-semibold bg-black
                      hover:text-primary hover:rounded-none hover:bg-gray-800"
              >
                Read Now
              </button>
            </Link>
          </div>
        </div>
        {/* featured 3 */}
        <div className="outline outline-gray-50 shadow-lg overflow-hidden rounded-lg h-2/4 md:w-full w-2/4 p-4">
          <p className="md:text-xl h-[60px] overflow-auto font-bold text-primary">
            {featuredBlogs[2].title}
          </p>

          <div className="h-[60%] p-2">
            <img
              className="w-full object-cover h-full"
              alt="imag"
              src={`http://localhost:5000/${featuredBlogs[2].img}`}
            />
          </div>

          <div className="flex gap-5 items-center justify-between text-gray-500 my-3">
            <span>12 feb,2024</span>
            {/* <FaHeart />
            <FaComments /> */}
            <Link to={`/${featuredBlogs[2].category}/${featuredBlogs[2].slug}`}>
              <button
                className="py-1 mr-2 md:px-3 px-1 text-sm border-black border-2 text-light rounded font-semibold bg-black
              hover:text-primary hover:rounded-none hover:bg-gray-800"
              >
                Read Now
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeaturedBlogs;
