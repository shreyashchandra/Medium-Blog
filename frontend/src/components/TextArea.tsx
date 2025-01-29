interface TextAreaProps {
  onChange: (e: { target: { value: string } }) => void;
  value: string;
}

function TextArea({ onChange, value }: TextAreaProps) {
  return (
    <div>
      <label
        htmlFor="message"
        className="block  text-sm font-medium text-gray-900 "
      >
        Your Bio
      </label>
      <textarea
        onChange={onChange}
        id="message"
        rows={4}
        className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
        placeholder="Write your Bio here..."
      >
        {value}
      </textarea>
    </div>
  );
}

export default TextArea;
