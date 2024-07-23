'use client';

import React from 'react';

interface PhoneFormProps {
  onChange?: (value: string) => void;
  initialPhone?: string;
}

const PhoneForm: React.FC<PhoneFormProps> = ({ onChange, initialPhone = '' }) => {
  const [phoneParts, setPhoneParts] = React.useState({
    part1: initialPhone.slice(0, 3),
    part2: initialPhone.slice(3, 7),
    part3: initialPhone.slice(7)
  });

  const handleInput = (part: 'part1' | 'part2' | 'part3', value: string) => {
    const cleanValue = value.replace(/[^0-9]/g, '');
    const maxLength = part === 'part1' ? 3 : 4;
    const newValue = cleanValue.slice(0, maxLength);
    setPhoneParts((prev) => ({ ...prev, [part]: newValue }));

    if (onChange) {
      const fullPhone = `${phoneParts.part1}${phoneParts.part2}${phoneParts.part3}`;
      onChange(fullPhone);
    }
  };

  React.useEffect(() => {
    if (onChange) {
      const fullPhone = `${phoneParts.part1}${phoneParts.part2}${phoneParts.part3}`;
      onChange(fullPhone);
    }
  }, [phoneParts, onChange]);

  return (
    <section className="flex items-center space-x-2">
      <input
        type="text"
        placeholder="010"
        className="border p-2 rounded w-1/4 text-center"
        maxLength={3}
        value={phoneParts.part1}
        onChange={(e) => handleInput('part1', e.target.value)}
      />
      <span className="text-lg font-semibold">-</span>
      <input
        type="text"
        placeholder="4444"
        className="border p-2 rounded w-1/4 text-center"
        maxLength={4}
        value={phoneParts.part2}
        onChange={(e) => handleInput('part2', e.target.value)}
      />
      <span className="text-lg font-semibold">-</span>
      <input
        type="text"
        placeholder="4444"
        className="border p-2 rounded w-1/4 text-center"
        maxLength={4}
        value={phoneParts.part3}
        onChange={(e) => handleInput('part3', e.target.value)}
      />
    </section>
  );
};

export default PhoneForm;
