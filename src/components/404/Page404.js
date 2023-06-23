
function Page404 () {
  return (
    <div className="absolute flex flex-col items-center justify-center flex-grow w-full h-full text-white -translate-y-1/2 top-1/2">
      <p>OOPS, this page does not exist!</p>
      <a className="text-blue-400 hover:text-white" href="/">Go Back Home</a>
    </div>
  );
};

export default Page404;