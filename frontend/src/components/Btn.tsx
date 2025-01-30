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
        className="bg-black text-white px-24 py-2 rounded-sm cursor-pointer hover:bg-gray-800 transition-all duration-200"
      >
        <span className="text-lg font-semibold">{btnName}</span>
      </button>
    </div>
  );
}

export default Btn;
