const Quote = () => {
  return (
    <>
      <div className="bg-gray-200 h-screen flex justify-center flex-col">
        <div className="flex justify-center items-center flex-col gap-4">
          <h1 className="text-5xl text-gray-700 font-semibold">
            cogito ergo sum.
          </h1>
          <h3 className="text-2xl  text-gray-500 ">
            "I think, therefore I am"
          </h3>
          <p className="text-black text-lg -mt-3">- René Descartes</p>
        </div>
      </div>
    </>
  );
};

export default Quote;
