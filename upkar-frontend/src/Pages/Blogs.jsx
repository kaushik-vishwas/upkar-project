import BlogImage from '../Components/Blogs/BlogImage';
import ReadMore from '../Components/Blogs/ReadMore';
import CmpltNavbar from '../Components/CompletedPrjcts/CmpltNavbar';

const Blogs = () => {
  return (
    <>
      <CmpltNavbar />
      <div className="pt-24">
        <BlogImage />
        <ReadMore />
      </div>
    </>
  );
};

export default Blogs;
