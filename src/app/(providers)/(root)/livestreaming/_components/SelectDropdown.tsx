'use client';

import React, { useEffect, useState } from 'react';
import Select, { SingleValue, ActionMeta } from 'react-select';

interface Option {
  value: string;
  label: string;
}

export default function SelectDropdown() {
  const online: Option[] = [
    { value: 'null', label: '카테고리를 선택하세요' },
    { value: '씨앗', label: '씨앗' },
    { value: '모종', label: '모종' },
    { value: '재배키트', label: '재배키트' },
    { value: '흙,비료', label: '흙,비료' },
    { value: '원예용품', label: '원예용품' }
  ];
  const [selectOnline, setSelectOnline] = useState<Option | null>(online[0]);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleChange = (newValue: SingleValue<Option>, actionMeta: ActionMeta<Option>) => {
    setSelectOnline(newValue);
  };

  if (!isMounted) {
    return null;
  }

  return (
    <Select options={online} onChange={handleChange} defaultValue={online[0]} className="w-[50%]" />
  );
}
