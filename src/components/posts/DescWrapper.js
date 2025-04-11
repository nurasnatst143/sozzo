import Nav from '../nav/Nav';
import Footer from '../Footer';

const DescWrapper = ({ children }) => {
  return (
    <div>
      <div className="bg-sky-600 dark:bg-black">
        <div className="max-w-[1400px] mx-auto">
          <Nav />
        </div>
      </div>
      <div className="max-w-[1400px] mx-auto px-2 py-6">
        {children}
      </div>
      <Footer />
    </div>
  );
};

export default DescWrapper;
