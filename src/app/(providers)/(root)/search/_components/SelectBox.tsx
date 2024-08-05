'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import Select, { SingleValue, ActionMeta } from 'react-select';

interface Option {
  value: string;
  label: string;
}

export default function SelectBox() {
  const category: Option[] = [
    { value: 'new', label: '신상품' },
    { value: 'name', label: '상품명' },
    { value: 'low', label: '낮은가격' },
    { value: 'high', label: '높은가격' },
    { value: 'popular', label: '인기상품' },
    { value: 'review', label: '사용후기' }
  ];

  const router = useRouter();
  const searchParams = useSearchParams();

  const sortParam = searchParams.get('sort') || 'new';
  const initialOption = category.find((option) => option.value === sortParam) || category[0];

  const [categoryState, setCategoryState] = useState<Option | null>(initialOption);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleChange = (newValue: SingleValue<Option>, actionMeta: ActionMeta<Option>) => {
    setCategoryState(newValue);
    if (newValue) {
      const url = new URL(window.location.href);
      url.searchParams.set('sort', newValue.value);
      router.push(url.toString());
    }
  };

  if (!isMounted) {
    return null;
  }

  const customStyles = {
    control: (provided: any) => ({
      ...provided,
      height: '36px',
      width: '110px',
      borderRadius: 0
    }),
    singleValue: (provided: any) => ({
      ...provided,
      color: '#767676',
      width: '110px'
    }),
    option: (provided: any, state: any) => ({
      ...provided,
      width: '110px',
      color: state.isSelected ? '#111' : '#111',
      backgroundColor: state.isSelected ? '#fff' : '#fff',
      fontWeight: state.isSelected ? 'bold' : 'normal',
      '&:hover': {
        backgroundColor: '#F7F7FB'
      }
    }),
    menu: (provided: any) => ({
      ...provided,
      width: '110px',
      marginTop: '0px'
    })
  };

  return (
    <Select
      styles={customStyles}
      options={category}
      onChange={handleChange}
      value={categoryState}
    />
  );
}
