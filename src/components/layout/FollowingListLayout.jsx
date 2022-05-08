import Footer from "./elements/Footer";

const FollowingListLayout = ({children}) => {

  return (
    <>
      {/* <Navbar /> */}
      <main className="min-h-screen max-w-md mx-auto py-20">
        {children}
      </main>
      <Footer />
    </>
  );

};

export default FollowingListLayout;