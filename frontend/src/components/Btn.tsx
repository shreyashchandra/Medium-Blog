function Btn({
  btnName,
  submitHandler,
}: {
  btnName: string;
  submitHandler: () => void;
}) {
  return (
    <div>
      <button
        onClick={submitHandler}
        type="button"
        className="text-white bg-[#050708] hover:bg-[#050708]/80 focus:ring-4 focus:outline-none focus:ring-[#050708]/50 font-medium rounded-sm text-sm px-50 py-2 text-center inline-flex items-center dark:hover:bg-[#050708]/40 dark:focus:ring-gray-600 me-2 mb-2"
      >
        <span className="text-lg font-semibold">{btnName}</span>
      </button>
    </div>
  );
}

export default Btn;
