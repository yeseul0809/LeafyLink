interface InputFieldProps {
  name: string;
  value: number | string | null;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
  labelText: string;
  type: 'text' | 'number' | 'datetime-local';
  id: string;
  min?: number;
  onFocus?: (e: React.FocusEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
}

function EventInputField({
  name,
  value,
  onChange,
  placeholder,
  id,
  labelText,
  type,
  min,
  onFocus,
  onBlur
}: InputFieldProps) {
  const handleWheel = (e: React.WheelEvent<HTMLInputElement>) => {
    if (type === 'number') {
      e.currentTarget.blur();
    }
  };
  return (
    <div className="p-3">
      <div className="flex">
        <span className="text-red-500 pr-1">*</span>
        <label className="text-[14px] block mb-3" htmlFor={id}>
          {labelText}
        </label>
      </div>
      <input
        type={type}
        id={id}
        name={name}
        value={value ?? ''}
        onChange={onChange}
        placeholder={placeholder}
        min={min}
        onWheel={handleWheel}
        onFocus={onFocus}
        onBlur={onBlur}
        className="w-[271px] h-[44px] px-3 py-3 border text-[14px] cursor-pointer text-right text-font/sub2 placeholder-font/sub2"
      />
    </div>
  );
}

export default EventInputField;
