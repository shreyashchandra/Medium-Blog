interface LabledInputProps {
  label: string;
  placeholder: string;
  onChange: (e: { target: { value: string } }) => void;
  value: string;
  inputType?: string;
}

function LabledInput({
  label,
  placeholder,
  onChange,
  value,
  inputType = "text",
}: LabledInputProps) {
  return (
    <div>
      <div>
        <label
          htmlFor="first_name"
          className="block text-sm font-medium text-gray-900"
        >
          {label}
        </label>
        <input
          onChange={onChange}
          type={inputType}
          id="first_name"
          className=" border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  "
          placeholder={placeholder}
          required
          value={value}
        />
      </div>
    </div>
  );
}

export default LabledInput;
