interface InputFieldProps {
  name: string;
  value: number | string | null;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
  labelText: string;
  type: 'text' | 'number' | 'datetime-local';
  id: string;
  min?: number;
}

function InputField({
  name,
  value,
  onChange,
  placeholder,
  id,
  labelText,
  type,
  min
}: InputFieldProps) {
  const handleWheel = (e: React.WheelEvent<HTMLInputElement>) => {
    if (type === 'number') {
      e.currentTarget.blur();
    }
  };
  return (
    <div className="mb-6 px-3">
      <label className="text-[14px] block mb-3" htmlFor={id}>
        {labelText}
      </label>
      <input
        type={type}
        id={id}
        name={name}
        value={value ?? ''}
        onChange={onChange}
        placeholder={placeholder}
        min={min}
        onWheel={handleWheel}
        className="w-[271px] h-[44px] px-3 py-3 border text-[14px] text-right text-font/sub2 placeholder-font/sub2"
      />
    </div>
  );
}

export default InputField;
