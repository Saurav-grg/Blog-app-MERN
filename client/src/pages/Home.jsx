import React from 'react';

import FeaturedBlogs from '../components/FeaturedBlogs';
import Category from '../components/Category';
// import { useBlogsContext } from '../hooks/useBlogsContext';
// import { useSearchParams } from 'react-router-dom';

const Home = () => {
  // const { blogs } = useBlogsContext();
  // const [economics, setEconomics] = useState([]);
  // const [fitness, setFitness] = useState([]);
  // useEffect(() => {
  //   if (blogs) {
  //     const category1 = blogs.filter(
  //       (blog) => blog.category === 'economics' && !blog.featured
  //     );
  //     setEconomics(category1);
  //     const category2 = blogs.filter(
  //       (blog) => blog.category === 'fitness&health' && !blog.featured
  //     );
  //     setFitness(category2);
  //   }
  // }, [blogs]);

  return (
    <>
      <div className="flex justify-center items-center flex-col xsm:w-[90%] py-4 mx-auto">
        <span className="font-bold text-3xl text-primary">
          Unlocking the Box of Wisdom
        </span>
        <span className="text-gray-500">
          Satisfy the Cravings of Busy Minds
        </span>
      </div>
      <div className="xsm:w-[90%] min-h-screen mx-auto ">
        <div className="md:text-3xl text-xl font-bold mx-auto py-2 text-blue-900 border-b-2 w-3/4 ">
          Featured Content
        </div>
        <FeaturedBlogs />
        {/*nxt  */}
        <div className="w-full mx-auto">
          <div
            className=" mx-auto py-2 smd:w-[85%] border-b-2
         flex  items-center"
          >
            <p className="md:text-3xl text-xl  font-bold text-blue-900">
              Latest upload
            </p>
            {/* <button className=" px-2 py-1 font-medium rounded-md text-blue-900 border-blue-900 border-2">
              view more..
            </button> */}
          </div>
          <Category />
        </div>
        {/* nxt */}
        {/* <div className="w-full mx-auto">
          <div
            className=" mx-auto py-2 md:w-[85%] w-[95%] border-b-2
         flex justify-around md:justify-between items-center"
          >
            <p className="md:text-3xl text-xl  font-bold text-blue-900">
              Category2
            </p>
            <button className=" px-2 py-1 font-medium rounded-md text-blue-900 border-blue-900 border-2">
              view more..
            </button>
          </div>
          <Category blogs={fitness} />
        </div> */}
      </div>
    </>
  );
};

export default Home;
